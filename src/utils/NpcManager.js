import { EnemyOda } from '../characters/EnemyOda.js'
import { EnemyJumpingJack } from '../characters/EnemyJumpingJack.js'
import { EnemyRunningRupert } from '../characters/EnemyRunningRupert.js'
import { EnemyChunkyCheeks } from '../characters/EnemyChunkyCheeks.js'
import { EnemySillySally } from '../characters/EnemySillySally.js'
import { EnemySpider } from '../characters/EnemySpider.js'
import { EnemySkitterSpindle } from '../characters/EnemySkitterSpindle.js'
import { EnemyCreature } from '../characters/EnemyCreature.js'
import { EnemyCutieCthulu } from '../characters/EnemyCutieCthulu.js'
import { EnemyDreadDrooler } from '../characters/EnemyDreadDrooler.js'
import { EnemyMutatedFrog } from '../characters/EnemyMutatedFrog.js'
import { EnemyNutbusterMkII } from '../characters/EnemyNutbusterMkII.js'
import { EnemyFishmoley } from '../characters/EnemyFishmoley.js'
import { EnemyGrizzleGuts } from '../characters/EnemyGrizzleGuts.js'
import { EnemyFlappyFang } from '../characters/EnemyFlappyFang.js'
import { EnemyBananaBandit } from '../characters/EnemyBananaBandit.js'
import { EnemyGorilla } from '../characters/EnemyGorilla.js'
import { EnemyGrumpuff } from '../characters/EnemyGrumpuff.js'
import { EnemyRazor } from '../characters/EnemyRazor.js'

export class NpcManager {
  constructor(scene) {
    this.scene = scene
    this.enemies = []
  }

  create() {
    this.enemies = [
      new EnemyOda(this.scene, 110, 250),
      new EnemyJumpingJack(this.scene, 750, 550),
      new EnemyRunningRupert(this.scene, 2713, 550),
      new EnemyChunkyCheeks(this.scene, 2638, 200),
      new EnemySillySally(this.scene, 1213, 125),
      new EnemyFishmoley(this.scene, 3323, 700),
      new EnemyFlappyFang(this.scene, 2963, 200),
      new EnemySpider(this.scene, 2013, 200),
      new EnemySkitterSpindle(this.scene, 6213, 505),
      new EnemyCreature(this.scene, 2013, 700),
      new EnemyCutieCthulu(this.scene, 4113, 500),
      new EnemyMutatedFrog(this.scene, 4898, 500),
      new EnemyDreadDrooler(this.scene, 5613, 500),
      new EnemyNutbusterMkII(this.scene, 3538, 500),
      new EnemyBananaBandit(this.scene, 5263, 110),
      new EnemyGorilla(this.scene, 6323, 200),
      new EnemyRazor(this.scene, 7013, 700),
      new EnemyGrumpuff(this.scene, 500, 500),
      new EnemyGrizzleGuts(this.scene, 10000, 300),
    ]
  }

  update(time, delta) {
    this.enemies.forEach((enemy) => enemy.update(time, delta))
  }
}
