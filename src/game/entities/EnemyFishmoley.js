export class EnemyFishmoley {
  constructor(scene, x, y) {
    this.scene = scene
    this.speed = 200
    this.direction = -1
    this.startX = x
    this.startY = y
    this.floatOffset = 0
    this.range = 100
    this.isJumping = false
    this.jumpVelocity = 0
    this.gravity = 20

    this.sprite = scene.physics.add
      .sprite(x, y, 'enemy-fishmoley')
      .setSize(440, 250)
      .setOffset(30, 120)
      .setDepth(6)

    // Configure physics properties
    this.sprite.body.setFriction(0, 0)
    this.sprite.body.setDragX(5000)
    this.sprite.body.setBounce(0)
    this.sprite.body.setAllowGravity(false)
    this.sprite.setCollideWorldBounds(true)

    const targetSize = 75
    const scaleX = targetSize / this.sprite.width
    const scaleY = targetSize / this.sprite.height
    this.sprite.setScale(scaleX, scaleY)

    this.setupJumpingBehavior()
  }

  setupJumpingBehavior() {
    this.jumpEvent = this.scene.time.addEvent({
      delay: 2500,
      callback: () => {
        if (this.sprite && this.sprite.body) {
          if (!this.isJumping) {
            this.isJumping = true
            this.jumpVelocity = -20
          }
        }
      },
      loop: true,
    })
  }

  kill() {
    if (this.sprite && this.sprite.active) {
      this.sprite.destroy()
    }
  }

  reset(x, y) {
    if (this.sprite && this.sprite.active) {
      this.sprite.setPosition(x, y)
      this.sprite.setVelocity(0)
      this.direction = -1
    }
  }

  update() {
    if (!this.sprite.active) return

    const velocity = this.speed * this.direction
    this.sprite.setVelocityX(velocity)
    this.sprite.setFlipX(this.direction > 0)

    const distance = this.sprite.x - this.startX

    if (this.direction === 1 && distance >= this.range) {
      this.direction = -1
    } else if (this.direction === -1 && distance <= -this.range) {
      this.direction = 1
    }

    const waveAmplitude = 5
    const waveSpeed = 0.01
    if (!this.isJumping) {
      this.sprite.y = this.startY + Math.sin(this.scene.time.now * waveSpeed) * waveAmplitude
    }

    if (this.isJumping) {
      this.sprite.y += this.jumpVelocity
      this.jumpVelocity += (this.gravity * this.scene.game.loop.delta) / 500

      if (this.sprite.y >= this.startY) {
        this.sprite.y = this.startY
        this.isJumping = false
        this.jumpVelocity = 0
      }
    }
  }
}
