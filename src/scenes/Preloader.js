import Phaser, { Scene } from 'phaser'

export class Preloader extends Scene {
  constructor() {
    super('Preloader')
  }

  init() {
    // Background
    // this.add.image(512, 384, "background");

    // Title
    const titleStyle = {
      fontFamily: 'Zoinks',
      fontSize: '48px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#000',
        blur: 5,
        fill: true,
      },
    }
    this.add.text('Crash Bandicoot: Pixel Pandemonium', titleStyle)

    // Progress bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff)
    this.load.on('progress', (progress) => {
      bar.width = 4 + 460 * progress
    })
  }

  preload() {
    // Backgrounds
    this.load.image('bg-main_menu', 'assets/backgrounds/bg-menu_v4.png')
    this.load.image('bg-level_jungle', 'assets/backgrounds/bg-level_jungle.png')
    this.load.image('bg-game_over', 'assets/backgrounds/bg-game_over.png')

    // Player
    this.load.image('player-idle', 'assets/player/idle.png')
    this.load.image('player-jump', 'assets/player/jump.png')
    this.load.image('player-fall', 'assets/player/fall.png')
    this.load.image('player-spin_attack', 'assets/player/spin_attack.png')
    this.load.image('player-death-frame_1', 'assets/player/death-frame_00.png')
    this.load.image('player-death-frame_2', 'assets/player/death-frame_01.png')
    for (let i = 0; i <= 19; i++) {
      const frame = i.toString().padStart(2, '0')
      this.load.image(`running-frame_${i}`, `assets/player/running-frame_${frame}.png`)
    }

    // NPCs
    this.load.image('mask-1', 'assets/mask-1.png')
    this.load.image('mask-2', 'assets/mask-2.png')

    // Enemies
    this.load.image('enemy-oda', 'assets/enemies/oda.png')
    this.load.image('enemy-jumping_jack', 'assets/enemies/jumping_jack.png')
    this.load.image('enemy-running_rupert', 'assets/enemies/running_rupert.png')
    this.load.image('enemy-chunky_cheeks', 'assets/enemies/chunky_cheeks.png')
    this.load.image('enemy-silly_sally', 'assets/enemies/silly_sally.png')
    this.load.image('enemy-spider', 'assets/enemies/crawling_webster.png')
    this.load.image('enemy-skitter_spindle', 'assets/enemies/skitter_spindle.png')
    this.load.image('enemy-dread_drooler', 'assets/enemies/dread_drooler.png')
    this.load.image('enemy-mutated_frog', 'assets/enemies/mutated_frog.png')
    this.load.image('enemy-creature', 'assets/enemies/creature.png')
    this.load.image('enemy-cutie_cthulu', 'assets/enemies/cutie_cthulu.png')
    this.load.image('enemy-nutbuster_mk.ii', 'assets/enemies/nutbuster_mk_ii.png')
    this.load.image('enemy-nutbuster_mk.ii-no_arm', 'assets/enemies/nutbuster_mk_ii-no_arm.png')
    this.load.image('enemy-fishmoley', 'assets/enemies/fishmoley.png')
    this.load.image('enemy-flappy_fang', 'assets/enemies/flappy_fang.png')
    this.load.image('enemy-banana_bandit', 'assets/enemies/banana_bandit.png')
    this.load.image('enemy-gorilla', 'assets/enemies/gorilla.png')
    this.load.image('enemy-grumpuff', 'assets/enemies/grumpuff.png')
    this.load.image('enemy-razor', 'assets/enemies/razor.png')
    this.load.image('enemy-grizzle_guts', 'assets/enemies/grizzle_guts-6.png')

    // Other assets
    this.load.image('dirt', 'assets/dirt.png')
    this.load.image('water', 'assets/water.png')
    this.load.image('platform-grass', 'assets/platform-grass.png')
    this.load.image('platform-wood', 'assets/platform-wood.png')
    this.load.image('platform-stone', 'assets/platform-stone.png')
    this.load.image('wall-stone', 'assets/wall-stone.png')
    this.load.image('spikes-bottom', 'assets/spikes-bottom.png')
    this.load.image('spikes-top', 'assets/spikes-top.png')
    this.load.image('spikes-left', 'assets/spikes-left.png')
    this.load.image('spikes-right', 'assets/spikes-right.png')
    this.load.image('crate-basic', 'assets/crate-basic.png')
    this.load.image('crate-basic-break', 'assets/crate-basic-break.png')
    this.load.image('crate-wumpa_fruits', 'assets/crate-wumpa_fruits.png')
    this.load.image('crate-tnt', 'assets/crate-tnt.png')
    this.load.image('crate-tnt-3', 'assets/crate-tnt-3.png')
    this.load.image('crate-tnt-2', 'assets/crate-tnt-2.png')
    this.load.image('crate-tnt-1', 'assets/crate-tnt-1.png')
    this.load.image('crate-tnt-explode', 'assets/crate-tnt-explode.png')
    this.load.image('wumpa_fruit', 'assets/wumpa_fruit.png')
    this.load.image('extra_life', 'assets/extra_life.png')
    this.load.image('projectile-nut', 'assets/projectile-nut.png')
    this.load.image('projectile-egg', 'assets/projectile-egg.png')
    this.load.image('projectile-banana', 'assets/projectile-banana.png')
    this.load.image('banana_pile', 'assets/banana_pile.png')
    this.load.image('nutbuster_mk.ii-extended_arm', 'assets/nutbuster_mk_ii-extended_arm.png')

    // SFX
    this.load.audio('sfx-menu_select', 'assets/audio/sfx-menu_select.mp3')
    this.load.audio('sfx-woah', 'assets/audio/sfx-woah.mp3')
    this.load.audio('sfx-wumpa_fruit_collect', 'assets/audio/sfx-wumpa_fruit_collect.mp3')
    this.load.audio('sfx-crate_break', 'assets/audio/sfx-crate_break.mp3')
    this.load.audio('sfx-tnt', 'assets/audio/sfx-tnt.mp3')

    // Music
    this.load.audio('music-8bitRick', 'assets/audio/music-8bitRick.mp3')
    this.load.audio('music-8bitStar', 'assets/audio/music-8bitStar.mp3')
    this.load.audio('music-8bitLoving', 'assets/audio/music-8bitLoving.mp3')
    this.load.audio('music-8bitDota', 'assets/audio/music-8bitDota.mp3')
    this.load.audio('music-u_got_that', 'assets/audio/music-u_got_that.mp3')

    // Cutscenes
    this.load.video('cutscene-boss', 'assets/videos/cutscene-grizzle_guts.mp4')
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('MainMenu')
  }
}
