import Phaser, { DOM } from 'phaser'
import { Boot } from './scenes/Boot'
import { Preloader } from './scenes/Preloader'
import { MainMenu } from './scenes/MainMenu'
import { Game } from './scenes/Game'
import { GameOver } from './scenes/GameOver'

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: 'game-container',
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: true,
    },
  },
  scene: [Boot, Preloader, MainMenu, Game, GameOver],
}

export default function StartGame(parent) {
  const game = new Phaser.Game({ ...config, parent })
  window.game = game
  return game
}
