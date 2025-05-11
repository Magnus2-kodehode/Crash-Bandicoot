import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { volumeManager } from '../utils/volumeManager'

export class MainMenu extends Scene {
  constructor() {
    super('MainMenu')

    // Menu options
    this.menuOptions = ['Continue', 'New Game', 'Load Game', 'Settings', 'Exit Game']
    this.selectedIndex = 0
    this.menuTexts = []
    this.logoTween = null
  }

  preload() {
    this.musicList = ['8bitRick', '8bitDota', '8bitLoving', 'u_got_that']
    this.musicList.forEach((music) => {
      this.load.audio(music, `assets/audio/music-${music}.mp3`)
    })
  }

  create() {
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
    this.music.setName('music')
    this.music.play()

    // Sfx
    // ...

    // Add background image
    this.add.image(512, 384, 'background-menu')

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

    // Capture keyboard events
    this.input.keyboard.on('keydown-UP', () => this.moveSelection(-1))
    this.input.keyboard.on('keydown-DOWN', () => this.moveSelection(1))
    this.input.keyboard.on('keydown-ENTER', () => this.selectOption())

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

  changeScene() {
    this.scene.start('Game') // Transition to the Game scene
  }
}
