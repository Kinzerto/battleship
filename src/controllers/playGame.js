import { computer } from './computer.js';
import { placeShapeRandomly } from './placeShapeRandomly.js';
import { P1Element, P2Element, player2 } from './players.js';
import { enablePlayerAttacks } from './playerTurn.js';
import { gameState } from './state.js';

export function playGame() {
  placeShapeRandomly(player2);

  enablePlayerAttacks(P2Element);

  if (gameState.turn === 'P2') {
    computer(P1Element);
  }
}
