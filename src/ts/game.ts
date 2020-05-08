/**
 * Game entry point
 */

import '../css/style.css'; // loading css

import 'phaser'; // loading Phaser with dependencies

import * as logger from 'js-logger';

import * as gameConfig from './config/game.config';

import PhaserStatsGame from './classes/PhaserStatsGame';

import Boot from './scenes/boot';
import Preloader from './scenes/preloader';
import Game from './scenes/game';

/**
 * Setup logger
 */
logger.useDefaults();
logger.setLevel(gameConfig.logLevel);

/**
 * Phaser game config
 * @type {Phaser.Types.Core.GameConfig}
 */
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'container',     // parent id - '' means  no container
  width: gameConfig.size.x,
  height: gameConfig.size.y
};

/**
 * Phaser game instance
 * Choosing implementation based on 'stats' app config setting
 * @type {Phaser.Game}
 */
let game: Phaser.Game;

if (gameConfig.stats && process.env.NODE_ENV !== 'production') {
  game = new PhaserStatsGame(config);
} else {
  game = new Phaser.Game(config);
}

/**
 * Registering game scenes
 */
const initialScenes = {
  boot: Boot,
  preloader: Preloader,
  game: Game
};

Object.entries(initialScenes).forEach((entry: any[]) => {
  game.scene.add(entry[0], entry[1]);
});

game.scene.start('boot');
