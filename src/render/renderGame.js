import { LockShips } from '../controllers/lockShips.js';
import { addBoardListeners, manual } from '../controllers/manualPlaceShip.js';
import { placeShapeRandomly } from '../controllers/placeShapeRandomly.js';
import { activePlayer, initialize, player1 } from '../controllers/players.js';
import { playGame } from '../controllers/playGame.js';
import { reset } from '../controllers/restart.js';
import { gameState } from '../state/state.js';
import { renderStartPage } from './renderStartPage.js';

const bodyEl = document.querySelector('body');

export function renderGame() {
  bodyEl.replaceChildren();

  const container = document.createElement('div');
  container.classList.add('container');

  const boardWrapper = document.createElement('div');
  boardWrapper.classList.add('board-wrapper');

  const status = document.createElement('div');
  status.textContent = 'Place Ships';
  status.classList.add('status');

  const board1 = document.createElement('div');
  board1.classList.add('player1');

  const board2 = document.createElement('div');
  board2.classList.add('player2');

  const shipContainer = document.createElement('div');
  shipContainer.classList.add('shipContainer');

  const shipConfirmBtn = document.createElement('div');
  shipConfirmBtn.classList.add('confirmBtn');

  const shipLock = document.createElement('span');
  shipLock.classList.add('lock');
  shipLock.textContent = 'Lock';

  const shipReset = document.createElement('span');
  shipReset.classList.add('reset');
  shipReset.textContent = 'Reset';

  shipConfirmBtn.append(shipLock, shipReset);
  shipContainer.appendChild(shipConfirmBtn);

  const yard = document.createElement('div');
  yard.classList.add('yard');

  const yardConfirmBtn = document.createElement('div');
  yardConfirmBtn.classList.add('confirmBtn');

  const yardLock = document.createElement('span');
  yardLock.classList.add('lock');
  yardLock.textContent = 'Lock';

  const yardReset = document.createElement('span');
  yardReset.classList.add('reset');
  yardReset.textContent = 'Reset';

  yardConfirmBtn.append(yardLock, yardReset);
  yard.appendChild(yardConfirmBtn);

  boardWrapper.append(status, board1, board2, shipContainer, yard);

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');

  const play = document.createElement('button');
  play.classList.add('play');
  play.textContent = 'Play';

  const restart = document.createElement('button');
  restart.classList.add('restart');
  restart.textContent = 'Restart';

  const newGame = document.createElement('button');
  newGame.classList.add('newGame');
  newGame.textContent = 'New Game';

  buttons.append(newGame, play, restart);

  container.append(boardWrapper, buttons);

  bodyEl.appendChild(container);

  buttonEvents(restart, play, newGame);
}

function buttonEvents(restart, play, newGame) {
  restart.addEventListener('click', () => {
    reset();
  });

  //play button
  play.addEventListener('click', () => {
    if (gameState.inGame) return;

    playGame();
  });

  newGame.addEventListener('click', () => {
    reset();
    renderStartPage();
    console.log(gameState.isComputerMode);
  });
}
