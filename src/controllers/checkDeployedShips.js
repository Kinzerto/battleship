import { player1, player2 } from './players.js';

export function checkPLayer1() {
  if (player1.gameboard.army.length >= 5) {
    return true;
  }

  return false;
}

export function checkPLayer2() {
  if (player2.gameboard.army.length >= 5) {
    return true;
  }

  return false;
}

export function checkIfAllDeployed(player) {
  if (player.gameboard.army.length >= 5) {
    return true;
  }

  return false;
}
