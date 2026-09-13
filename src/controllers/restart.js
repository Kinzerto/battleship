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
import { renderStartPage } from '../render/renderStartPage.js';

export function reset() {
  gameState.inGame = false;
  status.textContent = 'Place all ships';

  player1.resetGameboard();
  player2.resetGameboard();

  player1.resetShipDamage();
  player2.resetShipDamage();

  P1Element.replaceChildren();
  P2Element.replaceChildren();

  renderBoard(player1, P1Element);
  renderBoard(player2, P2Element);

  manual(player1, shipContainer1);
  manual(player1, shipContainer2);

  //reset active
  P1Element.classList.remove('active');
  P2Element.classList.remove('active');

  //add player 1 active to place its Ships
  P1Element.classList.add('active');

  shipContainer1.classList.add('active');

  activePlayer.boardContainer = P1Element;
  activePlayer.player = player1;
  activePlayer.berthContainer = shipContainer1;

  addBoardListeners();
}
