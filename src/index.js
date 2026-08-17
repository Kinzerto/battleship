import './css/reset.scss';
import './css/style.scss';

import { enablePlayerAttacks } from './controllers/playerTurn.js';
import { computer } from './controllers/computer.js';
import {
  P1Element,
  P2Element,
  player1,
  player2,
} from './controllers/players.js';
import { placeShapeRandomly } from './controllers/placeShapeRandomly.js';

import { renderBoard } from './render/render-board.js';
import { manual } from './controllers/manualPlaceShip.js';
import { reset } from './controllers/restart.js';
import { gameState } from './controllers/state.js';

function playGame() {
  renderBoard(player2, P2Element);
  placeShapeRandomly(player2);

  enablePlayerAttacks(P2Element);

  if (gameState.turn === 'P2') {
    computer(P1Element);
  }
}

export const restart = document.querySelector('.board-wrapper .restart');
const random = document.querySelector('.random');
const play = document.querySelector('.play');

manual();

//restart button
restart.addEventListener('click', () => {
  reset();
});

//random button
random.addEventListener('click', () => {
  if (gameState.inGame) return;

  placeShapeRandomly(player1);
  const shipContainer = document.querySelector('.shipContainer');

  shipContainer.textContent = '';
});

//play button
play.addEventListener('click', () => {
  if (gameState.inGame) return;
  if (player1.gameboard.army.length < 5) return;
  playGame();
  gameState.inGame = true;
});
