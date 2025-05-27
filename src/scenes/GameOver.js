import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { inputManager } from '../utils/InputManager'

export class GameOver extends Scene {
  constructor() {
    super('GameOver')

    this.menuOptions = ['Retry', 'Main Menu']
    this.selectedIndex = 0
    this.menuTexts = []
    this.inputTime = 0
    this.inputCooldown = 150
  }

  create() {
    this.inputManager = inputManager
    this.inputEnabled = true

    // Background
    this.add.image(512, 384, 'bg-game_over').setDepth(997)

    // Background color filter (#8b0000) depth 998
    this.add.rectangle(512, 384, 1024, 768, 0x8b0000).setAlpha(0.5).setDepth(998)

    // Reset the menu state when the scene is reloaded
    this.menuTexts = []
    this.selectedIndex = 0

    // Create menu options
    this.menuOptions.forEach((option, index) => {
      let text = this.add
        .text(512, 650 + index * 50, option, {
          fontFamily: 'Zoinks',
          fontSize: '32px',
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 5,
          align: 'center',
        })
        .setOrigin(0.5)
        .setDepth(999)
      this.menuTexts.push(text)
    })

    this.updateSelection()

    // Emit an event that the current scene is ready
    EventBus.emit('current-scene-ready', this)
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

  moveSelection(direction) {
    // Update the selected option index and wrap around if necessary
    this.selectedIndex = Phaser.Math.Wrap(
      this.selectedIndex + direction,
      0,
      this.menuOptions.length
    )
    this.updateSelection()
  }

  updateSelection() {
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

    if (selectedOption === 'Retry') {
      this.scene.start('Game')
    } else if (selectedOption === 'Main Menu') {
      this.scene.start('MainMenu')
    }
  }
}
