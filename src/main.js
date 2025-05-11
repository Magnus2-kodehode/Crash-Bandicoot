import { Boot } from './scenes/Boot'
import { Game } from './scenes/Game'
import { GameOver } from './scenes/GameOver'
import { MainMenu } from './scenes/MainMenu'
import Phaser, { DOM } from 'phaser'
import { Preloader } from './scenes/Preloader'
import { SettingsMenu } from './scenes/SettingsMenu'

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
  scene: [Boot, Preloader, MainMenu, SettingsMenu, Game, GameOver],
}

export default function StartGame(parent) {
  const game = new Phaser.Game({ ...config, parent })
  window.game = game
  return game
}
