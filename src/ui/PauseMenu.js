import { gameState } from '../GameState'
import { saveManager } from '../utils/SaveManager'

export class PauseMenu {
  constructor(scene, { onResume, onRestart, onSettings, onMainMenu, onSaveAndQuit }) {
    this.scene = scene
    this.onResume = onResume
    this.onRestart = onRestart
    this.onSettings = onSettings
    this.onMainMenu = onMainMenu
    this.onSaveAndQuit = onSaveAndQuit

    this.options = ['Resume', 'Restart', 'Settings', 'Main Menu', 'Save and Quit']
    this.optionTexts = []
    this.selectedIndex = 0

    this.container = this.scene.add.container(0, 0)
    this.container.setDepth(999)
    this.container.setScrollFactor(0)

    this.create()
  }

  create() {
    const centerX = this.scene.cameras.main.width / 2
    let y = 150

    const fullScreenBg = this.scene.add.rectangle(
      this.scene.cameras.main.width / 2,
      this.scene.cameras.main.height / 2,
      this.scene.cameras.main.width * 2,
      this.scene.cameras.main.height * 2,
      0x000000
    )
    fullScreenBg.setAlpha(0.5)
    fullScreenBg.setDepth(998)
    fullScreenBg.setScrollFactor(0)
    this.container.add(fullScreenBg)

    const title = this.scene.add
      .text(centerX, y, 'PAUSED', {
        fontFamily: 'Zoinks',
        fontSize: '48px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4,
      })
      .setOrigin(0.5)

    this.container.add(title)
    y += 75

    this.options.forEach((label, i) => {
      const text = this.scene.add
        .text(centerX, y + i * 50, label, {
          fontFamily: 'Zoinks',
          fontSize: '32px',
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 3,
        })
        .setOrigin(0.5)
      this.optionTexts.push(text)
      this.container.add(text)
    })
  }

  update() {
    const iM = this.scene.inputManager

    // Navigation
    if (iM.isMenuDownPressed()) {
      this.selectedIndex = (this.selectedIndex + 1) % this.options.length
    } else if (iM.isMenuUpPressed()) {
      this.selectedIndex = (this.selectedIndex - 1 + this.options.length) % this.options.length
    }

    // Highlight selected
    this.optionTexts.forEach((text, i) => {
      text.setColor(i === this.selectedIndex ? '#ffcc00' : '#ffffff')
    })

    // Select
    if (iM.isMenuSelectPressed()) {
      this.handleSelect()
    } else if (iM.isMenuBackPressed()) {
      this.handleSelect(0)
    }
  }

  handleSelect(forcedIndex = null) {
    const index = forcedIndex !== null ? forcedIndex : this.selectedIndex
    const option = this.options[index]

    this.destroy()

    switch (option) {
      case 'Resume':
        this.onResume?.()
        break
      case 'Restart':
        this.onRestart?.()
        break
      case 'Settings':
        this.onSettings?.()
        break
      case 'Main Menu':
        this.onMainMenu?.()
        break
      case 'Save and Quit':
        this.onSaveAndQuit?.(
          saveManager.save({
            position: {
              x: this.scene.player.sprite.x,
              y: this.scene.player.sprite.y,
            },
            lives: gameState.lives,
            score: gameState.score,
          })
        )
        break
    }
  }

  destroy() {
    this.container.destroy(true)
  }
}
