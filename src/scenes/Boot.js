import { Scene } from 'phaser'

export class Boot extends Scene {
  constructor() {
    super('Boot')
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    // this.load.image('background-menu', 'assets/bg-menu-v4.png')
    // this.load.image('background-game_over', 'assets/bg-game_over.png')
  }

  create() {
    this.scene.start('Preloader')
  }
}
