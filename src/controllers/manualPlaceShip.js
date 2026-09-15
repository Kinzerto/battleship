import { renderShip } from '../render/renderPlacedShips.js';
import {
  player1,
  P1Element,
  player2,
  shipContainer1,
  shipContainer2,
  activePlayer,
} from './players.js';
import { gameState } from '../state/state.js';
import { LockShips } from './lockShips.js';
import { resetShips } from './resetPlacedShip.js';
import { placeShapeRandomly } from './placeShapeRandomly.js';

let pickedShip;
let targetCells = [];
let targetBox;

//clears preview on board
function clearPreview() {
  targetCells.forEach((cell) => {
    cell.classList.remove('previewCell');
  });

  targetCells = [];
}

//double click ship to change orientation
function dblclick(shipEl) {
  const container = shipEl.querySelector('.ship');
  const shipName = shipEl.querySelector('.shipName');

  container.dblClickHandler = (e) => {
    e.preventDefault();

    container.dataset.orientation =
      container.dataset.orientation === 'H' ? 'V' : 'H';

    const direction =
      container.dataset.orientation === 'H' ? '\u2192' : '\u2191';
    shipName.textContent = `${container.classList[1]} (${direction})`;
  };

  container.addEventListener('contextmenu', container.dblClickHandler);
}

export function manual(player, shipBerth) {
  const army = document.createElement('div');
  army.classList.add('armyShips');

  shipBerth.replaceChildren();

  const header = document.createElement('div');
  header.textContent = `${player.name}s Fleet`;
  header.classList.add('title');
  shipBerth.appendChild(header);

  player.ships.forEach((ship, index) => {
    const shipWrapper = document.createElement('div');
    shipWrapper.classList.add('shipWrapper');
    shipBerth.appendChild(shipWrapper);

    const shipEl = document.createElement('div');
    shipEl.classList.add('ship');
    shipEl.classList.add(ship.name);

    //dots on ship
    for (let i = 0; i < ship.length; i++) {
      const hitBox = document.createElement('div');
      hitBox.classList.add(`box${i}`);
      shipEl.appendChild(hitBox);
    }

    shipEl.draggable = true;
    shipEl.ship = ship;
    shipEl.dataset.shipId = index;

    shipEl.dataset.orientation = 'H';

    //Name Of the ship
    const shipName = document.createElement('div');
    shipName.textContent = `${ship.name} (${'\u2192'})`;
    shipName.classList.add('shipName');
    shipWrapper.classList.add('shipWrapper');

    shipWrapper.appendChild(shipEl);
    shipWrapper.appendChild(shipName);

    dblclick(shipWrapper);

    // Pass Data of dragged ship
    shipEl.addEventListener('dragstart', (e) => {
      const orientation = shipEl.dataset.orientation;

      // Build a standalone ghost so the resting berth ship stays horizontal,
      // but the dragged ghost visually reflects the ship's real orientation.
      const dragImage = shipEl.cloneNode(true);
      dragImage.classList.toggle('vertical', orientation === 'V');

      document.body.appendChild(dragImage);

      const offsetX = orientation === 'V' ? 20 : 10;
      const offsetY = orientation === 'V' ? 10 : 20;

      e.dataTransfer.setDragImage(dragImage, offsetX, offsetY);

      // Stash it so dragend can clean it up AFTER the browser is done with it
      shipEl._dragGhost = dragImage;

      e.dataTransfer.setData('text/plain', index.toString());
      pickedShip = shipEl;

      const clonedDiv = shipEl.cloneNode(true);
      clonedDiv.classList.add('clone');
      clonedDiv.dataset.isdrag = 'true';
    });

    shipEl.addEventListener('dragend', () => {
      shipEl.dataset.isdrag = 'false';

      // Clean up the ghost now that the drag operation is fully finished
      if (shipEl._dragGhost) {
        shipEl._dragGhost.remove();
        shipEl._dragGhost = null;
      }
    });
  });

  checkShipPlaced(shipBerth);
}

function dragoverHandler(e) {
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

    const previewCell = activePlayer.boardContainer.querySelector(
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
}

function dragleaveHandler(e) {
  const cell = e.target.closest('.cell');
  if (!cell) return;

  if (!cell.contains(e.relatedTarget)) {
    clearPreview();
    targetBox = null;
  }
}

function dropHandler(e) {
  e.preventDefault();

  if (e.dataTransfer.types.includes('text/html')) return;

  const data = e.dataTransfer.getData('text/plain');

  if (data === '') return;

  const cell = e.target.closest('[data-row][data-column]');
  if (!cell) return;

  const row = +cell.dataset.row;
  const column = +cell.dataset.column;

  const el = activePlayer.berthContainer.querySelector(
    ` [data-ship-id="${data}"]`,
  );

  console.log(el);
  if (!el) return;

  const orientation = el.dataset.orientation;

  const place = activePlayer.player.gameboard.placeShip(
    el.ship,
    row,
    column,
    orientation,
  );

  clearPreview();

  if (!place) return;

  renderShip(
    el.ship.length,
    row,
    column,
    orientation,
    el.ship.name,
    activePlayer.boardContainer,
  );

  el.draggable = false;

  el.removeEventListener('dblclick', el.dblClickHandler);

  el.classList.add('draggableOff');
  el.classList.add('placed');

  // checkShips();

  console.log(player1.gameboard.matrix);
  console.log(player2.gameboard.matrix);
}

export function addBoardListeners() {
  activePlayer.boardContainer.addEventListener('dragover', dragoverHandler);
  activePlayer.boardContainer.addEventListener('dragleave', dragleaveHandler);
  activePlayer.boardContainer.addEventListener('drop', dropHandler);

  const parent =
    activePlayer.boardContainer === P1Element ? shipContainer2 : shipContainer1;

  const ships = parent.querySelectorAll('.ship');

  ships.forEach((shp) => {
    shp.draggable = false;
  });
}

export function removeBoardListeners() {
  activePlayer.boardContainer.removeEventListener('dragover', dragoverHandler);
  activePlayer.boardContainer.removeEventListener(
    'dragleave',
    dragleaveHandler,
  );
  activePlayer.boardContainer.removeEventListener('drop', dropHandler);

  const parent =
    activePlayer.boardContainer === P1Element ? shipContainer2 : shipContainer1;

  const ships = parent.querySelectorAll('.ship');

  ships.forEach((shp) => {
    console.log(shp);
    shp.draggable = true;
  });
}

export function checkShipPlaced(parent) {
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
    lock.textContent = 'Lock';

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
