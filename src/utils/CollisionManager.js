import { EventBus } from '../EventBus'
import { gameState } from '../GameState'

export class CollisionManager {
  constructor(scene) {
    this.scene = scene
    this.sceneManager = scene.scene
  }

  init({ player, enemies, levelManager }) {
    this.player = player
    this.enemies = enemies
    this.levelManager = levelManager
  }

  create() {
    this.setupCollisions()
  }

  setupCollisions() {
    const { physics } = this.scene

    // Ground/platform collisions
    physics.add.collider(this.player.sprite, this.levelManager.platformGrassGroup)
    this.enemies.forEach((enemy) => {
      physics.add.collider(enemy.sprite, this.levelManager.platformGrassGroup)
    })
    physics.add.collider(this.player.sprite, this.levelManager.platformWoodGroup)
    this.enemies.forEach((enemy) => {
      physics.add.collider(enemy.sprite, this.levelManager.platformWoodGroup)
    })
    physics.add.collider(this.player.sprite, this.levelManager.platformStoneGroup)
    this.enemies.forEach((enemy) => {
      physics.add.collider(enemy.sprite, this.levelManager.platformStoneGroup)
    })
    physics.add.collider(this.player.sprite, this.levelManager.wallStoneGroup)
    this.enemies.forEach((enemy) => {
      physics.add.collider(enemy.sprite, this.levelManager.wallStoneGroup)
    })

    // Player and spikes collision
    physics.add.collider(this.player.sprite, this.levelManager.spikesBottomGroup, () => {
      this.handlePlayerHit()
    })
    physics.add.collider(this.player.sprite, this.levelManager.spikesTopGroup, () => {
      this.handlePlayerHit()
    })
    physics.add.collider(this.player.sprite, this.levelManager.spikesLeftGroup, () => {
      this.handlePlayerHit()
    })
    physics.add.collider(this.player.sprite, this.levelManager.spikesRightGroup, () => {
      this.handlePlayerHit()
    })

    // Player and water collision
    physics.add.overlap(this.player.sprite, this.levelManager.waterGroup, () => {
      this.handlePlayerHit()
    })

    // Player and enemy collision
    this.enemies.forEach((enemy) => {
      if (enemy.constructor.name === 'EnemyFlappyFang') {
        physics.add.overlap(this.player.sprite, enemy.sprite, (playerSprite, enemySprite) => {
          this.handlePlayerEnemyCollision(playerSprite, enemySprite)
        })
      } else {
        physics.add.collider(this.player.sprite, enemy.sprite, (playerSprite, enemySprite) => {
          this.handlePlayerEnemyCollision(playerSprite, enemySprite)
        })
      }
    })

    // Spin attack and enemy collision
    this.enemies.forEach((enemy) => {
      physics.add.collider(this.player.spinHitbox, enemy.sprite, (playerSprite, enemySprite) => {
        this.handlePlayerEnemyCollision(playerSprite, enemySprite)
      })
    })

    // Enemy and enemy collision
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = i + 1; j < this.enemies.length; j++) {
        physics.add.collider(this.enemies[i].sprite, this.enemies[j].sprite)
      }
    }

    // Collect fruits
    physics.add.overlap(this.player.sprite, this.levelManager.fruitGroup, (_, fruit) => {
      fruit.destroy()
      EventBus.emit('add-score', 1)
    })

    // TNT interactions
    physics.add.overlap(this.player.sprite, this.levelManager.tntGroup, (_, tnt) => {
      this.levelManager.tntCountdown(tnt)
    })
  }

  handlePlayerHit = () => {
    if (this.player.isInvincible) {
      return
    } else {
      gameState.lives--
      EventBus.emit('lose-life')
      this.player.deathAnimation()

      this.scene.time.delayedCall(1500, () => {
        if (gameState.lives <= 0) {
          EventBus.emit('reset-game')
          this.sceneManager.start('GameOver')
        } else {
          this.levelManager.clearTNTTimers()
          this.player.respawnPlayer()
        }
      })
    }
  }

  handlePlayerEnemyCollision = (_, enemySprite) => {
    const enemy = this.enemies.find((e) => e.sprite === enemySprite)
    if (!enemy) return

    if (enemy.constructor.name === 'EnemyOda') {
      return
    }
    if (enemy.constructor.name === 'EnemyJumpingJack') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }
    if (enemy.constructor.name === 'EnemyRunningRupert') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }
    if (enemy.constructor.name === 'EnemyChunkyCheeks') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }
    if (enemy.constructor.name === 'EnemySillySally') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }
    if (enemy.constructor.name === 'EnemyFishmoley') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }
    if (enemy.constructor.name === 'EnemyFlappyFang') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }
    if (enemy.constructor.name === 'EnemyCreature') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }
    if (enemy.constructor.name === 'EnemySpider') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }
    if (enemy.constructor.name === 'EnemySkitterSpindle') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }
    if (enemy.constructor.name === 'EnemyMutatedFrog') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }
    if (enemy.constructor.name === 'EnemyDreadDrooler') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }
    if (enemy.constructor.name === 'EnemyCutieCthulu') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }
    if (enemy.constructor.name === 'EnemyNutbusterMkII') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }

    if (enemy.constructor.name === 'EnemyBananaBandit') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }

    if (enemy.constructor.name === 'EnemyGorilla') {
      if (enemy.state === 'charge') {
        const direction = this.player.sprite.x < enemy.sprite.x ? -1 : 1
        const distance = 150
        const duration = 150

        this.scene.tweens.add({
          targets: this.player.sprite,
          x: this.player.sprite.x + direction * distance,
          duration: duration,
        })
      }

      if (enemy.isInvincible) {
        return
      } else if (this.player.isSpinning && !enemy.isInvincible) {
        enemy.kill?.()
      }
      return
    }

    if (enemy.constructor.name === 'EnemyRazor') {
      if (this.player.isSpinning) {
        enemy.kill?.()
      } else {
        this.handlePlayerHit()
      }
    }

    if (enemy.constructor.name === 'EnemyGrizzleGuts') {
      if (this.player.isSpinning) {
        enemy.takeDamage?.(10)
      } else {
        this.handlePlayerHit()
      }
      return
    }

    if (this.player.isSpinning) {
      enemy.kill?.()
    } else {
      this.handlePlayerHit()
    }
  }
}
