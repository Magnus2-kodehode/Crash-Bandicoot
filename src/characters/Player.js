export class Player {
  constructor(scene, x, y) {
    this.scene = scene
    this.sprite = scene.physics.add
      .sprite(x, y, 'player-idle')
      .setScale(0.3)
      .setSize(250, 425)
      .setOffset(125, 75)
      .setDepth(7)
      .setCollideWorldBounds(true)
    this.sprite.body.setFriction(0, 0)
    this.sprite.body.setDragX(1000)
    this.sprite.body.setMaxVelocityX(500)

    // States
    this.canDoubleJump = true
    this.jumpCount = 0
    this.canSpin = true
    this.isSpinning = false
    this.isDead = false
    this.isInvincible = false

    // Running animation
    this.playerFrames = Array.from({ length: 20 }, (_, i) => `running-frame_${i}`)
    this.currentPlayerFrame = 0
    this.frameTimer = 0
    this.frameDelay = 30

    // Spin hitbox
    this.spinHitbox = scene.physics.add.sprite(x, y, null)
    this.spinHitbox.setScale(0.3)
    this.spinHitbox.setSize(500, 450)
    this.spinHitbox.setOffset(-250, 25)
    // this.spinHitbox.setCircle(275, -250, 0)
    this.spinHitbox.setDepth(-999)
    this.spinHitbox.setVisible(false)
    this.spinHitbox.setActive(false)
    this.spinHitbox.body.setAllowGravity(false)
    this.spinHitbox.body.enable = false

    // Spin hitbox init
    this.scene.time.delayedCall(1, () => {
      this.spinHitbox.setPosition(this.sprite.x - 500, this.sprite.y)
      this.spinHitbox.setActive(true)
      this.spinHitbox.body.enable = true
      this.scene.time.delayedCall(1, () => {
        this.spinHitbox.setActive(false)
        this.spinHitbox.body.enable = false
      })
    })
  }

  spinAttack() {
    if (this.isSpinning || !this.canSpin) return

    this.isSpinning = true
    this.canSpin = false
    this.sprite.setTexture('player-spin_attack')

    this.spinHitbox.setPosition(this.sprite.x, this.sprite.y)
    this.spinHitbox.setActive(true)
    this.spinHitbox.body.enable = true

    // Enemy collision
    const enemies = this.scene.level?.characters?.enemies || []
    enemies.forEach((enemy) => {
      if (!enemy.sprite?.active) return
      this.scene.physics.world.overlap(this.spinHitbox, enemy.sprite, () => {
        if (enemy.constructor.name === 'EnemyGrizzleGuts') {
          enemy.takeDamage?.(1)
        } else {
          enemy.kill?.()
        }
      })
    })

    // Break wumpa fruit crates
    const crateGroup = this.scene.level?.crates?.boxWumpaFruitGroup
    if (crateGroup) {
      this.scene.physics.world.overlap(this.spinHitbox, crateGroup, (_, box) => {
        this.scene.level.crates.smashWumpaFruitBox(box)
      })
    }

    // Spin attack duration
    this.scene.time.delayedCall(500, () => {
      this.isSpinning = false
      this.spinHitbox.setActive(false)
      this.spinHitbox.body.enable = false
      if (!this.isDead) {
        this.sprite.setTexture('player-idle')
      }
    })

    // Spin attack cooldown (duration + delay)
    this.scene.time.delayedCall(750, () => {
      this.canSpin = true
    })
  }

  jump(jumpPower) {
    if (this.sprite.body.blocked.down) {
      this.sprite.setVelocityY(jumpPower)
      this.jumpCount++
      this.canDoubleJump = true
    } else if (this.canDoubleJump) {
      this.sprite.setVelocityY(jumpPower + 50)
      this.jumpCount++
      if (this.jumpCount >= 2) {
        this.canDoubleJump = false
      }
    }
  }

  deathAnimation() {
    this.isInvincible = true
    this.isDead = true
    this.sprite.setVelocity(0)
    this.sprite.setAccelerationX(0)
    this.sprite.setTexture('player-death-frame_1')
    this.sprite.setOffset(125, 25)
    this.scene.time.delayedCall(500, () => {
      this.sprite.setTexture('player-death-frame_2')
      this.sprite.setOffset(125, -50)
    })
  }

  respawn(x, y) {
    this.isDead = false
    this.isInvincible = false
    this.sprite.setVelocity(0, 0)
    this.sprite.setPosition(x, y)
    this.jumpCount = 0
    this.canDoubleJump = true
    this.scene.mask.reset()
  }

  respawnPlayer() {
    this.respawn(150, 550)
    this.sprite.setScale(0.3)
    this.sprite.setSize(250, 425)
    this.sprite.setOffset(125, 75)
    // this.levelManager.resetLevel()
  }

  update(time, delta, inputManager) {
    if (this.isDead) return

    const speed = 5000
    const decel = 2
    const cutoff = 60
    const jumpPower = -500

    // Check movement input
    const left = inputManager.isMoveLeftPressed()
    const right = inputManager.isMoveRightPressed()
    const jump = inputManager.isJumpPressed()
    const spin = inputManager.isSpinAttackPressed()

    // Reset jump calculations on touching the ground
    if (this.sprite.body.blocked.down) {
      this.jumpCount = 0
      this.canDoubleJump = true
    }

    // Movement
    if (left) {
      this.sprite.setAccelerationX(-speed)
      this.sprite.setFlipX(true)
    } else if (right) {
      this.sprite.setAccelerationX(speed)
      this.sprite.setFlipX(false)
    } else {
      if (Math.abs(this.sprite.body.velocity.x) < cutoff) {
        this.sprite.setAccelerationX(0)
      } else {
        const dir = this.sprite.body.velocity.x > 0 ? -1 : 1
        this.sprite.setAccelerationX((dir * speed) / decel)
      }
    }

    // Handle player animation
    if (!this.isSpinning) {
      if (!this.sprite.body.blocked.down) {
        if (this.sprite.body.velocity.y < 0) {
          this.sprite.setTexture('player-jump')
        } else if (
          this.sprite.body.velocity.y > 500 ||
          (this.jumpCount == 0 && this.sprite.body.velocity.y > 0)
        ) {
          this.sprite.setTexture('player-fall')
        }
      } else if (this.sprite.body.velocity.x !== 0) {
        this.frameTimer += delta
        if (this.frameTimer > this.frameDelay) {
          this.frameTimer = 0
          this.currentPlayerFrame = (this.currentPlayerFrame + 1) % this.playerFrames.length
          this.sprite.setTexture(this.playerFrames[this.currentPlayerFrame])
        }
      } else {
        this.sprite.setTexture('player-idle')
      }
    }

    if (jump) this.jump(jumpPower)
    if (spin) this.spinAttack()

    // Oppdater posisjon for spinAttack hitbox
    // const dir = this.sprite.flipX ? -1 : 1
    // this.spinHitbox.setPosition(this.sprite.x + 5 * dir, this.sprite.y + 10)

    const spinHitboxOffsetX = this.sprite.flipX ? -1 : 1
    const spinHitboxOffsetY = -60
    this.spinHitbox.setPosition(
      this.sprite.x + spinHitboxOffsetX,
      this.sprite.y + spinHitboxOffsetY
    )
    this.spinHitbox.setFlipX(this.sprite.flipX)
  }
}
