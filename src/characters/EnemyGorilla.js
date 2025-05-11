export class EnemyGorilla {
  constructor(scene, x, y) {
    this.scene = scene
    this.startX = x
    this.startY = y
    this.speed = 1000
    this.range = 350
    this.state = 'idle' // idle | charge | retreat
    this.cooldown = false
    this.isInvincible = false

    this.sprite = scene.physics.add
      .sprite(x, y, 'enemy-gorilla')
      .setSize(450, 450)
      .setOffset(25, 25)
      .setDepth(6)

    // Configure physics properties
    this.sprite.body.setFriction(0, 0)
    this.sprite.body.setDragX(5000)
    this.sprite.body.setGravityY(100)
    // this.sprite.body.setBounceX(1);
    this.sprite.setCollideWorldBounds(true)
    // this.sprite.setImmovable(true);

    const targetSize = 200
    const scaleX = targetSize / this.sprite.width
    const scaleY = targetSize / this.sprite.height
    this.sprite.setScale(scaleX, scaleY)
  }

  reset(x, y) {
    if (this.sprite && this.sprite.active) {
      this.sprite.setPosition(x, y)
      this.sprite.setVelocity(0)
      this.direction = -1
    }
  }

  kill() {
    if (this.isInvincible) return

    if (this.sprite && this.sprite.active) {
      this.sprite.destroy()
    }
  }

  isCharging() {
    return this.state === 'charge'
  }

  update() {
    if (!this.sprite.active) return

    if (this.state === 'idle' && !this.cooldown) {
      this.state = 'charge'
    }

    if (this.state === 'charge') {
      this.isInvincible = true
      this.sprite.setVelocityX(-this.speed)
      if (Math.abs(this.sprite.x - this.startX) >= this.range) {
        this.state = 'retreat'
      }
    }

    if (this.state === 'retreat') {
      this.sprite.setVelocityX(this.speed / 3)
      if (this.sprite.x >= this.startX) {
        this.sprite.setVelocityX(0)
        this.sprite.x = this.startX
        this.cooldown = true
        this.state = 'idle'
        this.isInvincible = false
        this.scene.time.delayedCall(2000, () => {
          this.cooldown = false
        })
      }
    }
  }
}
