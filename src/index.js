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
import {
  activePlayer,
  addBoardListeners,
  LockShips,
} from './controllers/manualPlaceShip.js';
import { reset } from './controllers/restart.js';
import { gameState } from './state/state.js';
import { activeBoard, whosTurn } from './controllers/turn.js';
// import { showEnemyShipsName } from './render/enemyShipsStatus.js';
import { playGame } from './controllers/playGame.js';
import { status } from './controllers/players.js';

renderBoard(player1, P1Element);
renderBoard(player2, P2Element);
// showEnemyShipsName(player2);

status.textContent = 'Place all ships';

export const restart = document.querySelector(' .restart');
const random = document.querySelector('.random');
const play = document.querySelector('.play');
export const lock = document.querySelector('.lock');

//restart button
restart.addEventListener('click', () => {
  reset();
});

//random button
random.addEventListener('click', () => {
  console.log('ccw');
  console.log('Kinth');
  if (gameState.inGame) return;

  console.log(activePlayer);

  placeShapeRandomly(
    activePlayer.player,
    activePlayer.berthContainer,
    activePlayer.boardContainer,
  );

  const ships = activePlayer.berthContainer.querySelectorAll('.ship');

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
  console.log(gameState.turn);
});

lock.addEventListener('click', () => {
  LockShips();
});
