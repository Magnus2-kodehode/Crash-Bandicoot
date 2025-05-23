import { Scene } from 'phaser'
import { EventBus } from '../EventBus.js'
import { PauseMenu } from '../ui/PauseMenu.js'
import { LevelManager } from '../managers/LevelManager.js'
import { BackgroundManager } from '../managers/BackgroundManager.js'
import { gameState } from '../GameState.js'
import { Player } from '../characters/Player.js'
import { EnemyOda } from '../characters/EnemyOda.js'
import { EnemyJumpingJack } from '../characters/EnemyJumpingJack.js'
import { EnemyRunningRupert } from '../characters/EnemyRunningRupert.js'
import { EnemyChunkyCheeks } from '../characters/EnemyChunkyCheeks.js'
import { EnemySillySally } from '../characters/EnemySillySally.js'
import { EnemySpider } from '../characters/EnemySpider.js'
import { EnemySkitterSpindle } from '../characters/EnemySkitterSpindle.js'
import { EnemyCreature } from '../characters/EnemyCreature.js'
import { EnemyCutieCthulu } from '../characters/EnemyCutieCthulu.js'
import { EnemyDreadDrooler } from '../characters/EnemyDreadDrooler.js'
import { EnemyMutatedFrog } from '../characters/EnemyMutatedFrog.js'
import { EnemyNutbusterMkII } from '../characters/EnemyNutbusterMkII.js'
import { EnemyFishmoley } from '../characters/EnemyFishmoley.js'
import { EnemyGrizzleGuts } from '../characters/EnemyGrizzleGuts.js'
import { EnemyFlappyFang } from '../characters/EnemyFlappyFang.js'
import { EnemyBananaBandit } from '../characters/EnemyBananaBandit.js'
import { EnemyGorilla } from '../characters/EnemyGorilla.js'
import { EnemyRazor } from '../characters/EnemyRazor.js'

export class OldGame extends Scene {
  constructor() {
    super('Game')
  }

  create() {
    // Background
    this.backgroundManager = new BackgroundManager(this)
    this.backgroundManager.createBackground()

    // TNT Explosion sound effect
    this.explosionSound = this.sound.add('sfx-tnt')

    // Create level elements
    this.levelManager = new LevelManager(this)
    this.levelManager.createLevel()

    // Create player
    this.player = new Player(this, 100, 550)

    // Create enemies
    this.enemies = [
      new EnemyOda(this, 110, 250),
      new EnemyJumpingJack(this, 675, 550),
      new EnemyRunningRupert(this, 2600, 550),
      new EnemyChunkyCheeks(this, 2525, 200),
      new EnemySillySally(this, 1100, 125),
      new EnemyFishmoley(this, 3210, 700),
      new EnemyFlappyFang(this, 2850, 200),
      new EnemySpider(this, 1900, 200),
      new EnemySkitterSpindle(this, 6100, 505),
      new EnemyCreature(this, 1900, 700),
      new EnemyCutieCthulu(this, 4000, 500),
      new EnemyMutatedFrog(this, 4785, 500),
      new EnemyDreadDrooler(this, 5500, 500),
      new EnemyNutbusterMkII(this, 3425, 500),
      new EnemyBananaBandit(this, 5150, 110),
      new EnemyGorilla(this, 6210, 200),
      new EnemyRazor(this, 6900, 700),
      new EnemyGrizzleGuts(this, 10000, 300),
    ]

    // Setup collisions
    this.setupCollisions()

    // Create input manager
    this.inputManager = new InputManager(this)

    // Create pause menu
    this.pauseMenu = new PauseMenu(this)

    // Set world bounds
    this.physics.world.setBounds(0, 0, 10240, 768)

    // Set camera
    let { width: worldWidth, height: worldHeight } = this.physics.world.bounds
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.startFollow(this.player.sprite)
    this.cameras.main.zoom = 1.25

    EventBus.emit('current-scene-ready', this)
  }

  setupCollisions() {
    // Ground/platform collisions
    this.physics.add.collider(this.player.sprite, this.levelManager.platformGrassGroup)
    this.physics.add.collider(this.player.sprite, this.levelManager.platformWoodGroup)
    this.physics.add.collider(this.player.sprite, this.levelManager.platformStoneGroup)
    this.physics.add.collider(this.player.sprite, this.levelManager.wallStoneGroup)
    this.physics.add.collider(this.player.sprite, this.levelManager.boxGroup)
    this.physics.add.collider(this.player.sprite, this.levelManager.boxWumpaFruitGroup)
    this.enemies.forEach((enemy) => {
      this.physics.add.collider(enemy.sprite, this.levelManager.platformGrassGroup)
      this.physics.add.collider(enemy.sprite, this.levelManager.platformWoodGroup)
      this.physics.add.collider(enemy.sprite, this.levelManager.platformStoneGroup)
      this.physics.add.collider(enemy.sprite, this.levelManager.wallStoneGroup)
      this.physics.add.collider(enemy.sprite, this.levelManager.boxGroup)
      this.physics.add.collider(enemy.sprite, this.levelManager.boxWumpaFruitGroup)
    })

    // Player and spikes collision
    this.physics.add.collider(this.player.sprite, this.levelManager.spikesBottomGroup, () => {
      this.handlePlayerHit()
    })
    this.physics.add.collider(this.player.sprite, this.levelManager.spikesTopGroup, () => {
      this.handlePlayerHit()
    })
    this.physics.add.collider(this.player.sprite, this.levelManager.spikesLeftGroup, () => {
      this.handlePlayerHit()
    })
    this.physics.add.collider(this.player.sprite, this.levelManager.spikesRightGroup, () => {
      this.handlePlayerHit()
    })

    // Player and water collision
    this.physics.add.overlap(this.player.sprite, this.levelManager.waterGroup, () => {
      this.handlePlayerHit()
    })

    // Player and enemy collision
    this.enemies.forEach((enemy) => {
      if (enemy.constructor.name === 'EnemyFlappyFang') {
        this.physics.add.overlap(this.player.sprite, enemy.sprite, (playerSprite, enemySprite) => {
          this.handlePlayerEnemyCollision(playerSprite, enemySprite)
        })
      } else {
        this.physics.add.collider(this.player.sprite, enemy.sprite, (playerSprite, enemySprite) => {
          this.handlePlayerEnemyCollision(playerSprite, enemySprite)
        })
      }
    })

    // Spin attack and enemy collision
    this.enemies.forEach((enemy) => {
      this.physics.add.collider(
        this.player.spinHitbox,
        enemy.sprite,
        (playerSprite, enemySprite) => {
          this.handlePlayerEnemyCollision(playerSprite, enemySprite)
        }
      )
    })

    // Enemy and enemy collision
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = i + 1; j < this.enemies.length; j++) {
        this.physics.add.collider(this.enemies[i].sprite, this.enemies[j].sprite)
      }
    }

    // Collect fruits
    this.physics.add.overlap(this.player.sprite, this.levelManager.fruitGroup, (player, fruit) => {
      fruit.destroy()
      EventBus.emit('add-score', 1)
    })

    // TNT interactions
    this.physics.add.overlap(this.player.sprite, this.levelManager.tntGroup, (player, tnt) => {
      if (!tnt.getData('tnt-countdown')) {
        tnt.setData('tnt-countdown', true)
        this.explosionSound.play()

        const t1 = this.time.delayedCall(0, () => tnt.setTexture('crate-tnt-3'), [], this)
        const t2 = this.time.delayedCall(1000, () => tnt.setTexture('crate-tnt-2'), [], this)
        const t3 = this.time.delayedCall(2000, () => tnt.setTexture('crate-tnt-1'), [], this)
        const t4 = this.time.delayedCall(
          3000,
          () => {
            this.levelManager.explodeTNT(tnt)
            tnt.destroy()
          },
          [],
          this
        )

        this.levelManager.tntTimers.push(t1, t2, t3, t4)
      }
    })
  }

  handlePlayerHit = () => {
    if (this.player.isInvincible) {
      return
    } else {
      gameState.lives--
      EventBus.emit('lose-life')
      this.player.deathAnimation()

      this.time.delayedCall(1500, () => {
        if (gameState.lives <= 0) {
          EventBus.emit('reset-game')
          this.scene.start('GameOver')
        } else {
          this.levelManager.clearTNTTimers()
          this.respawnPlayer()
        }
      })
    }
  }

  handlePlayerEnemyCollision = (playerSprite, enemySprite) => {
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

        this.tweens.add({
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

  togglePause() {
    this.input.keyboard.on('keydown-ESC', () => {
      EventBus.emit('toggle-pause-menu')
    })
  }

  respawnPlayer() {
    this.player.respawn(100, 550)
    this.player.sprite.setScale(0.3)
    this.player.sprite.setSize(250, 425)
    this.player.sprite.setOffset(125, 75)
    this.levelManager.resetLevel()
  }

  update(time, delta) {
    // Check for pause button presses
    if (
      Phaser.Input.Keyboard.JustDown(this.inputManager.keys.pause) ||
      Phaser.Input.Keyboard.JustDown(this.inputManager.keys.pauseP)
    ) {
      this.togglePause()
    }

    // If paused, handle menu navigation
    if (this.isPaused) {
      this.pauseMenu.update()
      return // Skip rest of update when paused
    }

    this.levelManager.updateWaterMovement(time)
    this.levelManager.updateFruits(time)

    // Update player and enemy
    this.player.update(time, delta, this.inputManager)
    this.enemies.forEach((enemy) => enemy.update())

    // Boss cutscene
    if (this.player) {
      this.levelManager.showBossCutscene()
    }

    // Boss subtitle
    if (this.player) {
      this.levelManager.showBossSubtitle()
    }
  }

  changeScene(sceneName) {
    this.scene.start(sceneName)
  }
}
