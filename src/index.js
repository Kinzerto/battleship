import './css/reset.scss';
import './css/homepage.scss';
import './css/mode.scss';
import './assets/fonts/rayone/stylesheet.css';
import './css/style.scss';

import { renderGame } from './render/renderGame.js';
import { renderStartPage } from './render/renderStartPage.js';
import { renderPlayerMode } from './render/renderTwoPlayerMode.js';
import { renderComputerMode } from './render/renderComputerMode.js';
import { initialize } from './controllers/players.js';

// renderPlayerMode();
renderStartPage();
// renderComputerMode();
// const vsComputer = document.querySelector('.vsComputer');
// const vsPlayer = document.querySelector('.vsPlayer');

// vsComputer.addEventListener('click', () => {
//   gameState.isComputerMode = true;
//   renderGame(bodyEl);
// });

// vsPlayer.addEventListener('click', () => {
//   gameState.isComputerMode = false;
//   renderGame(bodyEl);
// });
