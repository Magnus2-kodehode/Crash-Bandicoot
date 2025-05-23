export class Mask {
  constructor(scene, player) {
    this.scene = scene
    this.player = player
    this.forceSnap = false

    this.sprite = scene.physics.add.sprite(player.sprite.x - 500, player.sprite.y - 100, 'mask-1')
    this.sprite.setScale(0.35)
    this.sprite.setSize(100, 125)
    this.sprite.setOffset(100, 125)
    this.sprite.setDepth(this.player.sprite.depth - 1)
    this.sprite.body.setAllowGravity(false)
  }

  setPosition(x, y) {
    this.sprite.x = x
    this.sprite.y = y
  }

  reset() {
    const offsetX = this.sprite.flipX ? -125 : 125
    const offsetY = 50
    const targetX = this.sprite.x + offsetX
    const targetY = this.sprite.y - offsetY
    this.setPosition(targetX, targetY)
    this.forceSnap = true
  }

  update(time, delta) {
    if (!this.player?.sprite) return

    const floatAmplitude = 10
    const floatSpeed = 0.005
    const speed = 0.05
    const flipOffset = 25
    const offsetX = this.player.sprite.flipX ? -125 : 125
    const offsetY = Math.sin(time * floatSpeed) * floatAmplitude + 50
    const targetX = this.player.sprite.x - offsetX
    const targetY = this.player.sprite.y - offsetY

    if (this.forceSnap) {
      this.sprite.x = targetX
      this.sprite.y = targetY
      this.forceSnap = false
      return
    }

    this.sprite.x += (targetX - this.sprite.x) * speed
    this.sprite.y += (targetY - this.sprite.y) * (speed / 2)

    if (this.sprite.x > this.player.sprite.x + flipOffset) {
      this.sprite.setFlipX(true)
    } else if (this.sprite.x < this.player.sprite.x - flipOffset) {
      this.sprite.setFlipX(false)
    }
  }
}
