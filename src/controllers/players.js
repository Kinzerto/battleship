import { Player } from '../models/Player.js';

export const P1Element = document.querySelector('.player1');
export const P2Element = document.querySelector('.player2');

export const player1 = new Player('Kinth');
export const player2 = new Player('Computer');

export const shipContainer1 = document.querySelector('.shipContainer');
export const shipContainer2 = document.querySelector('.yard');

export const status = document.querySelector('.status');
