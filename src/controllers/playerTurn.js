import { gameState } from '../state/state.js';
import { changeTurn } from './turn.js';
import { checkWinner } from './checkWinner.js';
import { computer } from './computer.js';
import { P1Element } from './players.js';

export function enablePlayerAttacks(player, playerElement, shipBerth) {
  const cells = playerElement.querySelectorAll('.cell');

  //board cells
  for (const cell of cells) {
    cell.addEventListener('click', () => {
      if (cell.classList[0] === 'corner') return;

      //stop click if winner
      if (checkWinner()) return;
      //grabing the data attr value
      const row = cell.dataset.row;
      const column = cell.dataset.column;

      const result = player.gameboard.receiveAttack(row, column);

      if (result === null) return;

      if (result[0] === 'hit') {
        const hitMark = cell.querySelector('.ship').querySelector('.hitmark');
        hitMark.classList.add('hit');

        const ship = result[1];

        //check if sunked on berth
        if (ship.isSunk()) {
          const sunkShip = shipBerth.querySelector(`.${ship.name}`);

          sunkShip.classList.add('sunked');
          const shipOnBox = playerElement.querySelectorAll(`.${ship.name}`);
          shipOnBox.forEach((part) => {
            part.classList.remove('hide');
            part.classList.add('show');
          });
        }
      } else if (result === 'miss') {
        const attackResult = document.createElement('div');
        attackResult.classList.add('missed');
        cell.appendChild(attackResult);
      } else {
        return;
      }

      //if last attack is winner annouce it and stop opponent from atacking
      if (checkWinner()) return;

      //changing turn
      changeTurn();

      //if Computer mode
      if (gameState.isComputerMode) {
        setTimeout(() => {
          computer(P1Element);
        }, 1000);
      }
    });
  }
}
