import Phaser, { Scene } from 'phaser'
import { EventBus } from '../EventBus.js'
import { inputManager } from '../utils/InputManager.js'
import { Level1 } from '../levels/Level1.js'

export class Game extends Scene {
  constructor() {
    super('Game')
  }

  create() {
    // Set world bounds
    this.physics.world.setBounds(0, 0, 10240, 768)

    // Set camera
    let { width: worldWidth, height: worldHeight } = this.physics.world.bounds
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.zoom = 1.25

    // Inputs
    this.inputManager = inputManager

    this.explosionSound = this.sound.add('sfx-tnt')

    // Levels
    this.level = new Level1(this)
    this.level.create()

    EventBus.emit('current-scene-ready', this)
  }

  update(time, delta) {
    this.level?.update(time, delta, inputManager)

    if (inputManager.isPausePressed()) {
      EventBus.emit('toggle-pause-menu')
    }
  }
}
