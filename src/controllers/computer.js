import { checkWinner } from './checkWinner.js';
import { changeTurn } from './turn.js';
import { player1 } from './players.js';
import { shipContainer, shipContainer1 } from './manualPlaceShip.js';

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

  const box = P1.querySelector(`[data-row="${row}"][data-column="${column}"]`);

  if (result[0] === 'hit') {
    const hitmark = box.querySelector('.hitmark');
    const damageShip = box.querySelector('.ship');
    console.log(damageShip);
    //berth
    const shipType = shipContainer1.querySelector(
      `.${damageShip.classList[1]}`,
    );

    //in which length on ship is hit
    const damageLocation = damageShip.classList[2];
    // const damageLocation = damageShip;

    //get the target box
    // console.log(shipType);
    // console.log(damageLocation);
    const displayDamage = shipType.querySelector(`.${damageLocation}`);

    displayDamage.classList.add('hit');

    hitmark.classList.add('hit');
  } else if (result === 'miss') {
    const attackResult = document.createElement('div');
    attackResult.classList.add('missed');
    box.appendChild(attackResult);
  } else {
    return;
  }

  if (checkWinner()) return;

  changeTurn();
}
