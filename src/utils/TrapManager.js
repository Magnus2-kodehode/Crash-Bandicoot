export class TrapManager {
  constructor(scene) {
    this.scene = scene
    this.waterGroup = null
  }

  create() {
    // Create spikes
    this.spikesBottomGroup = this.scene.physics.add.group()
    this.createSpikesBottom()
    this.spikesTopGroup = this.scene.physics.add.group()
    this.createSpikesTop()
    this.spikesLeftGroup = this.scene.physics.add.group()
    this.createSpikesLeft()
    this.spikesRightGroup = this.scene.physics.add.group()
    this.createSpikesRight()

    // Create water
    this.waterGroup = this.scene.physics.add.group()
    this.createWater()
  }

  createSpikesBottom() {
    const spikesBottomPositions = []
    spikesBottomPositions.forEach((pos) => {
      const spikesBottom = this.spikesBottomGroup.create(pos.x, pos.y, 'spikes-bottom')
      spikesBottom.setScale(0.5)
      spikesBottom.setSize(240, 55)
      spikesBottom.setOffset(0, 5)
      spikesBottom.setDepth(3)
      spikesBottom.setImmovable(true)
      spikesBottom.body.setAllowGravity(false)
      spikesBottom.refreshBody()
    })
  }

  createSpikesTop() {
    const spikesTopPositions = [
      // { x: 0, y: 0 },
    ]

    spikesTopPositions.forEach((pos) => {
      const spikesTop = this.spikesTopGroup.create(pos.x, pos.y, 'spikes-top')
      spikesTop.setScale(0.5)
      spikesTop.setSize(240, 55)
      spikesTop.setOffset(0, 0)
      spikesTop.setDepth(3)
      spikesTop.setImmovable(true)
      spikesTop.body.setAllowGravity(false)
      spikesTop.refreshBody()
    })
  }

  createSpikesLeft() {
    const spikesLeftPositions = [
      { x: 5773, y: 388 },
      { x: 5773, y: 268 },
    ]

    spikesLeftPositions.forEach((pos) => {
      const spikesLeft = this.spikesLeftGroup.create(pos.x, pos.y, 'spikes-left')
      spikesLeft.setScale(0.5)
      spikesLeft.setSize(55, 240)
      spikesLeft.setOffset(0, 0)
      spikesLeft.setDepth(3)
      spikesLeft.setImmovable(true)
      spikesLeft.body.setAllowGravity(false)
      spikesLeft.refreshBody()
    })
  }

  createSpikesRight() {
    const spikesRightPositions = [
      { x: 5698, y: 23 },
      { x: 5698, y: 143 },
      { x: 6433, y: 388 },
      { x: 6433, y: 268 },
    ]

    spikesRightPositions.forEach((pos) => {
      const spikesRight = this.spikesRightGroup.create(pos.x, pos.y, 'spikes-right')

      spikesRight.setScale(0.5)
      spikesRight.setSize(55, 240)
      spikesRight.setOffset(5, 0)
      spikesRight.setDepth(3)
      spikesRight.setImmovable(true)
      spikesRight.body.setAllowGravity(false)
      spikesRight.refreshBody()
    })
  }

  createWater() {
    this.waterSprites = []

    const waterPositions = [
      { x: -25, y: 750 },
      { x: 150, y: 750 },
      { x: 325, y: 750 },
      { x: 500, y: 750 },
      { x: 675, y: 750 },
      { x: 850, y: 750 },
      { x: 1025, y: 750 },
      { x: 1200, y: 750 },
      { x: 1375, y: 750 },
      { x: 1550, y: 750 },
      { x: 1725, y: 750 },
      { x: 1900, y: 750 },
      { x: 2075, y: 750 },
      { x: 2250, y: 750 },
      { x: 2425, y: 750 },
      { x: 2600, y: 750 },
      { x: 2775, y: 750 },
      { x: 2950, y: 750 },
      { x: 3125, y: 750 },
      { x: 3300, y: 750 },
      { x: 3475, y: 750 },
      { x: 3650, y: 750 },
      { x: 3825, y: 750 },
      { x: 4000, y: 750 },
      { x: 4175, y: 750 },
      { x: 4350, y: 750 },
      { x: 4525, y: 750 },
      { x: 4700, y: 750 },
      { x: 4875, y: 750 },
      { x: 5050, y: 750 },
      { x: 5225, y: 750 },
      { x: 5400, y: 750 },
      { x: 5575, y: 750 },
      { x: 5750, y: 750 },
      { x: 5925, y: 750 },
      { x: 6100, y: 750 },
      { x: 6275, y: 750 },
      { x: 6450, y: 750 },
      { x: 6625, y: 750 },
      { x: 6800, y: 750 },
      { x: 6975, y: 750 },
      { x: 7150, y: 750 },
      { x: 7325, y: 750 },
      { x: 7500, y: 750 },
      { x: 7675, y: 750 },
      { x: 7850, y: 750 },
      { x: 8025, y: 750 },
      { x: 8200, y: 750 },
      { x: 8375, y: 750 },
      { x: 8550, y: 750 },
      { x: 8725, y: 750 },
      { x: 8900, y: 750 },
      { x: 9075, y: 750 },
      { x: 9250, y: 750 },
      { x: 9425, y: 750 },
      { x: 9600, y: 750 },
      { x: 9775, y: 750 },
      { x: 9950, y: 750 },
      { x: 10125, y: 750 },
      { x: 10300, y: 750 },
    ]

    waterPositions.forEach((pos, index) => {
      const water = this.waterGroup.create(pos.x, pos.y, 'water')
      water.setScale(0.35)
      water.setAlpha(0.66)
      water.setDepth(9)
      water.body.setAllowGravity(false)

      const startX = pos.x
      const startY = pos.y

      const speed = 0.5
      const range = 87.5
      const direction = -1
      const waveAmplitude = 5
      const waveSpeed = 0.002

      const initialFlipX = index % 2 === 1
      water.setFlipX(initialFlipX)

      this.waterSprites.push({
        sprite: water,
        startX,
        startY,
        range,
        speed,
        direction,
        initialFlipX,
        waveAmplitude,
        waveSpeed,
      })
    })
  }

  updateWaterMovement(time) {
    if (!this.waterSprites) return

    this.waterSprites.forEach((waterData) => {
      const { sprite, startX, startY, range, speed, direction, waveAmplitude, waveSpeed } =
        waterData

      if (!sprite.active) return

      const offset = sprite.x - startX
      sprite.x += speed * direction

      if (direction === 1 && offset >= range) {
        waterData.direction = -1
      } else if (direction === -1 && offset <= -range) {
        waterData.direction = 1
      }

      sprite.y = startY + Math.sin(time * waveSpeed) * waveAmplitude
    })
  }

  update(time, delta) {
    this.updateWaterMovement(time)
  }
}
