export class SubtitleManager {
  constructor(scene) {
    this.scene = scene
    this.subtitles = []
    this.hasShown = new Set()

    this.subtitleTexts = {
      'subtitle-boss': 'YOU DARE ENTER MY BURROW?! Prepare... to be mounted!',
    }
  }

  create() {
    // Use in Level_.create(). Example:
    // this.addSubtitle('subtitle-boss', () => this.scene.player?.sprite?.x > 500, 'show-subtitle-boss')
  }

  update(time, delta) {
    this.subtitles.forEach(({ id, condition, key }) => {
      if (!this.hasShown.has(id) && condition()) {
        this.showSubtitle(key)
        this.hasShown.add(id)
      }
    })
  }

  addSubtitle(id, condition, subKey) {
    this.subtitles.push({ id, condition, key: subKey })
  }

  showSubtitle(key) {
    if (this.currentText) this.currentText.destroy()

    const bg = this.scene.add.rectangle(512, 675, 450, 150, 0xffffff, 0.5)
    bg.setOrigin(0.5, 1).setDepth(1000).setScrollFactor(0)

    const text = this.subtitleTexts[key] || key

    const subtitle = this.scene.add.text(512, 384, text, {
      fontFamily: 'Zoinks',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      align: 'center',
      wordWrap: {
        width: 400,
        useAdvancedWrap: true,
      },
    })
    subtitle.setOrigin(0.5, -2.5)
    subtitle.setScrollFactor(0)
    subtitle.setDepth(1001)

    this.currentText = subtitle

    this.scene.time.delayedCall(5000, () => {
      subtitle.destroy()
      this.currentText = null
      bg.destroy()
    })
  }
}
