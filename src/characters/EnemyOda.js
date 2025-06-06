export class EnemyOda {
  constructor(scene, x, y) {
    this.scene = scene
    this.startX = x
    this.startY = y

    this.sprite = scene.physics.add
      .sprite(x, y, 'enemy-oda')
      .setSize(250, 500)
      .setOffset(125, 0)
      .setDepth(6)

    // Configure physics properties
    this.sprite.body.setFriction(0, 0)
    this.sprite.body.setDragX(5000)
    this.sprite.body.setGravityY(300)
    this.sprite.body.setBounce(0)
    this.sprite.body.setAllowGravity(false)
    this.sprite.setImmovable(true)
    this.sprite.setCollideWorldBounds(true)

    const targetSize = 100
    const scaleX = targetSize / this.sprite.width
    const scaleY = targetSize / this.sprite.height
    this.sprite.setScale(scaleX, scaleY)
  }

  kill() {
    return
  }

  reset(x, y) {
    this.sprite.setPosition(x, y)
    this.sprite.setVelocityX(0)
  }

  update() {
    if (!this.sprite.active) return
  }
}
