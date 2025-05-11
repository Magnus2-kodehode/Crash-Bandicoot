export class ProjectilesBananaBandit {
  constructor(scene, x, y) {
    this.scene = scene
    this.sprite = scene.physics.add.sprite(x + 50, y + -25, 'projectile-banana')
    this.sprite.setScale(0.3)
    this.sprite.setSize(170, 170)
    this.sprite.setOffset(15, 15)
    this.sprite.setCircle(80, 20, 20)
    this.sprite.setDepth(10)
    this.sprite.setCollideWorldBounds(false)
    this.sprite.body.setAllowGravity(true)
    this.sprite.setVelocityX(500)
    this.sprite.setVelocityY(-300)
    this.sprite.setAngularVelocity(300)
    this.startX = x
    this.startY = y

    this.scene.time.delayedCall(800, () => {
      this.sprite.destroy()
    })
  }

  update() {
    if (!this.sprite.active) return
  }
}
