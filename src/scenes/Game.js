import Phaser, { Scene } from 'phaser'
import { EventBus } from '../EventBus.js'
import { inputManager } from '../utils/InputManager.js'
import { saveManager } from '../utils/SaveManager.js'
import { PauseMenu } from '../ui/PauseMenu.js'
import { SettingsMenu } from '../ui/SettingsMenu.js'
import { Level1 } from '../levels/Level1.js'

export class Game extends Scene {
  constructor() {
    super('Game')
  }

  create() {
    // Set world bounds
    this.physics.world.setBounds(0, 0, 10240, 768)

    // Set camera
    let { width: worldWidth, height: worldHeight } = this.physics.world.bounds
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.zoom = 1.25

    // Inputs
    this.inputManager = inputManager

    // Sfx
    this.explosionSound = this.sound.add('sfx-tnt')

    // Levels
    this.level = new Level1(this)
    this.level.create()

    // Load save
    const save = saveManager.load()

    if (save && this.level?.player) {
      if (
        save.position &&
        typeof save.position.x === 'number' &&
        typeof save.position.y === 'number'
      ) {
        this.level.player.respawn(save.position.x, save.position.y)
      }
      if (typeof save.lives === 'number') {
        gameState.lives = save.lives
      }
      if (typeof save.lives === 'number') {
        gameState.score = save.score
      }
    }

    EventBus.emit('current-scene-ready', this)
  }

  update(time, delta) {
    this.level?.update(time, delta, inputManager)

    if (inputManager.isPausePressed() && !this.pauseMenu && !this.settingsMenu) {
      this.createPauseMenu()
    }

    if (this.pauseMenu) this.pauseMenu.update()
    if (this.settingsMenu) this.settingsMenu.update()
  }

  createPauseMenu() {
    this.pauseMenu = new PauseMenu(this, {
      onResume: () => {
        this.pauseMenu.destroy()
        this.pauseMenu = null
      },
      onRestart: () => {
        location.reload()
      },
      onSettings: () => {
        this.pauseMenu.destroy()
        this.pauseMenu = null
        this.settingsMenu = new SettingsMenu(this, () => {
          this.settingsMenu.destroy()
          this.settingsMenu = null
          this.createPauseMenu()
        })
      },
      onMainMenu: () => {
        this.scene.start('MainMenu')
      },
      onSaveAndQuit: () => {
        saveManager.save({})
        this.scene.start('MainMenu')
      },
    })
  }
}
