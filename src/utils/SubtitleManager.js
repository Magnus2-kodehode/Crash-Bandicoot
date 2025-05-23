export class SubtitleManager {
  constructor(scene) {
    this.scene = scene
    this.hasShownBossSubtitle = false
  }

  create() {}

  showBossSubtitle() {
    const player = this.scene.player
    if (player.sprite.x > 9650 && !this.hasShownBossSubtitle) {
      EventBus.emit('show-boss-subtitle')
      this.hasShownBossSubtitle = true
    }
  }

  update(time, delta) {
    // Boss subtitle
    if (this.player) {
      this.levelManager.showBossSubtitle()
    }
  }
}
