import { EventBus } from '../EventBus'
import { gameState } from '../GameState'

export class Score {
  constructor(scene) {
    this.scene = scene

    this.fruitIcon = this.scene.add
      .image(125, 90, 'wumpa_fruit')
      .setOrigin(0, 0)
      .setDepth(995)
      .setScale(0.2)
      .setScrollFactor(0)

    this.fruitText = this.scene.add.text(200, 100, `${gameState.score}`, {
      fontFamily: 'Zoinks',
      fontSize: '40px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    })
    this.fruitText.setDepth(995).setScrollFactor(0)

    this.lifeText = this.scene.add.text(
      this.scene.cameras.main.width - 200,
      100,
      `${gameState.lives}`,
      {
        fontFamily: 'Zoinks',
        fontSize: '40px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4,
      }
    )
    this.lifeText.setOrigin(1, 0).setDepth(995).setScrollFactor(0)

    this.lifeIcon = this.scene.add
      .image(this.scene.cameras.main.width - 190, 90, 'extra_life')
      .setOrigin(0, 0)
      .setDepth(995)
      .setScale(0.2)
      .setScrollFactor(0)

    this.registerEvents()
  }

  registerEvents() {
    EventBus.on('score-updated', this.updateUI, this)
  }

  updateUI = () => {
    if (!this.fruitText || !this.lifeText) return
    if (this.fruitText?.active || this.lifeText?.active) {
      this.fruitText.setText(`${gameState.score}`)
      this.lifeText.setText(`${gameState.lives}`)
    }
  }

  destroy() {
    EventBus.off('add-score', this.updateUI, this)
    EventBus.off('lose-life', this.updateUI, this)
    EventBus.off('reset-game', this.updateUI, this)

    this.fruitText?.destroy()
    this.lifeText?.destroy()
    this.fruitIcon?.destroy()
    this.lifeIcon?.destroy()

    this.fruitText = null
    this.lifeText = null
    this.fruitIcon = null
    this.lifeIcon = null
  }
}
