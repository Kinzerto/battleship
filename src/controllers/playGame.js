import { showEnemyShipsName } from '../render/enemyShipsStatus.js';
import { computer } from './computer.js';
import { placeShapeRandomly } from './placeShapeRandomly.js';
import { enablePlayerAttacks } from './playerTurn.js';
import { gameState } from '../state/state.js';
import {
  P1Element,
  P2Element,
  player1,
  player2,
  shipContainer1,
  shipContainer2,
  status,
} from './players.js';
import { whosTurn } from '../render/renderTurnStatus.js';
import { activeBoard } from './activeBoard.js';
import { checkPLayer1 } from './checkDeployedShips.js';

export function playGame() {
  //if Computer Mode
  if (gameState.isComputerMode) {
    if (!checkPLayer1()) {
      status.textContent = 'Deploy all ships';
      return;
    }

    gameState.inGame = true;

    placeShapeRandomly(player2, shipContainer2, P2Element);

    if (gameState.turn !== 'P1') {
      computer(P1Element);
    }

    enablePlayerAttacks(player2, P2Element, shipContainer2);

    if (gameState.turn === 'P2') {
      computer(P1Element);
    }

    activeBoard();
    whosTurn(status);
    showEnemyShipsName(player1, shipContainer1);
    showEnemyShipsName(player2, shipContainer2);

    return;
  }

  //if 2 Player Mode
  if (!player1.lock || !player2.lock) {
    return;
  }

  gameState.inGame = true;

  enablePlayerAttacks(player2, P2Element, shipContainer2);
  enablePlayerAttacks(player1, P1Element, shipContainer1);

  activeBoard();
  whosTurn(status);

  showEnemyShipsName(player1, shipContainer1);
  showEnemyShipsName(player2, shipContainer2);

  shipContainer2.classList.remove('isCom');
}
