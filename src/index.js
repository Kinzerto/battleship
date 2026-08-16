import './css/reset.scss';
import './css/style.scss';

import { enablePlayerAttacks } from './controllers/playerTurn.js';
import { computer } from './controllers/computer.js';
import { P1, P2, player1, player2 } from './controllers/players.js';
import { turn } from './controllers/turn.js';
import { placeShapeRandomly } from './controllers/placeShapeRandomly.js';

import { renderBoard } from './render/render-board.js';
import { Gameboard } from './models/Gameboard.js';
import { manual } from './controllers/manualPlaceShip.js';

manual();
export const gameState = {
  inGame: false,
};
function playGame() {
  renderBoard(player2, P2);
  placeShapeRandomly(player2);

  enablePlayerAttacks(P2);

  if (turn === 'P2') {
    computer(P1);
  }
}

const random = document.querySelector('.random');
const play = document.querySelector('.play');

random.addEventListener('click', () => {
  if (gameState.inGame) return;
  placeShapeRandomly(player1);
});

play.addEventListener('click', () => {
  if (gameState.inGame) return;
  if (player1.gameboard.army.length < 5) return;
  playGame();
  gameState.inGame = true;
});

const restart = document.querySelector('.restart');

restart.addEventListener('click', () => {
  player1.gameboard = new Gameboard();
  player2.gameboard = new Gameboard();

  P1.textContent = '';
  P2.textContent = '';

  renderBoard(player1, P1);
  gameState.inGame = false;
});
