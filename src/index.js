import './css/reset.scss';
import './css/style.scss';

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
import { activeBoard, status, whosTurn } from './controllers/turn.js';
import { showEnemyShipsName } from './render/enemyShipsStatus.js';
import { playGame } from './controllers/playGame.js';

manual(player1);
renderBoard(player1, P1Element);
renderBoard(player2, P2Element);
showEnemyShipsName(player2);
status.textContent = 'Place all ships';

export const restart = document.querySelector(' .restart');
const random = document.querySelector('.random');
const play = document.querySelector('.play');

//restart button
restart.addEventListener('click', () => {
  reset();
});

//random button
random.addEventListener('click', () => {
  if (gameState.inGame) return;

  placeShapeRandomly(player1);

  const shipContainer = document.querySelector('.shipContainer');

  const ships = shipContainer.querySelectorAll('.ship');

  ships.forEach((ship) => {
    ship.classList.add('placed');
  });
});

//play button
play.addEventListener('click', () => {
  if (gameState.inGame) return;
  if (player1.gameboard.army.length < 5) {
    status.textContent = 'Place all ships';
    return;
  }

  playGame();
  activeBoard();
  whosTurn();

  gameState.inGame = true;
});
