// import { showEnemyShipsName } from '../render/enemyShipsStatus.js';
import { renderBoard } from '../render/render-board.js';
import { addBoardListeners, manual } from './manualPlaceShip.js';

import { gameState } from '../state/state.js';
import { status } from './players.js';
import {
  P1Element,
  P2Element,
  player1,
  player2,
  shipContainer1,
  shipContainer2,
  activePlayer,
} from './players.js';

export function reset() {
  gameState.inGame = false;
  gameState.turn = 'P1';
  status.textContent = 'Place all ships';

  player1.resetGameboard();
  player2.resetGameboard();

  player1.resetShipDamage();
  player2.resetShipDamage();

  renderBoard(player1, P1Element);
  renderBoard(player2, P2Element);

  manual(player1, shipContainer1);
  manual(player2, shipContainer2);

  //reset active
  P1Element.classList.add('active');
  P2Element.classList.remove('active');

  P1Element.classList.remove('hidden');
  P2Element.classList.remove('hidden');

  shipContainer1.classList.add('active');
  shipContainer2.classList.remove('active');

  activePlayer.boardContainer = P1Element;
  activePlayer.player = player1;
  activePlayer.berthContainer = shipContainer1;

  addBoardListeners();
}
