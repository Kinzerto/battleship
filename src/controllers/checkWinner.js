import { player1, player2 } from './players.js';

export function checkWinner() {
  if (player2.gameboard.isGameOver) {
    console.log('P1 Wins');
    return true;
  }

  if (player1.gameboard.isGameOver) {
    console.log('P2 Wins');
    return true;
  }

  return false;
}
