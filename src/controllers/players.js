import { renderBoard } from '../render/render-board.js';

import { Player } from '../models/Player.js';
import { Ship } from '../models/Ship.js';

export const P1 = document.querySelector('.player1');
export const P2 = document.querySelector('.player2');

export const player1 = new Player();
export const player2 = new Player();

const battleship = new Ship(4);
const carrier = new Ship(5);

player1.gameboard.placeShip(carrier, 0, 0, 'H');
player2.gameboard.placeShip(battleship, 5, 5, 'V');

renderBoard(player2, P2);
renderBoard(player1, P1);
