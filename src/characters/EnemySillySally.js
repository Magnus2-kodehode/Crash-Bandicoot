import { EventBus } from '../EventBus'

export class EnemySillySally {
  constructor(scene, x, y) {
    this.scene = scene
    this.speed = 200
    this.direction = -1
    this.startX = x
    this.startY = y
    this.range = 300

    this.sprite = scene.physics.add
      .sprite(x, y, 'enemy-silly_sally')
      .setSize(400, 300)
      .setOffset(50, 130)
      .setCircle(200, 50, 50)
      .setDepth(6)

    // Configure physics properties
    this.sprite.body.setAllowGravity(false)
    this.sprite.body.setBounce(0)
    this.sprite.setCollideWorldBounds(true)

    // Scale
    const targetSize = 150
    const scaleX = targetSize / this.sprite.width
    const scaleY = targetSize / this.sprite.height
    this.sprite.setScale(scaleX, scaleY)

    this.projectiles = []
    this.setupShootingBehavior()
  }

  setupShootingBehavior() {
    this.shootTimer = this.scene.time.addEvent({
      delay: 2500,
      callback: () => {
        if (this.sprite && this.sprite.active) {
          this.shootProjectile()
        }
      },
      loop: true,
    })
  }

  shootProjectile() {
    const direction = this.sprite.flipX ? -1 : 1
    const offsetX = 40 * direction
    const offsetY = 20
    const startX = this.sprite.x + offsetX
    const startY = this.sprite.y + offsetY

    const projectile = this.scene.physics.add.sprite(startX, startY, 'projectile-egg')
    projectile.setScale(0.25)
    projectile.setDepth(5)
    projectile.setCircle(100, 0, 0)
    projectile.setVelocity(0 * direction, 500)
    projectile.body.setAllowGravity(false)

    const startYRef = startY
    const maxDistance = 700

    this.projectiles.push({
      projectile,
      update: () => {
        if (!projectile?.active) return

        projectile.angle += 2 * direction

        const distance = Math.abs(projectile.y - startYRef)
        if (distance > maxDistance) {
          projectile.destroy()
        }
      },
    })

    this.scene.physics.add.overlap(projectile, this.scene.player.sprite, () => {
      if (this.scene.player.isSpinning) {
        projectile.destroy()
      } else {
        projectile.destroy()
        EventBus.emit('player-hit')
      }
    })
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
    if (!this.sprite.active) return

    const velocity = this.speed * this.direction
    this.sprite.setVelocityX(velocity)
    this.sprite.setFlipX(this.direction > 0)

    const waveAmplitude = 5
    const waveSpeed = 0.01
    this.sprite.y = this.startY + Math.sin(this.scene.time.now * waveSpeed) * waveAmplitude

    const distance = this.sprite.x - this.startX
    if (this.direction === 1 && distance >= this.range) {
      this.direction = -1
    } else if (this.direction === -1 && distance <= -this.range) {
      this.direction = 1
    }

    this.projectiles.forEach((projectile) => {
      projectile.update()
    })
  }
}
