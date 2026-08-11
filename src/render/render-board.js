import { Player } from '../models/Player.js';

const board_wrapper = document.querySelector('.container .board-wrapper');

const myBoard = board_wrapper.querySelector('.player1');
const opponent = board_wrapper.querySelector('.player2');

const player1 = new Player();
const computer = new Player();

function renderBoard(player, parent) {
  for (let i = 0; i < player.gameboard.matrix.length; i++) {
    for (let j = 0; j < player.gameboard.matrix[i].length; j++) {
      const cell = document.createElement('div');
      cell.dataset.row = i;
      cell.dataset.column = j;

      cell.addEventListener('click', () => {
        const column = cell.dataset.column;
        const row = cell.dataset.row;

        player.gameboard.receiveAttack(row, column);
        console.log(player.gameboard.matrix);
      });
      parent.appendChild(cell);
    }
  }
}

renderBoard(player1, myBoard);
renderBoard(computer, opponent);
