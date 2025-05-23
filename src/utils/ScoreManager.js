export class ScoreManager {
  constructor(scene) {
    this.scene = scene
    this.fruitGroup = null
  }

  create() {
    // Create fruits
    this.fruitGroup = this.scene.physics.add.group()
    this.createFruits()
  }

  createFruits() {
    this.wumpaSprites = []

    const fruitPositions = [
      // Ground positions
      { x: 551, y: 575 },
      { x: 651, y: 575 },
      { x: 751, y: 575 },
      { x: 851, y: 575 },
      { x: 1600, y: 575 },
      { x: 1700, y: 575 },
      { x: 1800, y: 575 },
      { x: 1900, y: 575 },
      { x: 2126, y: 575 },
      { x: 2226, y: 575 },
      { x: 2326, y: 575 },
      { x: 2426, y: 575 },
      { x: 2526, y: 575 },
      { x: 2626, y: 575 },
      { x: 2726, y: 575 },
      { x: 2826, y: 575 },
      { x: 2926, y: 575 },
      { x: 3026, y: 575 },
      { x: 3126, y: 575 },
      { x: 3626, y: 575 },
      { x: 3726, y: 575 },
      { x: 3826, y: 575 },
      { x: 3926, y: 575 },
      { x: 4026, y: 575 },
      { x: 4126, y: 575 },
      { x: 4226, y: 575 },
      { x: 4326, y: 575 },
      { x: 4426, y: 575 },
      { x: 4526, y: 575 },
      { x: 4751, y: 575 },
      { x: 4851, y: 575 },
      { x: 4951, y: 575 },
      { x: 5051, y: 575 },
      { x: 6126, y: 575 },
      // Platform/other positions
      { x: -10, y: -10 },
      { x: 50, y: 100 },
      { x: 200, y: 250 },
      { x: 300, y: 250 },
      { x: 1126, y: 425 },
      { x: 1226, y: 425 },
      { x: 1326, y: 425 },
      { x: 1913, y: 230 },
      { x: 2013, y: 230 },
      { x: 2013, y: 380 },
      { x: 2113, y: 230 },
      { x: 2513, y: 280 },
      { x: 2613, y: 280 },
      { x: 2713, y: 280 },
      { x: 3225, y: 230 },
      { x: 3325, y: 230 },
      { x: 3325, y: 380 },
      { x: 3425, y: 230 },
      { x: 5076, y: 140 },
      { x: 5076, y: 40 },
      { x: 5826, y: 140 },
      { x: 5926, y: 140 },
      { x: 6326, y: 140 },
      { x: 6426, y: 140 },
      { x: 6526, y: 140 },
      { x: 6626, y: 140 },
    ]

    // Create fruits
    fruitPositions.forEach((pos) => {
      const wumpa_fruit = this.fruitGroup.create(pos.x, pos.y, 'wumpa_fruit')
      wumpa_fruit.setScale(0.15)
      wumpa_fruit.setCircle(130, 15, 30)
      wumpa_fruit.setBounce(0.3)
      wumpa_fruit.setDepth(3)
      wumpa_fruit.body.setAllowGravity(false)

      this.wumpaSprites.push({
        sprite: wumpa_fruit,
        startY: pos.y,
      })
    })
  }

  updateFruits(time) {
    if (!this.wumpaSprites) return

    const waveAmplitude = 3
    const waveSpeed = 0.003

    this.wumpaSprites.forEach(({ sprite, startY }) => {
      if (!sprite.active) return
      sprite.y = startY + Math.sin(time * waveSpeed) * waveAmplitude
    })
  }

  update(time, delta) {
    this.updateFruits(time)
  }
}
