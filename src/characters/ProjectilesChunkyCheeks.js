export class ProjectilesChunkyCheeks {
  constructor(scene, x, y, direction = -1) {
    this.scene = scene
    this.sprite = scene.physics.add.sprite(x, y, 'projectile-nut')
    this.sprite.setScale(0.25)
    this.sprite.setCircle(100, 0, 0)
    this.sprite.setVelocityX(500 * direction)
    this.sprite.body.setAllowGravity(false)
    this.sprite.setDepth(10)
    this.startX = x
    this.maxDistance = 1024
  }

  update() {
    if (!this.sprite.active) return

    this.sprite.angle += 5

    const distanceTravelled = Math.abs(this.sprite.x - this.startX)
    if (distanceTravelled > this.maxDistance) {
      this.sprite.destroy()
    }
  }
}
