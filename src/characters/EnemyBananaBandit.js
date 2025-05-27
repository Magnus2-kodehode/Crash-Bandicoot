import { EventBus } from '../EventBus'

export class EnemyBananaBandit {
  constructor(scene, x, y) {
    this.scene = scene
    this.startX = x
    this.startY = y

    // Sprite
    this.sprite = scene.physics.add
      .sprite(x, y, 'enemy-banana_bandit')
      .setSize(450, 425)
      .setOffset(25, 65)
      .setDepth(6)
      .setFlipX(true)

    const targetSize = 150
    const scaleX = targetSize / this.sprite.width
    const scaleY = targetSize / this.sprite.height
    this.sprite.setScale(scaleX, scaleY)

    // Configure physics properties
    this.sprite.body.setFriction(0, 0)
    this.sprite.body.setDragX(5000)
    this.sprite.body.setGravityY(100)
    this.sprite.setCollideWorldBounds(true)

    // Banana pile sprite
    this.spriteBananaPile = scene.add.sprite(x - 100, y + 20, 'banana_pile')
    this.spriteBananaPile.setScale(0.15)
    this.spriteBananaPile.setDepth(this.sprite.depth - 1)

    this.setupJumpingBehavior()

    this.projectiles = []
    this.setupShootingBehaviour()
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

    if (this.throwTimer) {
      this.throwTimer.remove()
    }

    if (this.sprite?.active) {
      this.sprite.destroy()
    }
  }

  setupJumpingBehavior() {
    this.jumpEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.sprite && this.sprite.body && this.sprite.body.blocked.down) {
          this.sprite.setVelocityY(-150)
        }
      },
      loop: true,
    })
  }

  setupShootingBehaviour() {
    this.shootTimer = this.scene.time.addEvent({
      delay: 1500,
      callback: () => {
        if (this.sprite && this.sprite.active) {
          this.shootProjectile()
        }
      },
      loop: true,
    })
  }

  shootProjectile() {
    const direction = this.sprite.flipX ? 1 : -1
    const offsetX = 50 * direction
    const offsetY = -25
    const startX = this.sprite.x + offsetX
    const startY = this.sprite.y + offsetY

    const projectile = this.scene.physics.add.sprite(startX, startY, 'projectile-banana')
    projectile.setScale(0.3)
    projectile.setSize(170, 170)
    projectile.setOffset(15, 15)
    projectile.setCircle(80, 20, 20)
    projectile.setDepth(5)
    projectile.setVelocity(500, -300)
    projectile.setAngularVelocity(300)
    projectile.setCollideWorldBounds(false)
    projectile.body.setAllowGravity(true)

    this.projectiles.push({
      projectile,
      update: () => {},
    })

    this.scene.time.delayedCall(800, () => {
      if (projectile.active) projectile.destroy()
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

  update() {
    if (!this.sprite.active) return

    this.projectiles.forEach((projectile) => {
      projectile.update()
    })
  }
}
