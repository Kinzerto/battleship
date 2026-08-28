import { showEnemyShipsName } from '../render/enemyShipsStatus.js';
import { renderBoard } from '../render/render-board.js';
import { manual } from './manualPlaceShip.js';
import { P1Element, P2Element, player1, player2 } from './players.js';
import { gameState } from './state.js';
import { status } from './turn.js';

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

  manual(player1);

  status.textContent = 'Place all ships';

  //reset active
  P1Element.classList.remove('active');
  P2Element.classList.remove('active');

  showEnemyShipsName(player2);
}
