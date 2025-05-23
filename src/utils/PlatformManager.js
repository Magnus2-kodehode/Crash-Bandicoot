export class PlatformManager {
  constructor(scene) {
    this.scene = scene
    this.platformGrassGroup = null
    this.platformWoodGroup = null
    this.platformStoneGroup = null
    this.dirtGroup = null
    this.ground = null
    this.platforms = []
  }

  create() {
    const { physics } = this.scene

    this.platformGrassGroup = this.scene.physics.add.group()
    this.createPlatformsGrass()
    this.platformWoodGroup = this.scene.physics.add.group()
    this.createPlatformsWood()
    this.platformStoneGroup = this.scene.physics.add.group()
    this.createPlatformsStone()

    this.wallStoneGroup = this.scene.physics.add.group()
    this.createWallsStone()
  }

  createPlatformsGrass() {
    const platformGrassPositions = [
      { x: 0, y: 666 },
      { x: 350, y: 666 },
      { x: 700, y: 666 },
      // water
      { x: 1750, y: 666 },
      { x: 2275, y: 666 },
      { x: 2625, y: 666 },
      { x: 2975, y: 666 },
      // water
      { x: 3675, y: 666 },
      { x: 4025, y: 666 },
      { x: 4375, y: 666 },
      // water
      { x: 4900, y: 666 },
      // water
      { x: 5425, y: 666 },
      { x: 5775, y: 666 },
      // water
      { x: 6475, y: 666 },
      // water
      { x: 7525, y: 666 },
      { x: 7875, y: 666 },
      { x: 8225, y: 666 },
      { x: 8575, y: 666 },
      { x: 8925, y: 666 },
      { x: 9275, y: 666 },
      { x: 9625, y: 666 },
      { x: 9975, y: 666 },
      { x: 10325, y: 666 },
    ]

    platformGrassPositions.forEach((pos) => {
      const platformGrass = this.platformGrassGroup.create(pos.x, pos.y, 'platform-grass')
      platformGrass.setScale(0.35)
      platformGrass.setSize(1000, 200)
      platformGrass.setOffset(75, 130)
      platformGrass.setDepth(10)
      platformGrass.setImmovable(true)
      platformGrass.body.setAllowGravity(false)
      platformGrass.refreshBody()
    })
  }

  createPlatformsWood() {
    const platformWoodPositions = [
      { x: 200, y: 320 },
      { x: 1225, y: 500 },
      { x: 2013, y: 300 },
      { x: 2613, y: 350 },
      { x: 3325, y: 300 },
    ]

    platformWoodPositions.forEach((pos) => {
      const platformWood = this.platformWoodGroup.create(pos.x, pos.y, 'platform-wood')
      platformWood.setScale(0.25)
      platformWood.setSize(970, 160)
      platformWood.setOffset(50, 10)
      platformWood.setDepth(4)
      platformWood.setImmovable(true)
      platformWood.body.setAllowGravity(false)
      platformWood.refreshBody()
    })
  }

  createPlatformsStone() {
    const platformStonePositions = [
      // 245 mellom hver
      { x: 5123, y: 205 },
      { x: 5368, y: 205 },
      { x: 5613, y: 450 },
      { x: 5858, y: 205 },
      { x: 6103, y: 450 },
      { x: 6348, y: 450 },
      { x: 6348, y: 205 },
      { x: 6593, y: 205 },
    ]

    platformStonePositions.forEach((pos) => {
      const platformStone = this.platformStoneGroup.create(pos.x, pos.y, 'platform-stone')
      platformStone.setScale(0.5)
      platformStone.setSize(490, 90)
      platformStone.setOffset(5, 5)
      platformStone.setDepth(6)
      platformStone.setImmovable(true)
      platformStone.body.setAllowGravity(false)
      platformStone.refreshBody()
    })
  }

  createWallsStone() {
    const wallStonePositions = [
      // 245 mellom hver
      { x: 5001, y: 83 },
      { x: 5738, y: 328 },
      { x: 5738, y: 83 },
      { x: 6471, y: 328 },
    ]

    wallStonePositions.forEach((pos) => {
      const wallStone = this.wallStoneGroup.create(pos.x, pos.y, 'wall-stone')
      wallStone.setScale(0.5)
      wallStone.setSize(90, 490)
      wallStone.setOffset(5, 5)
      wallStone.setDepth(5)
      wallStone.setImmovable(true)
      wallStone.body.setAllowGravity(false)
      wallStone.refreshBody()
    })
  }
}
