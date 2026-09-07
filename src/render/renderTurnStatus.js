import { player1, player2 } from '../controllers/players.js';
import { gameState } from '../state/state.js';

export function whosTurn(status) {
  const GameName = gameState.turn === 'P1' ? player1.name : player2.name;
  status.textContent = `${GameName}'s Turn`;
}
