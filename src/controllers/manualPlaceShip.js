import { gameState } from '../index.js';
import { renderShip } from '../render/renderShips.js';
import { player1, P1 } from './players.js';

let currentLength;
export function manual() {
  const shipContainer = document.querySelector('.shipContainer');

  player1.ships.forEach((ship) => {
    const shipEl = document.createElement('div');
    shipEl.ship = ship;
    shipEl.classList.add('ship');
    shipEl.setAttribute('draggable', 'true');
    shipEl.setAttribute('data-length', ship.length);

    const width = ship.length * 40;
    shipEl.style.width = `${width}px`;
    shipContainer.appendChild(shipEl);

    shipEl.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', shipEl.dataset.length);
      currentLength = ship.length;
    });
  });

  P1.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  P1.addEventListener('dragenter', (e) => {
    const el = e.target;
    console.log(el.dataset.column);
    for (let i = 0; i < currentLength; i++) {
      const box = P1.querySelector(
        `[data-row="${+el.dataset.row}"][data-column="${+el.dataset.column + i}"]`,
      );
      if (!box) return;
      box.classList.add('active-hover');
    }
  });

  P1.addEventListener('dragleave', (e) => {
    const el = e.target;

    for (let i = 0; i < currentLength; i++) {
      const box = P1.querySelector(
        `[data-row="${+el.dataset.row}"][data-column="${+el.dataset.column + i}"]`,
      );
      if (!box) return;
      box.classList.remove('active-hover');
    }
  });

  P1.addEventListener('drop', (e) => {
    e.preventDefault();
    const row = +e.target.dataset.row;
    const column = +e.target.dataset.column;

    const shipLength = e.dataTransfer.getData('text/plain');

    const el = shipContainer.querySelector(`[data-length="${shipLength}"]`);

    const place = player1.gameboard.placeShip(el.ship, row, column, 'H');
    if (!place) return;

    renderShip(el.ship.length, row, column, 'H');
    // if (player1.gameboard.army.length < 5) gameState.inGame = true;

    el.remove();

    console.log(player1.gameboard);
  });
}
