import { gameState } from './state.js';
import { P1Element, P2Element, player1, player2 } from './players.js';
export const status = document.querySelector('.status');

status.textContent = `Player ${gameState.turn}'s Turn`;

export function changeTurn() {
  gameState.turn = gameState.turn === 'P1' ? 'P2' : 'P1';
  whosTurn();

  if (!gameState.inGame) return;
  activeBoard();
}

export function activeBoard() {
  if (gameState.turn === 'P1') {
    P2Element.classList.add('active');
    P1Element.classList.remove('active');
  } else if (gameState.turn === 'P2') {
    P1Element.classList.add('active');
    P2Element.classList.remove('active');
  }
}

export function whosTurn() {
  const GameName = gameState.turn === 'P1' ? player1.name : player2.name;
  status.textContent = `${GameName}'s Turn`;
}
