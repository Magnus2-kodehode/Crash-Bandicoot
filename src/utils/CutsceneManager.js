export class CutsceneManager {
  constructor(scene) {
    this.scene = scene
  }

  create() {}

  showBossCutscene() {
    const player = this.scene.player
    if (player.sprite.x > 9500 && !this.hasShownBossCutscene) {
      EventBus.emit('play-boss-cutscene')
      this.hasShownBossCutscene = true
    }
  }

  update(time, delta) {
    // Boss cutscene
    if (this.player) {
      this.levelManager.showBossCutscene()
    }
  }
}
