import { showEnemyShipsName } from '../render/enemyShipsStatus.js';
import { computer } from './computer.js';
import { activePlayer } from './manualPlaceShip.js';
import { placeShapeRandomly } from './placeShapeRandomly.js';
import {
  P1Element,
  P2Element,
  player1,
  player2,
  shipContainer1,
  shipContainer2,
} from './players.js';
import { enablePlayerAttacks } from './playerTurn.js';
import { gameState } from '../state/state.js';
import { activeBoard } from './turn.js';
import { whosTurn } from '../render/renderTurnStatus.js';
import { status } from './players.js';

export function playGame() {
  if (gameState.isComputerMode) {
    placeShapeRandomly(player2, shipContainer2, P2Element);

    if (gameState.turn !== 'P1') {
      computer(P1Element);
    }

    enablePlayerAttacks(player2, P2Element, shipContainer2);

    if (gameState.turn === 'P2') {
      computer(P1Element);
    }

    console.log(player1.gameboard.matrix);
    console.log(player2.gameboard.matrix);

    gameState.inGame = true;

    activeBoard();
    whosTurn(status);
    showEnemyShipsName(player2, shipContainer2);

    return;
  }

  if (!player1.gameboard.army.length < 5 && player2.gameboard.army.length < 5) {
    status.textContent = `${activePlayer.player.name} Place Your Ships`;
    console.log('runned');
    return;
  }

  enablePlayerAttacks(player2, P2Element, shipContainer2);
  enablePlayerAttacks(player1, P1Element, shipContainer1);

  activeBoard();
  whosTurn(status);
  showEnemyShipsName(player1, shipContainer1);
  showEnemyShipsName(player2, shipContainer2);

  gameState.inGame = true;
}
