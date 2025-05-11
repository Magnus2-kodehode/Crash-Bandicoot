import { EventBus } from '../EventBus.js'
import { gameState } from '../GameState.js'

export class LevelManager {
  constructor(scene) {
    this.scene = scene
    this.fruitGroup = null
    this.tntGroup = null
    this.tntTimers = []
    this.waterGroup = null
    this.platformGrassGroup = null
    this.platformWoodGroup = null
    this.dirtGroup = null
    this.ground = null
    this.platforms = []
    this.hasShownBossSubtitle = false
  }

  resetLevel() {
    // Remove
    this.fruitGroup.clear(true, true)
    this.tntGroup.clear(true, true)
    this.boxGroup.clear(true, true)
    this.boxWumpaFruitGroup.clear(true, true)

    // Create
    this.createFruits()
    this.createTNT()
    this.createBoxes()
    this.createBoxesWumpaFruits()
  }

  createLevel() {
    // Create platforms
    this.platformGrassGroup = this.scene.physics.add.group()
    this.createPlatformsGrass()
    this.platformWoodGroup = this.scene.physics.add.group()
    this.createPlatformsWood()
    this.platformStoneGroup = this.scene.physics.add.group()
    this.createPlatformsStone()

    // Create walls
    this.wallStoneGroup = this.scene.physics.add.group()
    this.createWallsStone()

    // Create spikes
    this.spikesBottomGroup = this.scene.physics.add.group()
    this.createSpikesBottom()
    this.spikesTopGroup = this.scene.physics.add.group()
    this.createSpikesTop()
    this.spikesLeftGroup = this.scene.physics.add.group()
    this.createSpikesLeft()
    this.spikesRightGroup = this.scene.physics.add.group()
    this.createSpikesRight()

    // Create boxes
    this.boxGroup = this.scene.physics.add.group()
    this.createBoxes()

    // Create wumpa fruit boxes
    this.boxWumpaFruitGroup = this.scene.physics.add.group()
    this.createBoxesWumpaFruits()

    // Create TNT
    this.tntGroup = this.scene.physics.add.group()
    this.createTNT()

    // Create water
    this.waterGroup = this.scene.physics.add.group()
    this.createWater()

    // Create fruits
    this.fruitGroup = this.scene.physics.add.group()
    this.createFruits()
  }

  createPlatformsGrass() {
    const platformGrassPositions = [
      { x: -112, y: 666 },
      { x: 237, y: 666 },
      { x: 587, y: 666 },
      // { x: 1287, y: 666 },
      // { x: 1462, y: 666 },
      { x: 1637, y: 666 },
      { x: 2162, y: 666 },
      { x: 2512, y: 666 },
      { x: 2862, y: 666 },
      // { x: 3212, y: 666 },
      { x: 3562, y: 666 },
      { x: 3912, y: 666 },
      { x: 4262, y: 666 },
      // { x: 4612, y: 666 },
      { x: 4787, y: 666 },
      { x: 5312, y: 666 },
      { x: 5662, y: 666 },
      // { x: 6012, y: 666 },
      { x: 6362, y: 666 },
      // { x: 6712, y: 666 },
      // { x: 7062, y: 666 },
      { x: 7412, y: 666 },
      { x: 7762, y: 666 },
      { x: 8112, y: 666 },
      { x: 8462, y: 666 },
      { x: 8812, y: 666 },
      { x: 9162, y: 666 },
      { x: 9512, y: 666 },
      { x: 9862, y: 666 },
      { x: 10212, y: 666 },
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
      { x: 1112, y: 500 },
      { x: 1900, y: 300 },
      { x: 2500, y: 350 },
      { x: 3212, y: 300 },
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
      // x: 245 mellom hver
      // y: 245 mellom hver
      // { x: 200, y: 450 },
      // { x: 445, y: 450 },
      // { x: 445, y: 205 },
      { x: 5010, y: 205 },
      { x: 5255, y: 205 },
      { x: 5500, y: 450 },
      { x: 5745, y: 205 },
      { x: 5990, y: 450 },
      { x: 6235, y: 450 },
      { x: 6235, y: 205 },
      { x: 6480, y: 205 },
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
      // x: 245 mellom hver
      // y: 245 mellom hver
      // { x: 323, y: 328 },
      // { x: 568, y: 305 },
      { x: 4888, y: 83 },
      { x: 5623, y: 328 },
      { x: 5623, y: 83 },
      { x: 6358, y: 328 },
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

  createSpikesBottom() {
    const spikesLeftPositions = []
    spikesLeftPositions.forEach((pos) => {
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
    const spikesTopPositions = [{ x: -500, y: -500 }]

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
      { x: 5660, y: 388 },
      { x: 5660, y: 268 },
    ]

    spikesLeftPositions.forEach((pos) => {
      const spikesBottom = this.spikesBottomGroup.create(pos.x, pos.y, 'spikes-left')
      spikesBottom.setScale(0.5)
      spikesBottom.setSize(55, 240)
      spikesBottom.setOffset(0, 0)
      spikesBottom.setDepth(3)
      spikesBottom.setImmovable(true)
      spikesBottom.body.setAllowGravity(false)
      spikesBottom.refreshBody()
    })
  }

  createSpikesRight() {
    const spikesRightPositions = [
      { x: 5585, y: 23 },
      { x: 5585, y: 143 },
      { x: 6320, y: 388 },
      { x: 6320, y: 268 },
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

  createBoxes() {
    const boxPositions = [
      { x: 1600, y: 325 },
      { x: 5555, y: 385 },
    ]

    boxPositions.forEach((pos) => {
      const box = this.boxGroup.create(pos.x, pos.y, 'crate-basic')
      box.setScale(0.35)
      box.setSize(250, 250)
      box.setOffset(0, 0)
      box.setDepth(5)
      box.setImmovable(true)
      box.body.setAllowGravity(false)
      box.refreshBody()
    })
  }

  createBoxesWumpaFruits() {
    const boxWumpaFruitPositions = [
      { x: 1687, y: 325 },
      // { x: 300, y: 580 },
    ]

    boxWumpaFruitPositions.forEach((pos) => {
      const boxWumpaFruit = this.boxWumpaFruitGroup.create(pos.x, pos.y, 'crate-wumpa_fruits')
      boxWumpaFruit.setScale(0.35)
      boxWumpaFruit.setSize(250, 250)
      boxWumpaFruit.setOffset(0, 0)
      boxWumpaFruit.setDepth(5)
      boxWumpaFruit.setImmovable(true)
      boxWumpaFruit.body.setAllowGravity(false)
      boxWumpaFruit.refreshBody()
    })
  }

  createTNT() {
    const tntPositions = [
      { x: 2455, y: 415 },
      { x: 2542, y: 415 },
      { x: 5555, y: 298 },
    ]

    tntPositions.forEach((pos) => {
      const tnt = this.tntGroup.create(pos.x, pos.y, 'crate-tnt')
      tnt.setScale(0.35)
      tnt.setBounce(0.3)
      tnt.setDepth(4)
      tnt.setData('tntCountdown', false)
      tnt.body.setAllowGravity(false)
    })
  }

  explodeTNT(tnt) {
    if (!this.scene || !this.scene.sys?.isActive()) return

    const explosion = this.scene.add.sprite(tnt.x, tnt.y, 'crate-tnt-explode')
    explosion.setScale(0.2)
    explosion.setAlpha(0)

    this.scene.tweens.add({
      targets: explosion,
      alpha: 1,
      duration: 1,
      ease: 'Linear',
      onComplete: () => {
        // After explosion fades out, destroy the explosion sprite
        this.scene.tweens.add({
          targets: explosion,
          alpha: 0,
          duration: 150,
          ease: 'Linear',
          onComplete: () => {
            explosion.destroy()
          },
        })
      },
    })

    const dx = tnt.x - this.scene.player?.sprite?.x ?? 0
    const dy = tnt.y - this.scene.player?.sprite?.y ?? 0
    const distance = Math.sqrt(dx * dx + dy * dy)
    const tntExplosionRadius = 300

    if (distance < tntExplosionRadius) {
      gameState.lives--
      EventBus.emit('lose-life')

      if (gameState.lives <= 0) {
        EventBus.emit('reset-game')
        this.scene.scene.start('GameOver')
        return
      } else {
        this.scene.respawnPlayer()
      }
    }

    this.scene.enemies?.forEach((enemy) => {
      if (!enemy?.sprite?.active) return

      const distanceX = tnt.x - enemy.sprite.x
      const distanceY = tnt.y - enemy.sprite.y
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      if (distance < tntExplosionRadius && typeof enemy.kill === 'function') {
        enemy.kill()
      }
    })

    const crateGroups = [this.boxGroup, this.boxWumpaFruitGroup]

    crateGroups.forEach((group) => {
      if (!group) return

      group.children.iterate((crate) => {
        if (!crate || !crate.active) return

        const dx = tnt.x - crate.x
        const dy = tnt.y - crate.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < tntExplosionRadius) {
          crate.destroy()
        }
      })
    })

    tnt.destroy()
  }

  clearTNTTimers() {
    this.tntTimers.forEach((timer) => {
      if (timer && !timer.hasDispatched) {
        timer.remove(false)
      }
    })
    this.tntTimers = []
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

  smashWumpaFruitBox(box) {
    box.setData('smashed', true)

    // Play smash animation
    box.setTexture('crate-basic-break')
    box.setScale(0.15)

    // Spawn wumpa fruits (3-5 random fruits)
    const fruitCount = Phaser.Math.Between(3, 5)
    for (let i = 0; i < fruitCount; i++) {
      const offsetX = Phaser.Math.Between(-50, 50)
      const offsetY = Phaser.Math.Between(-10, 10)

      const fruit = this.fruitGroup.create(box.x + offsetX, box.y + offsetY, 'wumpa_fruit')

      fruit.setScale(0.15)
      fruit.setBounce(0.5)
      fruit.setDepth(3)
      fruit.body.setAllowGravity(false)

      // Add to wumpa sprites array for the wave animation
      this.wumpaSprites.push({
        sprite: fruit,
        startY: fruit.y,
      })
    }

    // Fade out and remove the broken box after a delay
    this.scene.tweens.add({
      targets: box,
      alpha: 0,
      duration: 300,
      delay: 500,
      ease: 'Power2',
      onComplete: () => {
        box.destroy()
      },
    })
  }

  updateWaterMovement(time) {
    if (!this.waterSprites) return

    this.waterSprites.forEach((waterData) => {
      const {
        sprite,
        startX,
        startY,
        range,
        speed,
        direction,
        initialFlipX,
        waveAmplitude,
        waveSpeed,
      } = waterData

      if (!sprite.active) return

      const offset = sprite.x - startX
      sprite.x += speed * direction

      if (direction === 1 && offset >= range) {
        waterData.direction = -1
      } else if (direction === -1 && offset <= -range) {
        waterData.direction = 1
      }

      // sprite.setFlipX(waterData.direction < 0 ? !initialFlipX : initialFlipX);

      sprite.y = startY + Math.sin(time * waveSpeed) * waveAmplitude
    })
  }

  createFruits() {
    this.wumpaSprites = []

    const fruitPositions = [
      // Ground positions
      { x: 438, y: 575 },
      { x: 538, y: 575 },
      { x: 638, y: 575 },
      { x: 738, y: 575 },
      { x: 1487, y: 575 },
      { x: 1587, y: 575 },
      { x: 1687, y: 575 },
      { x: 1787, y: 575 },
      { x: 2013, y: 575 },
      { x: 2113, y: 575 },
      { x: 2213, y: 575 },
      { x: 2313, y: 575 },
      { x: 2413, y: 575 },
      { x: 2513, y: 575 },
      { x: 2613, y: 575 },
      { x: 2713, y: 575 },
      { x: 2813, y: 575 },
      { x: 2913, y: 575 },
      { x: 3013, y: 575 },
      { x: 3513, y: 575 },
      { x: 3613, y: 575 },
      { x: 3713, y: 575 },
      { x: 3813, y: 575 },
      { x: 3913, y: 575 },
      { x: 4013, y: 575 },
      { x: 4113, y: 575 },
      { x: 4213, y: 575 },
      { x: 4313, y: 575 },
      { x: 4413, y: 575 },
      { x: 4638, y: 575 },
      { x: 4738, y: 575 },
      { x: 4838, y: 575 },
      { x: 4938, y: 575 },
      { x: 6013, y: 575 },
      // Platform/other positions
      { x: -10, y: -10 },
      { x: 50, y: 100 },
      { x: 200, y: 250 },
      { x: 300, y: 250 },
      { x: 1013, y: 425 },
      { x: 1113, y: 425 },
      { x: 1213, y: 425 },
      { x: 1800, y: 230 },
      { x: 1900, y: 230 },
      { x: 1900, y: 380 },
      { x: 2000, y: 230 },
      { x: 2400, y: 280 },
      { x: 2500, y: 280 },
      { x: 2600, y: 280 },
      { x: 3112, y: 230 },
      { x: 3212, y: 230 },
      { x: 3212, y: 380 },
      { x: 3312, y: 230 },
      { x: 4963, y: 140 },
      { x: 4963, y: 40 },
      { x: 5713, y: 140 },
      { x: 5813, y: 140 },
      { x: 6213, y: 140 },
      { x: 6313, y: 140 },
      { x: 6413, y: 140 },
      { x: 6513, y: 140 },
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

  showBossCutscene() {
    const player = this.scene.player
    if (player.sprite.x > 9500 && !this.hasShownBossCutscene) {
      EventBus.emit('play-boss-cutscene')
      this.hasShownBossCutscene = true
    }
  }

  showBossSubtitle() {
    const player = this.scene.player
    if (player.sprite.x > 9650 && !this.hasShownBossSubtitle) {
      EventBus.emit('show-boss-subtitle')
      this.hasShownBossSubtitle = true
    }
  }
}
