import { checkWinner } from './checkWinner.js';
import { changeTurn } from './turn.js';
import { player1, shipContainer1 } from './players.js';
import { gameState } from '../state/state.js';

export function computer(boardContainer) {
  if (checkWinner()) return;
  if (gameState.inGame === false) return;

  let result, row, column;

  do {
    row = Math.floor(Math.random() * 10);
    column = Math.floor(Math.random() * 10);

    result = player1.gameboard.receiveAttack(row, column);
  } while (result === null);

  //board squires with or without a boat
  const box = boardContainer.querySelector(
    `[data-row="${row}"][data-column="${column}"]`,
  );

  if (result[0] === 'hit') {
    shipGotHit(box);
  } else if (result === 'miss') {
    shotMissed(box);
  } else {
    return;
  }

  if (checkWinner()) return;

  changeTurn();
}

//if the shot hit
function shipGotHit(damagedShip) {
  const hitmark = damagedShip.querySelector('.hitmark');
  const damageShip = damagedShip.querySelector('.ship');

  hitmark.classList.add('hit');

  //on berth
  const shipType = shipContainer1.querySelector(`.${damageShip.classList[1]}`);

  //in which length on ship is hit
  const damageLocation = damageShip.classList[2];

  const displayDamage = shipType.querySelector(`.${damageLocation}`);

  displayDamage.classList.add('hit');
}

//if the shot hit
function shotMissed(ocean) {
  const attackResult = document.createElement('div');
  attackResult.classList.add('missed');
  ocean.appendChild(attackResult);
}
