import { gameState, restart } from '../index.js';
import { renderBoard } from '../render/render-board.js';
import { manual } from './manualPlaceShip.js';
import { P1, P2, player1, player2 } from './players.js';

export function reset() {
  player1.resetGameboard();
  player2.resetGameboard();

  player1.resetShipDamage();
  player2.resetShipDamage();

  P1.replaceChildren();
  P2.replaceChildren();

  gameState.inGame = false;

  renderBoard(player1, P1);

  manual();
}
