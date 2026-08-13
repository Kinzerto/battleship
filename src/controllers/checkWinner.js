import { player1, player2 } from './players.js';

const status = document.querySelector('.status');

export function checkWinner() {
  if (player2.gameboard.isGameOver) {
    status.textContent = 'Player 1 Wins';
    return true;
  }

  if (player1.gameboard.isGameOver) {
    status.textContent = 'Player 2 Wins';
    return true;
  }

  return false;
}
