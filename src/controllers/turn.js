import { gameState } from './state.js';

const status = document.querySelector('.status');

status.textContent = `Player ${gameState.turn}'s Turn`;

export function changeTurn() {
  gameState.turn = gameState.turn === 'P1' ? 'P2' : 'P1';
  status.textContent = `Player ${gameState.turn}'s Turn`;
}
