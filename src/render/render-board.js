import { Player } from '../models/Player.js';
import { Ship } from '../models/Ship.js';

const board_wrapper = document.querySelector('.container .board-wrapper');

const myBoard = board_wrapper.querySelector('.player1');
const opponent = board_wrapper.querySelector('.player2');

const carrier = new Ship(5);

const player1 = new Player();

player1.gameboard.placeShip(carrier, 0, 0, 'H');

const player2 = new Player();

function renderBoard(player, parent) {
  for (let i = 0; i < player.gameboard.matrix.length; i++) {
    for (let j = 0; j < player.gameboard.matrix[i].length; j++) {
      const cell = document.createElement('div');

      // Put data attr in every cell
      cell.dataset.row = i;
      cell.dataset.column = j;

      cell.addEventListener('click', () => {
        if (player1.gameboard.isGameOver || player2.gameboard.isGameOver) {
          return true;
        }

        if (cell.children.length > 0) return;

        const damaged = document.createElement('div');
        const missed = document.createElement('div');

        //grabing the data attr value
        const row = cell.dataset.row;
        const column = cell.dataset.column;
        const box = player.gameboard.matrix[row][column];

        if (box) {
          player.gameboard.receiveAttack(row, column);
          damaged.classList.add('damaged');

          cell.appendChild(damaged);
        } else {
          player.gameboard.receiveAttack(row, column);
          missed.classList.add('missed');

          cell.appendChild(missed);
        }
      });

      parent.appendChild(cell);
    }
  }
}
renderBoard(player1, myBoard);
renderBoard(player2, opponent);
