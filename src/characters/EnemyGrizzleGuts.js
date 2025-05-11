export class EnemyGrizzleGuts {
  constructor(scene, x, y) {
    this.scene = scene
    this.startX = x
    this.startY = y
    this.maxHealth = 5
    this.currentHealth = this.maxHealth
    this.canTakeDamage = true

    this.sprite = scene.physics.add
      .sprite(x, y, 'enemy-grizzle_guts')
      .setSize(400, 450)
      .setOffset(50, 25)
      .setDepth(6)

    // Configure physics properties
    // this.sprite.body.setFriction(0, 0);
    this.sprite.body.setDragX(5000)
    this.sprite.body.setGravityY(300)
    this.sprite.body.setBounce(0)
    this.sprite.setCollideWorldBounds(true)

    const targetSize = 350
    const scaleX = targetSize / this.sprite.width
    const scaleY = targetSize / this.sprite.height
    this.sprite.setScale(scaleX, scaleY)

    this.createHealthBar()
    this.setupJumpingBehavior()
  }

  setupJumpingBehavior() {
    this.jumpEvent = this.scene.time.addEvent({
      delay: 1500,
      callback: () => {
        if (this.sprite && this.sprite.body && this.sprite.body.blocked.down) {
          this.sprite.setVelocityY(-100)
        }
      },
      loop: true,
    })
  }

  createHealthBar() {
    this.healthBarBg = this.scene.add.graphics()
    this.healthBarBg.fillStyle(0x000000, 0.5)
    this.healthBarBg.fillRect(0, 0, 50, 5)

    this.healthBar = this.scene.add.graphics()
    this.updateHealthBar()

    // Make health bars follow the enemy
    this.scene.events.on('update', this.updateHealthBarPosition, this)
  }

  updateHealthBar() {
    if (!this.healthBar) return

    this.healthBar.clear()
    const healthWidth = (this.currentHealth / this.maxHealth) * 50

    // Draw red health bar
    this.healthBar.fillStyle(0xff0000, 1)
    this.healthBar.fillRect(0, 0, healthWidth, 5)
  }

  updateHealthBarPosition() {
    if (!this.sprite || !this.healthBarBg || !this.healthBar) return

    // Position health bar above the enemy
    const offsetY = -80
    const x = this.sprite.x - 25
    const y = this.sprite.y + offsetY

    this.healthBarBg.setPosition(x, y)
    this.healthBar.setPosition(x, y)
  }

  takeDamage(amount = 1) {
    if (!this.sprite || !this.canTakeDamage) return

    this.canTakeDamage = false

    this.currentHealth -= amount
    this.currentHealth = Math.max(0, this.currentHealth)
    this.updateHealthBar()

    // Visual feedback when hit
    this.sprite.setTint(0xff0000)
    this.scene.time.delayedCall(100, () => {
      if (this.sprite) this.sprite.clearTint()
    })

    this.scene.time.delayedCall(500, () => {
      this.canTakeDamage = true
    })

    if (this.currentHealth <= 0) {
      this.kill()
    }
  }

  kill() {
    if (this.jumpEvent) {
      this.jumpEvent.remove(false)
      this.jumpEvent = null
    }

    // Remove health bar update listener first
    this.scene.events.off('update', this.updateHealthBarPosition, this)

    if (this.healthBarBg) {
      this.healthBarBg.destroy()
      this.healthBarBg = null
    }

    if (this.healthBar) {
      this.healthBar.destroy()
      this.healthBar = null
    }

    if (this.sprite) {
      this.sprite.destroy()
      this.sprite = null
    }
  }

  reset(x, y) {
    this.sprite.setPosition(x, y)
    this.sprite.setVelocityX(0)
    this.currentHealth = this.maxHealth
    this.updateHealthBar()
  }

  update() {
    if (!this.sprite || !this.sprite.active) return
  }
}
