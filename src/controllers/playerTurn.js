import { gameState } from './state.js';
import { changeTurn } from './turn.js';
import { checkWinner } from './checkWinner.js';
import { computer } from './computer.js';
import { P1Element, player2 } from './players.js';
import { yard } from '../render/enemyShipsStatus.js';

export function enablePlayerAttacks(P2) {
  const cells = P2.children;

  //board cells
  for (const cell of cells) {
    cell.addEventListener('click', () => {
      if (gameState.turn !== 'P1') return;
      if (checkWinner()) return;

      //grabing the data attr value
      const row = cell.dataset.row;
      const column = cell.dataset.column;

      const result = player2.gameboard.receiveAttack(row, column);

      if (result === null) return;

      const attackResult = document.createElement('div');

      if (result[0] === 'hit') {
        attackResult.classList.add('damaged');
        const ship = result[1];

        //check if sunked
        if (ship.isSunk()) {
          const sunkShip = yard.querySelector(`.${ship.name}`);
          sunkShip.classList.add('sunked');
        }
      } else if (result === 'miss') {
        attackResult.classList.add('missed');
      } else {
        return;
      }

      cell.appendChild(attackResult);

      if (checkWinner()) return;

      changeTurn();
      setTimeout(() => {
        computer(P1Element);
      }, 500);
    });
  }
}
