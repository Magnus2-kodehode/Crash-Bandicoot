import { EventBus } from '../EventBus'
import { inputManager } from '../utils/InputManager'
import { Player } from '../characters/Player'
import { Mask } from '../characters/Mask.js'

import { LevelManager } from '../utils/LevelManager.js'
import { BackgroundManager } from '../utils/BackgroundManager.js'
import { PlatformManager } from '../utils/PlatformManager.js'
import { TrapManager } from '../utils/TrapManager.js'
import { CrateManager } from '../utils/CrateManager.js'
import { NpcManager } from '../utils/NpcManager.js'
import { CollisionManager } from '../utils/CollisionManager.js'
import { ScoreManager } from '../utils/ScoreManager.js'
import { CutsceneManager } from '../utils/CutsceneManager.js'
import { SubtitleManager } from '../utils/SubtitleManager.js'

export class Level1 {
  constructor(scene) {
    this.scene = scene
  }

  create() {
    this.cutscenes = new CutsceneManager(this.scene)
    this.cutscenes.create()
    this.subtitles = new SubtitleManager(this.scene)
    this.subtitles.create()
    this.background = new BackgroundManager(this.scene)
    this.background.create()
    this.score = new ScoreManager(this.scene)
    this.score.create()
    this.platforms = new PlatformManager(this.scene)
    this.platforms.create()
    this.traps = new TrapManager(this.scene)
    this.traps.create()
    this.crates = new CrateManager(this.scene, this.score.fruitGroup)
    this.crates.create()
    this.characters = new NpcManager(this.scene)
    this.characters.create()

    this.levelManager = new LevelManager({
      platforms: this.platforms,
      crates: this.crates,
      traps: this.traps,
      score: this.score,
    })

    this.player = new Player(this.scene, 150, 550)
    this.scene.player = this.player
    this.scene.cameras.main.startFollow(this.player.sprite)
    this.mask = new Mask(this.scene, this.player)
    this.scene.mask = this.mask

    this.colliders = new CollisionManager(this.scene)
    this.colliders.init({
      player: this.player,
      enemies: this.characters.enemies,
      levelManager: this.levelManager,
    })
    this.colliders.create()
  }

  update(time, delta) {
    this.traps.updateWaterMovement(time)
    this.score.updateFruits(time)

    this.player?.update(time, delta, inputManager)
    this.mask?.update(time, delta)
    this.characters.update(time, delta)

    // this.cutscenes.checkTrigger(this.player)
    // this.subtitles.checkTrigger(this.player)
  }
}
