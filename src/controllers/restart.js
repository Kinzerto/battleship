// import { showEnemyShipsName } from '../render/enemyShipsStatus.js';
import { renderBoard } from '../render/render-board.js';
import { activePlayer, addBoardListeners, manual } from './manualPlaceShip.js';
import {
  P1Element,
  P2Element,
  player1,
  player2,
  shipContainer1,
  shipContainer2,
} from './players.js';
import { gameState } from '../state/state.js';
import { status } from './players.js';

export function reset() {
  player1.resetGameboard();
  player2.resetGameboard();

  player1.resetShipDamage();
  player2.resetShipDamage();

  P1Element.replaceChildren();
  P2Element.replaceChildren();

  gameState.inGame = false;

  renderBoard(player1, P1Element);
  renderBoard(player2, P2Element);

  status.textContent = 'Place all ships';

  //reset active
  P1Element.classList.remove('active');
  P2Element.classList.remove('active');

  // showEnemyShipsName(player2);
  manual(player1, shipContainer1);
  manual(player1, shipContainer2);

  console.log(activePlayer);

  activePlayer.boardContainer = P1Element;
  activePlayer.player = player1;
  activePlayer.berthContainer = shipContainer1;

  addBoardListeners();

  P1Element.classList.add('active');
  shipContainer1.classList.add('active');
}
