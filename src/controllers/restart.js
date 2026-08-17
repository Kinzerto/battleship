import { renderBoard } from '../render/render-board.js';
import { manual } from './manualPlaceShip.js';
import { P1Element, P2Element, player1, player2 } from './players.js';
import { gameState } from './state.js';

export function reset() {
  player1.resetGameboard();
  player2.resetGameboard();

  player1.resetShipDamage();
  player2.resetShipDamage();

  P1Element.replaceChildren();
  P2Element.replaceChildren();

  gameState.inGame = false;

  renderBoard(player1, P1Element);

  manual();
}
