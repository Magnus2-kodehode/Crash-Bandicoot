import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { saveManager } from '../utils/SaveManager'
import { inputManager } from '../utils/InputManager'
import { volumeManager } from '../utils/VolumeManager'
import { gameState } from '../GameState'

export class MainMenu extends Scene {
  constructor() {
    super('MainMenu')

    // Menu options
    this.menuOptions = ['New Game', 'Load Game', 'Settings', 'Exit Game']
    this.selectedIndex = 0
    this.menuTexts = []
    this.inputTime = 0
    this.inputCooldown = 150
    this.logoTween = null
  }

  preload() {
    // Music
    this.musicList = ['8bitRick', '8bitDota', '8bitLoving', 'u_got_that']
    this.musicList.forEach((music) => {
      this.load.audio(music, `assets/audio/music-${music}.mp3`)
    })
  }

  create() {
    // Game save
    const save = saveManager.load()

    if (save) {
      gameState.lives = save.lives
      gameState.score = save.score
      player.setPosition(save.position.x, save.position.y)
    }

    if (saveManager.hasSave()) {
      this.menuOptions[0] = 'Continue'
    } else {
      this.menuOptions[0] = 'New Game'
    }

    // Stop any previous music if it's playing
    if (this.music) {
      this.music.stop()
    }

    // Pick random music from the list
    const randomKey = Phaser.Utils.Array.GetRandom(this.musicList)

    // Music
    const volume = volumeManager.getMusicVolume()

    this.music = this.sound.add(randomKey, {
      loop: true,
      volume: volume,
    })
    this.music.play()

    // Sfx
    const sfxVolume = volumeManager.getSfxVolume()
    this.menuSelectSound = this.sound.add('sfx-menu_select', { volume: sfxVolume })
    this.menuSelectSound.play()

    // Add background image
    this.add.image(512, 384, 'bg-main_menu')

    // Enable/disable inputs on open/close Settings
    this.inputEnabled = true
    EventBus.on('show-settings-menu', () => {
      this.inputEnabled = false
    })
    EventBus.on('hide-settings-menu', () => {
      this.inputEnabled = true
    })

    // Reset the menu state when the scene is reloaded
    this.menuTexts = []
    this.selectedIndex = 0

    // Create menu options
    this.menuOptions.forEach((option, index) => {
      let text = this.add
        .text(512, 500 + index * 50, option, {
          fontFamily: 'Zoinks',
          fontSize: 32,
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 6,
          align: 'center',
        })
        .setOrigin(0.5)

      this.menuTexts.push(text)
    })

    this.updateMenu() // Highlight the first option

    // Emit event when the current scene is ready
    EventBus.emit('current-scene-ready', this)
  }

  moveSelection(direction) {
    // Update selection index (wraps around)
    this.selectedIndex = Phaser.Math.Wrap(
      this.selectedIndex + direction,
      0,
      this.menuOptions.length
    )
    this.updateMenu()
  }

  updateMenu() {
    this.menuTexts.forEach((text, index) => {
      if (index === this.selectedIndex) {
        text.setColor('#ffcc00').setFontSize(45) // Highlighted option (yellow)
      } else {
        text.setColor('#ffffff').setFontSize(40) // Default option (white)
      }
    })
  }

  selectOption() {
    const selectedOption = this.menuOptions[this.selectedIndex]

    if (selectedOption === 'New Game') {
      this.changeScene()
    } else if (selectedOption === 'Settings') {
      EventBus.emit('show-settings-menu')
    } else if (selectedOption === 'Exit Game') {
      console.log('Exit game (to be implemented)')
    }
  }

  update(time) {
    if (!this.inputEnabled) return

    const iM = inputManager
    const now = time

    if (now - this.inputTime < this.inputCooldown) return

    if (iM.isMenuUpPressed()) {
      this.moveSelection(-1)
      this.inputTime = now
    } else if (iM.isMenuDownPressed()) {
      this.moveSelection(1)
      this.inputTime = now
    } else if (iM.isMenuSelectPressed()) {
      this.selectOption()
      this.inputTime = now
    }
  }

  changeScene() {
    this.scene.start('Game')
  }
}
