export class EnemyRunningRupert {
  constructor(scene, x, y) {
    this.scene = scene
    this.speed = 750
    this.direction = 1
    this.startX = x
    this.startY = y
    this.range = 300

    this.sprite = scene.physics.add
      .sprite(x, y, 'enemy-running_rupert')
      .setSize(350, 350)
      .setOffset(75, 120)
      .setDepth(6)

    // Scale size
    const targetSize = 150
    const scaleX = targetSize / this.sprite.width
    const scaleY = targetSize / this.sprite.height
    this.sprite.setScale(scaleX, scaleY)

    // Configure physics properties
    this.sprite.body.setFriction(1)
    this.sprite.body.setDragX(5000)
    this.sprite.body.setGravityY(300)
    this.sprite.body.setBounce(0)
    this.sprite.setCollideWorldBounds(true)
  }

  reset(x, y) {
    if (this.sprite && this.sprite.active) {
      this.sprite.setPosition(x, y)
      this.sprite.setVelocity(0)
      this.direction = -1
    }
  }

  kill() {
    if (this.sprite && this.sprite.active) {
      this.sprite.destroy()
    }
  }

  update() {
    // Add any enemy update logic here
    if (!this.sprite.active) return

    const velocity = this.speed * this.direction
    this.sprite.setVelocityX(velocity)
    this.sprite.setFlipX(this.direction < 0)

    const distance = this.sprite.x - this.startX

    if (this.direction === 1 && distance >= this.range) {
      this.direction = -1
    } else if (this.direction === -1 && distance <= -this.range) {
      this.direction = 1
    }
  }
}
