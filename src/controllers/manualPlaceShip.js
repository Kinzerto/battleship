import { renderShip } from '../render/renderPlacedShips.js';
import { player1, P1Element } from './players.js';
import { status } from './turn.js';

export const shipContainer = document.querySelector('.shipContainer');

let pickedShip;
let targetCells = [];
let targetBox;

//double click ship to change orientation
function dblclick(shipEl) {
  shipEl.dblClickHandler = () => {
    shipEl.dataset.orientation = shipEl.dataset.orientation === 'H' ? 'V' : 'H';

    if (shipEl.dataset.orientation === 'V') {
      shipEl.classList.add('vertical');
    } else {
      shipEl.classList.remove('vertical');
    }
  };

  shipEl.addEventListener('dblclick', shipEl.dblClickHandler);
}

export function manual(player) {
  shipContainer.replaceChildren();

  //Header: "Your Fleet"
  const header = document.createElement('div');
  header.textContent = 'Your Fleet';
  header.classList.add('title');
  shipContainer.appendChild(header);

  player.ships.forEach((ship, index) => {
    const shipEl = document.createElement('div');
    shipEl.classList.add('ship');
    shipEl.classList.add(ship.name);

    for (let i = 0; i < ship.length; i++) {
      const hitBox = document.createElement('div');
      hitBox.classList.add(`box${i}`);
      shipEl.appendChild(hitBox);
    }

    shipEl.draggable = true;
    shipEl.ship = ship;
    shipEl.dataset.shipId = index;

    shipEl.dataset.orientation = 'H';

    dblclick(shipEl);

    shipContainer.appendChild(shipEl);

    // Pass Data of dragged ship
    shipEl.addEventListener('dragstart', (e) => {
      e.dataTransfer.setDragImage(shipEl, 10, 20);
      e.dataTransfer.setData('text/plain', index.toString());
      pickedShip = shipEl;
    });
  });
}

//clearing colored cell
function clearPreview() {
  targetCells.forEach((cell) => {
    cell.classList.remove('previewCell');
  });

  targetCells = [];
}

P1Element.addEventListener('dragover', (e) => {
  e.preventDefault();

  const cell = e.target.closest('.cell');

  if (!cell || !pickedShip) {
    clearPreview();
    targetBox = null;
    return;
  }

  if (targetBox === cell) return;

  clearPreview();

  targetBox = cell;

  const row = +targetBox.dataset.row;
  const column = +targetBox.dataset.column;
  const orientation = pickedShip.dataset.orientation;
  const length = pickedShip.ship.length;

  for (let i = 0; i < length; i++) {
    const currentRow = orientation === 'V' ? row + i : row;

    const currentColumn = orientation === 'H' ? column + i : column;

    const previewCell = P1Element.querySelector(
      `[data-row="${currentRow}"][data-column="${currentColumn}"]`,
    );

    if (!previewCell || previewCell.children.length > 0) {
      clearPreview();
      targetBox = null;
      return;
    }

    previewCell.classList.add('previewCell');
    targetCells.push(previewCell);
  }
});

P1Element.addEventListener('dragleave', (e) => {
  const cell = e.target.closest('.cell');
  if (!cell) return;

  if (!cell.contains(e.relatedTarget)) {
    clearPreview();
    targetBox = null;
  }
});

P1Element.addEventListener('drop', (e) => {
  e.preventDefault();
  if (e.dataTransfer.types.includes('text/html')) return;

  const data = e.dataTransfer.getData('text/plain');

  if (data === '') return;

  const cell = e.target.closest('[data-row][data-column]');

  if (!cell) return;

  const row = +cell.dataset.row;
  const column = +cell.dataset.column;

  const el = shipContainer.querySelector(`[data-ship-id="${data}"]`);

  if (!el) return;

  const orientation = el.dataset.orientation;

  const place = player1.gameboard.placeShip(el.ship, row, column, orientation);
  clearPreview();
  if (!place) return;
  renderShip(el.ship.length, row, column, orientation, el.ship.name);

  el.draggable = false;
  // el.removeEventListener('dblclick', dblclick);
  el.removeEventListener('dblclick', el.dblClickHandler);

  el.classList.add('draggableOff');

  el.classList.add('placed');

  checkShips();
});

function checkShips() {
  if (player1.gameboard.army.length >= player1.ships.length) {
    status.textContent = 'PRESS PLAY TO START';
  }
}
