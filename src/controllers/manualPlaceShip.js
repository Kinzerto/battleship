import { renderShip } from '../render/renderShips.js';
import { player1, P1 } from './players.js';

const shipContainer = document.querySelector('.shipContainer');

export function manual() {
  shipContainer.replaceChildren();

  player1.ships.forEach((ship, index) => {
    const shipEl = document.createElement('div');
    shipEl.ship = ship;
    shipEl.dataset.shipId = index;
    shipEl.classList.add('ship');
    shipEl.draggable = true;
    shipEl.style.width = `${ship.length * 40}px`;

    shipEl.dataset.orientation = 'H';

    shipEl.addEventListener('dblclick', () => {
      shipEl.dataset.orientation =
        shipEl.dataset.orientation === 'H' ? 'V' : 'H';

      if (shipEl.dataset.orientation === 'H') {
        shipEl.style.width = `${ship.length * 40}px`;
        shipEl.style.height = '40px';
      } else {
        shipEl.style.width = '40px';
        shipEl.style.height = `${ship.length * 40}px`;
      }
    });

    shipContainer.appendChild(shipEl);

    shipEl.addEventListener('dragstart', (e) => {
      e.dataTransfer.setDragImage(shipEl, 10, 20);
      e.dataTransfer.setData('text/plain', index);
    });
  });
}

P1.addEventListener('dragover', (e) => {
  e.preventDefault();
});

P1.addEventListener('drop', (e) => {
  e.preventDefault();
  const row = +e.target.dataset.row;
  const column = +e.target.dataset.column;

  const shipId = e.dataTransfer.getData('text/plain');
  const el = shipContainer.querySelector(`[data-ship-id="${shipId}"]`);
  const orientation = el.dataset.orientation;

  const place = player1.gameboard.placeShip(el.ship, row, column, orientation);

  if (!place) return;

  renderShip(el.ship.length, row, column, orientation);
  el.remove();
});
