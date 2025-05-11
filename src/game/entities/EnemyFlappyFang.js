export class EnemyFlappyFang {
  constructor(scene, x, y) {
    this.scene = scene
    this.speed = 200
    this.direction = -1
    this.startX = x
    this.startY = y
    this.floatOffset = 0
    this.range = 150
    this.isDiving = false
    this.divePhase = 'idle' // idle, diving, rising
    this.diveVelocity = 0
    this.diveDepth = this.startY + 300
    this.gravity = 20

    this.sprite = scene.physics.add
      .sprite(x, y, 'enemy-flappy_fang')
      .setSize(450, 300)
      .setOffset(25, 125)
      .setCircle(200, 50, 50)
      .setDepth(6)

    // Configure physics properties
    this.sprite.body.setFriction(0, 0)
    this.sprite.body.setDragX(5000)
    this.sprite.body.setBounce(0)
    this.sprite.body.setAllowGravity(false)
    this.sprite.setCollideWorldBounds(true)

    const targetSize = 100
    const scaleX = targetSize / this.sprite.width
    const scaleY = targetSize / this.sprite.height
    this.sprite.setScale(scaleX, scaleY)

    this.setupDivingBehavior()
  }

  setupDivingBehavior() {
    this.diveEvent = this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        if (this.sprite && this.sprite.body) {
          if (!this.isDiving) {
            this.divePhase = 'diving'
            this.diveVelocity = 5
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

    if (this.divePhase === 'idle') {
      this.sprite.y = this.startY + Math.sin(this.scene.time.now * waveSpeed) * waveAmplitude
    }

    if (this.divePhase === 'diving') {
      this.sprite.y += this.diveVelocity
      this.diveVelocity += (this.gravity * this.scene.game.loop.delta) / this.diveDepth

      if (this.sprite.y >= this.diveDepth) {
        this.divePhase = 'rising'
        this.diveVelocity = -this.diveVelocity
      }
    }

    if (this.divePhase === 'rising') {
      this.sprite.y += this.diveVelocity
      this.diveVelocity += (this.gravity * this.scene.game.loop.delta) / this.diveDepth

      if (this.sprite.y <= this.startY) {
        this.sprite.y = this.startY
        this.diveVelocity = 0
        this.divePhase = 'idle'
      }
    }
  }
}
