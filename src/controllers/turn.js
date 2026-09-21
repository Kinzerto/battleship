import { gameState } from '../state/state.js';
import {} from './players.js';
import { whosTurn } from '../render/renderTurnStatus.js';
import { status } from './players.js';
import { activeBoard } from './activeBoard.js';

export function changeTurn() {
  gameState.turn = gameState.turn === 'P1' ? 'P2' : 'P1';
  whosTurn(status);

  if (!gameState.inGame) return;

  activeBoard();
}
