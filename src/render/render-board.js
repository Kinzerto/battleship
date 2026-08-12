import { Player } from '../models/Player.js';
import { Ship } from '../models/Ship.js';

const board_wrapper = document.querySelector('.container .board-wrapper');

const P1 = board_wrapper.querySelector('.player1');
const P2 = board_wrapper.querySelector('.player2');
const carrier = new Ship(5);

const player1 = new Player();

player1.gameboard.placeShip(carrier, 0, 0, 'H');

const player2 = new Player();

let turn = 'P1';

function changeTurn() {
  turn = turn === 'P1' ? 'P2' : 'P1';
  if (turn === 'P1') {
    P1.classList.remove('disabled');
    P2.classList.add('disabled');
  } else if (turn === 'P2') {
    P2.classList.remove('disabled');
    P1.classList.add('disabled');
  }
}

const zeroOrOneRound = Math.round(Math.random());
if (zeroOrOneRound) {
  turn = 'P2';
  P1.classList.add('disabled');
} else {
  turn = 'P1';
  P2.classList.add('disabled');
}

function renderBoard(player, parent) {
  for (let i = 0; i < player.gameboard.matrix.length; i++) {
    for (let j = 0; j < player.gameboard.matrix[i].length; j++) {
      const cell = document.createElement('div');

      // Put data attr in every cell
      cell.dataset.row = i;
      cell.dataset.column = j;

      cell.addEventListener('click', () => {
        if (player1.gameboard.isGameOver || player2.gameboard.isGameOver) {
          alert('GAME');
          return;
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
        changeTurn();
      });

      parent.appendChild(cell);
    }
  }
}
renderBoard(player1, P1);
renderBoard(player2, P2);
