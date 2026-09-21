import { gameState } from '../state/state.js';
import {
  P1Element,
  P2Element,
  shipContainer1,
  shipContainer2,
} from './players.js';

export function activeBoard() {
  const isP1Turn = gameState.turn === 'P1';

  const targetBoard = isP1Turn ? P2Element : P1Element;
  const otherBoard = isP1Turn ? P1Element : P2Element;

  const targetShips = isP1Turn ? shipContainer2 : shipContainer1;
  const otherShips = isP1Turn ? shipContainer1 : shipContainer2;

  targetBoard.classList.add('active');
  otherBoard.classList.remove('active');

  targetShips.classList.add('active');
  otherShips.classList.remove('active');
}
