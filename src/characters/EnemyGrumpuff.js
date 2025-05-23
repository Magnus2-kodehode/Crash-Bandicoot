export class EnemyGrumpuff {
  constructor(scene, x, y) {
    this.scene = scene
    this.startX = x
    this.startY = y
    this.isInvincible = false

    this.sprite = scene.physics.add
      .sprite(x, y, 'enemy-grumpuff')
      .setSize(400, 400)
      .setOffset(50, 85)
      .setDepth(6)

    // Configure physics properties
    this.sprite.body.setFriction(0, 0)
    this.sprite.body.setDragX(5000)
    this.sprite.body.setGravityY(100)
    this.sprite.setCollideWorldBounds(true)

    const targetSize = 250
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

  update() {
    if (!this.sprite.active) return
  }
}
