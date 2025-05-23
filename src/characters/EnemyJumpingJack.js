export class EnemyJumpingJack {
  constructor(scene, x, y) {
    this.scene = scene
    this.isAlive = true
    this.startX = x
    this.startY = y

    // Create sprite with physics
    this.sprite = scene.physics.add
      .sprite(x, y, 'enemy-jumping_jack')
      .setSize(380, 380)
      .setOffset(60, 100)
      // .setCircle(190, 60, 100)
      .setDepth(6)

    // Scale size
    const targetSize = 150
    const scaleX = targetSize / this.sprite.width
    const scaleY = targetSize / this.sprite.height
    this.sprite.setScale(scaleX, scaleY)

    // Configure physics properties
    this.sprite.body.setDragX(5000)
    this.sprite.body.setGravityY(300)
    this.sprite.body.setBounce(0)
    this.sprite.setCollideWorldBounds(true)

    // Start behaviors
    this.setupJumpingBehavior()
  }

  setupJumpingBehavior() {
    this.jumpTimer = this.scene.time.addEvent({
      delay: 3000,
      callback: () => {
        if (this.isAlive && this.sprite.active && this.sprite.body.blocked.down) {
          this.sprite.setVelocityY(-2000)
          this.sprite.setCollideWorldBounds(false)
        }
      },
      loop: true,
    })
  }

  reset(x, y) {
    if (this.sprite && this.sprite.active) {
      this.sprite.setActive(true).setVisible(true)
      this.sprite.setPosition(x, y)
      this.sprite.setVelocityX(0)
    }
    if (!this.jumpTimer || !this.jumpTimer.callback) {
      this.setupJumpingBehavior()
    }
  }

  kill() {
    if (this.sprite && this.sprite.active) {
      this.sprite.destroy()
    }
  }

  update() {
    if (!this.sprite.active) return

    if (this.sprite.y < 0) {
      this.kill()
    }
  }
}
