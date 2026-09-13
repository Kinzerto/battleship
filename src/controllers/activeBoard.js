import { gameState } from '../state/state.js';
import {
  P1Element,
  P2Element,
  shipContainer1,
  shipContainer2,
} from './players.js';

export function activeBoard() {
  if (gameState.turn === 'P1') {
    P2Element.classList.add('active');
    P1Element.classList.remove('active');

    shipContainer2.classList.add('active');
    shipContainer1.classList.remove('active');
  } else if (gameState.turn === 'P2') {
    P1Element.classList.add('active');
    P2Element.classList.remove('active');

    shipContainer1.classList.add('active');
    shipContainer2.classList.remove('active');
  }
}
