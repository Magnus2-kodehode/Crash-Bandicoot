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
import { Score } from '../ui/Score.js'
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
    this.scoreManager = new ScoreManager(this.scene)
    this.scoreManager.create()
    this.score = new Score(this.scene, this.scoreManager)
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
      score: this.scoreManager,
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

    this.cutscenes.addCutscene(
      'cutscene-boss',
      () => this.scene.player?.sprite?.x > 9500,
      'cutscene-boss'
    )

    this.subtitles.addSubtitle(
      'subtitle-boss',
      () => this.scene.player?.sprite?.x > 9600,
      'subtitle-boss'
    )
  }

  update(time, delta) {
    this.traps.updateWaterMovement(time)
    this.scoreManager.update(time, delta)

    this.player?.update(time, delta, inputManager)
    this.mask?.update(time, delta)
    this.characters.update(time, delta)

    this.cutscenes.update(time, delta)
    this.subtitles.update(time, delta)
  }
}
