export class SettingsMenu {
  constructor(scene, onClose) {
    this.scene = scene
    this.onClose = onClose
    this.container = this.scene.add.container(0, 0)
    this.container.setDepth(999)
    this.container.setScrollFactor(0)

    this.options = ['Music Volume', 'Mute', 'SFX Volume', 'Mute', 'Fullscreen', 'Back']
    this.optionTexts = []
    this.selectedIndex = 0

    this.musicVolume = 0.5
    this.sfxVolume = 0.5
    this.isMuted = false
    this.isFullscreen = false

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
      .text(centerX, y, 'Settings', {
        fontFamily: 'Zoinks',
        fontSize: '48px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 5,
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
          strokeThickness: 5,
        })
        .setOrigin(0.5)
      this.optionTexts.push(text)
      this.container.add(text)
    })
  }

  update() {
    const iM = this.scene.inputManager
    const vM = this.scene.volumeManager

    // Highlight selected
    this.optionTexts.forEach((text, i) => {
      text.setColor(i === this.selectedIndex ? '#ffcc00' : '#ffffff')
    })

    // Navigation
    if (iM.isMenuDownPressed()) {
      this.selectedIndex = (this.selectedIndex + 1) % this.options.length
    } else if (iM.isMenuUpPressed()) {
      this.selectedIndex = (this.selectedIndex - 1 + this.options.length) % this.options.length
    }

    // Adjust volume
    const selected = this.options[this.selectedIndex]
    if (selected.includes('Volume')) {
      if (iM.isMenuLeftPressed()) {
        this.adjustVolume(-0.05)
      } else if (iM.isMenuRightPressed()) {
        this.adjustVolume(0.05)
      }
    }

    // Select
    if (iM.isMenuSelectPressed()) {
      if (selected === 'Mute') {
        this.isMuted = !this.isMuted
        vM.setMuted(this.isMuted)
      } else if (selected === 'Fullscreen') {
        this.toggleFullscreen()
      } else if (selected === 'Back') {
        this.destroy()
        if (this.onClose) {
          this.onClose()
        }
      }
    }
  }

  adjustVolume(amount) {
    const vM = this.scene.volumeManager
    if (this.options[this.selectedIndex] === 'Music Volume') {
      this.musicVolume = Phaser.Math.Clamp(this.musicVolume + amount, 0, 1)
      vM.setMusicVolume(this.musicVolume)
    } else if (this.options[this.selectedIndex] === 'SFX Volume') {
      this.sfxVolume = Phaser.Math.Clamp(this.sfxVolume + amount, 0, 1)
      vM.setSfxVolume(this.sfxVolume)
    }
    vM.applyVolumeToAllSounds(this.scene.game)
  }

  toggleFullscreen() {
    const elem = document.documentElement
    if (!document.fullscreenElement) {
      elem.requestFullscreen()?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  destroy() {
    this.container.destroy(true)
  }
}
