export class BackgroundManager {
  constructor(scene) {
    this.scene = scene
  }

  create() {
    this.createBackground()
  }

  createBackground() {
    const segmentWidth = 1152
    const totalSegments = 9

    for (let i = 0; i < totalSegments; i++) {
      const x = i * segmentWidth
      const flip = i % 2 !== 0

      this.scene.add
        .image(x, 0, 'bg-level_jungle')
        .setOrigin(0)
        .setDepth(-10)
        .setScale(0.75)
        .setFlipX(flip)
    }
  }
}
