import { gameState } from '../state/state.js';
import { LockShips } from './lockShips.js';
import { placeShapeRandomly } from './placeShapeRandomly.js';
import { activePlayer } from './players.js';
import { resetShips } from './resetPlacedShip.js';

export function addController(parent) {
  const option = document.createElement('div');
  option.classList.add('option');
  option.replaceChildren();

  if (parent.className === 'yard' && gameState.isComputerMode) {
    option.classList.add('hideOption');
  }
  const random = document.createElement('button');
  random.textContent = 'Random';
  option.append(random);

  if (!gameState.isComputerMode) {
    const lock = document.createElement('button');
    lock.textContent = 'Deploy';

    lock.addEventListener('click', () => {
      LockShips();
    });

    option.append(lock);
  }

  const reset = document.createElement('button');
  reset.textContent = 'Reset';
  option.append(reset);

  parent.appendChild(option);

  reset.addEventListener('click', () => {
    resetShips();
  });

  random.addEventListener('click', () => {
    placeShapeRandomly(
      activePlayer.player,
      activePlayer.berthContainer,
      activePlayer.boardContainer,
    );
  });
}
