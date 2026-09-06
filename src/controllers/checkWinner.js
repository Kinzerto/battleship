import { player1, player2 } from './players.js';

const status = document.querySelector('.status');

export function checkWinner() {
  if (player2.gameboard.isGameOver) {
    status.textContent = `${player1.name} Wins`;
    return true;
  }

  if (player1.gameboard.isGameOver) {
    status.textContent = `${player2.name} Wins`;
    return true;
  }

  return false;
}
