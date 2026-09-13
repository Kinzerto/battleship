import { renderBoard } from '../render/render-board.js';
import { gameState } from '../state/state.js';
import { addBoardListeners, LockShips, manual } from './manualPlaceShip.js';
import { placeShapeRandomly } from './placeShapeRandomly.js';
import {
  activePlayer,
  initialize,
  P1Element,
  P2Element,
  player1,
  player2,
  shipContainer1,
  shipContainer2,
} from './players.js';
import { playGame } from './playGame.js';
import { reset } from './restart.js';

export function startGame(params) {
  // initialize();

  renderBoard(player1, P1Element);
  renderBoard(player2, P2Element);

  manual(player1, shipContainer1);
  manual(player2, shipContainer2);

  addBoardListeners();

  P1Element.classList.add('active');
  shipContainer1.classList.add('active');
}
