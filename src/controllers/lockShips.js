import { gameState } from '../state/state.js';
import { addBoardListeners, removeBoardListeners } from './manualPlaceShip.js';
import {
  activePlayer,
  P1Element,
  P2Element,
  player1,
  player2,
  shipContainer1,
  shipContainer2,
  status,
} from './players.js';

export function LockShips() {
  if (activePlayer.player.gameboard.army.length < 5) {
    status.textContent = 'Place And Deploy all Ships';
    return;
  }
  if (gameState.isComputerMode) return;
  if (gameState.inGame) return;

  removeBoardListeners();

  //to lock ship
  activePlayer.player.lockShips();
  if (!player2.lock) {
    status.textContent = `Drag a ship onto the board. Right-click a ship to rotate.`;
  }

  if (player2.lock && player1.lock) {
    status.textContent = `Press "Play" to Start `;
  }

  activePlayer.boardContainer.classList.add('hidden');

  if (activePlayer.player.name === player2.name) return;

  activePlayer.boardContainer.classList.remove('active');
  activePlayer.berthContainer.classList.remove('active');

  if (activePlayer.boardContainer === P1Element) {
    activePlayer.boardContainer = P2Element;
    activePlayer.player = player2;
    activePlayer.berthContainer = shipContainer2;
  } else {
    activePlayer.boardContainer = P1Element;
    activePlayer.player = player1;
    activePlayer.berthContainer = shipContainer1;
  }

  activePlayer.boardContainer.classList.add('active');
  activePlayer.berthContainer.classList.add('active');

  addBoardListeners();
}
