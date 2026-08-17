import { renderBoard } from '../render/render-board.js';

import { Player } from '../models/Player.js';

export const P1Element = document.querySelector('.player1');
export const P2Element = document.querySelector('.player2');

export const player1 = new Player();
export const player2 = new Player('Computer');

renderBoard(player1, P1Element);
