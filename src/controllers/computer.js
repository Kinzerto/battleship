import { checkWinner } from './checkWinner.js';
import { changeTurn } from './turn.js';
import { shipContainer1 } from './players.js';
import { gameState } from '../state/state.js';

let MOVES = [
  [1, 0], //down
  [-1, 0], //up
  [0, 1], //right
  [0, -1], //left
];
let count = 0;

let firstAtk = [];

export function computer(boardContainer, player) {
  if (checkWinner()) return;
  if (gameState.inGame === false) return;

  let result, row, column;

  do {
    if (firstAtk.length > 0) {
      console.log(firstAtk);

      const latest = firstAtk[0];
      const move = MOVES[count];
      const adj = [latest.rowRes + move[0], latest.columnRes + move[1]];
      row = adj[0];
      column = adj[1];

      result = player.gameboard.receiveAttack(row, column);

      if (row < 0 || row > 9 || column < 0 || column > 9) {
        count++;
        console.log('runned lampas');
        continue;
      } else if (result && result.hit === 'hit') {
        for (let i = 0; i < move.length; i++) {
          if (move[i] === 0) {
            move[i] + 0;
          } else if (move[i] < 0) {
            move[i] -= 1;
          } else {
            move[i] += 1;
          }
        }
        continue;
      } else if (result === 'miss') {
        count++;
      } else if (result === null) {
        count++;
      }
    } else {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
      result = player.gameboard.receiveAttack(row, column);
    }
  } while (result === null);

  //board squires with or without a boat
  const box = boardContainer.querySelector(
    `[data-row="${row}"][data-column="${column}"]`,
  );

  if (result.hit === 'hit') {
    shipGotHit(box, result.shot);

    if (!firstAtk.some((item) => item.ship.name === result.shot.name)) {
      firstAtk.push({
        ship: result.shot,
        rowRes: row,
        columnRes: column,
      });
    }

    if (result.shot.isSunk()) {
      MOVES = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      count = 0;
      firstAtk.shift();
    }
  } else if (result === 'miss') {
    shotMissed(box);
  } else {
    return;
  }

  if (checkWinner()) return;

  changeTurn();
}

//if the shot hit
function shipGotHit(damagedShip, ship) {
  const hitmark = damagedShip.querySelector('.hitmark');
  hitmark.classList.add('hit');

  if (ship.isSunk()) {
    const sunkShip = shipContainer1.querySelector(`.${ship.name}`);
    sunkShip.classList.add('sunked');
  }
}

//if the shot hit
function shotMissed(ocean) {
  const attackResult = document.createElement('div');
  attackResult.classList.add('missed');
  ocean.appendChild(attackResult);
}

function resetHunt() {
  count = 0;
  firstAtk = [];
  direction = null;
}
