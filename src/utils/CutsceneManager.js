import { gameState } from '../GameState'

export class CutsceneManager {
  constructor(scene) {
    this.scene = scene
    this.cutscenes = []
    this.hasShown = new Set()
  }

  create() {
    this.cutsceneContainer = this.scene.add.container(0, 0).setDepth(999).setScrollFactor(0)

    // Use in Level_.create(). Example:
    // this.addCutscene('cutscene-boss', () => this.scene.player?.sprite?.x > 9500, 'play-cutscene-boss')
  }

  update(time, delta) {
    this.cutscenes.forEach(({ id, condition, key }) => {
      if (!this.hasShown.has(id) && condition()) {
        this.playCutscene(key)
        this.hasShown.add(id)
      }
    })
  }

  addCutscene(id, condition, videoKey) {
    this.cutscenes.push({ id, condition, key: videoKey })
  }

  playCutscene(key) {
    gameState.isCutscenePlaying = true
    const overlay = this.scene.add.rectangle(0, 0, 1024, 768, 0x000000)
    overlay.setOrigin(0)
    overlay.setScrollFactor(0)
    overlay.setDepth(998)
    this.cutsceneContainer.add(overlay)

    const video = this.scene.add.video(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY,
      key
    )
    video.setOrigin(0.5)
    video.setScrollFactor(0)
    video.setDepth(999)
    this.cutsceneContainer.add(video)

    this.scene.input.enabled = false
    video.setLoop(false)
    video.play()
    video.once('complete', () => {
      video.destroy()
      overlay.destroy()
      this.scene.input.enabled = true
      gameState.isCutscenePlaying = false
    })
  }
}
