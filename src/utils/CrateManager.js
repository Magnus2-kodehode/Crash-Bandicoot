export class CrateManager {
  constructor(scene, levelManager, fruitGroup) {
    this.scene = scene
    this.levelManager = levelManager
    this.fruitGroup = fruitGroup
    this.tntGroup = null
    this.tntTimers = []
    this.explosionSound = this.scene.explosionSound
  }

  create() {
    this.boxGroup = this.scene.physics.add.group()
    this.createBoxes()
    this.boxWumpaFruitGroup = this.scene.physics.add.group()
    this.createBoxesWumpaFruits()
    this.tntGroup = this.scene.physics.add.group()
    this.createTNT()
  }

  createBoxes() {
    const boxPositions = [
      { x: 1713, y: 325 },
      { x: 5668, y: 385 },
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
    const boxWumpaFruitPositions = [{ x: 1800, y: 325 }]

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

      const fruit = this.levelManager.fruitGroup.create(
        box.x + offsetX,
        box.y + offsetY,
        'wumpa_fruit'
      )

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

  createTNT() {
    const tntPositions = [
      { x: 2568, y: 415 },
      { x: 2655, y: 415 },
      { x: 5668, y: 298 },
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

  tntCountdown(tnt) {
    if (!tnt || tnt.getData('tnt-countdown')) return

    tnt.setData('tnt-countdown', true)

    this.explosionSound.play()

    const t1 = this.scene.time.delayedCall(0, () => tnt.setTexture('crate-tnt-3'), [], this)
    const t2 = this.scene.time.delayedCall(1000, () => tnt.setTexture('crate-tnt-2'), [], this)
    const t3 = this.scene.time.delayedCall(2000, () => tnt.setTexture('crate-tnt-1'), [], this)
    const t4 = this.scene.time.delayedCall(
      3000,
      () => {
        this.explodeTNT(tnt)
        tnt.destroy()
      },
      [],
      this
    )

    this.tntTimers.push(t1, t2, t3, t4)
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
    // if (!Array.isArray(this.tntTimers)) {
    //   this.tntTimers = []
    //   return
    // }

    this.tntTimers.forEach((timer) => {
      if (timer && !timer.hasDispatched) {
        timer.remove(false)
      }
    })
    this.tntTimers = []
  }
}
