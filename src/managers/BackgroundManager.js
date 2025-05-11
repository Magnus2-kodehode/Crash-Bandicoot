export class BackgroundManager {
  constructor(scene) {
    this.scene = scene
  }

  createBackground() {
    const segmentWidth = 1228
    const totalSegments = 9

    for (let i = 0; i < totalSegments; i++) {
      const x = i * segmentWidth
      const flip = i % 2 !== 0

      this.scene.add
        .image(x, 0, 'bg-game-jungle')
        .setOrigin(0, 0)
        .setDepth(-10)
        .setScale(0.8)
        .setFlipX(flip)
    }
  }
}
