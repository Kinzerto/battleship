import { checkWinner } from './checkWinner.js';
import { changeTurn } from './turn.js';
import { shipContainer1 } from './players.js';
import { gameState } from '../state/state.js';

export function computer(boardContainer, player) {
  if (checkWinner()) return;
  if (gameState.inGame === false) return;

  let result, row, column;

  do {
    row = Math.floor(Math.random() * 10);
    column = Math.floor(Math.random() * 10);
    result = player.gameboard.receiveAttack(row, column);
  } while (result === null);

  //board squires with or without a boat
  const box = boardContainer.querySelector(
    `[data-row="${row}"][data-column="${column}"]`,
  );

  if (result.hit === 'hit') {
    shipGotHit(box, result.shot);
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
