import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class GameOver extends Scene {
  constructor() {
    super('GameOver')

    this.options = ['Retry', 'Quit Game']
    this.selectedIndex = 0
  }

  create() {
    // Background
    this.add.image(512, 384, 'bg-game_over')

    // Background color filter
    // this.cameras.main.setBackgroundColor(0x8b0000).setAlpha(0.25)

    // Add the "Retry" text option
    this.retryText = this.add
      .text(512, 675, 'Retry', {
        fontFamily: 'Zoinks',
        fontSize: 50,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(100)

    // Add the "Quit Game" text option
    this.quitText = this.add
      .text(512, 735, 'Main Menu', {
        fontFamily: 'Zoinks',
        fontSize: 50,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(100)

    // Update the selection (highlight the default selected option)
    this.updateSelection()

    // Emit an event that the current scene is ready
    EventBus.emit('current-scene-ready', this)
  }

  moveSelection(direction) {
    // Update the selected option index and wrap around if necessary
    this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex + direction, 0, this.options.length)
    // Update the selection highlight
    this.updateSelection()
  }

  updateSelection() {
    // Reset the color of both options to default (white)
    this.retryText.setColor('#ffffff')
    this.quitText.setColor('#ffffff')

    // Highlight the selected option in yellow
    if (this.selectedIndex === 0) {
      this.retryText.setColor('#ffcc00')
    } else if (this.selectedIndex === 1) {
      this.quitText.setColor('#ffcc00')
    }
  }

  selectOption() {
    // Restart the game if "Continue" is selected
    if (this.selectedIndex === 0) {
      this.scene.start('Game')
    }
    // Exit the game if "Quit Game" is selected
    else if (this.selectedIndex === 1) {
      this.scene.start('MainMenu')
      console.log('Game exited')
      // Todo ...
    }
  }
}
