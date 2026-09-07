import { gameState } from '../state/state.js';
import { changeTurn } from './turn.js';
import { checkWinner } from './checkWinner.js';
import { computer } from './computer.js';
import { P1Element, player1, player2 } from './players.js';

export function enablePlayerAttacks(player, playerElement, shipBerth) {
  const cells = playerElement.children;

  //board cells
  for (const cell of cells) {
    cell.addEventListener('click', () => {
      // if (gameState.turn !== 'P1' && gameState.isComputerMode === true) return;
      if (cell.classList[0] === 'corner') return;
      if (checkWinner()) return;

      //grabing the data attr value
      const row = cell.dataset.row;
      const column = cell.dataset.column;

      const result = player.gameboard.receiveAttack(row, column);

      if (result === null) return;

      const attackResult = document.createElement('div');

      if (result[0] === 'hit') {
        attackResult.classList.add('damaged');
        const ship = result[1];

        //check if sunked
        if (ship.isSunk()) {
          const sunkShip = shipBerth.querySelector(`.${ship.name}`);
          sunkShip.classList.add('sunked');
        }
      } else if (result === 'miss') {
        attackResult.classList.add('missed');
      } else {
        return;
      }

      cell.appendChild(attackResult);
      console.log(player2.gameboard);
      console.log(player1.gameboard);

      if (checkWinner()) return;

      changeTurn();

      //if Computer mode
      if (gameState.isComputerMode) {
        setTimeout(() => {
          computer(P1Element, P1Element);
        }, 500);
      }
    });
  }
}
