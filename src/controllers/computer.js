import { checkWinner } from './checkWinner.js';
import { changeTurn } from './turn.js';
import { player1 } from './players.js';

export function computer(P1) {
  if (checkWinner()) return;

  let result;
  let row;
  let column;

  do {
    row = Math.floor(Math.random() * 10);
    column = Math.floor(Math.random() * 10);

    result = player1.gameboard.receiveAttack(row, column);
  } while (result === null);

  const attackResult = document.createElement('div');

  const box = P1.querySelector(`[data-row="${row}"][data-column="${column}"]`);

  if (result === 'hit') {
    attackResult.classList.add('damaged');
  } else if (result === 'miss') {
    attackResult.classList.add('missed');
  } else {
    return;
  }

  box.appendChild(attackResult);
  if (checkWinner()) return;

  changeTurn();
}
