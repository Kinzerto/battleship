import { renderBoard } from '../render/render-board.js';
import { renderShip } from '../render/renderPlacedShips.js';
import { gameState } from '../state/state.js';
import { status } from './players.js';

//if random is clicked twice or more resets the board
function randomAgain(player, boardContainer) {
  boardContainer.replaceChildren();
  player.resetGameboard();

  //delete later
  player.resetShipDamage();

  boardContainer.replaceChildren();

  renderBoard(player, boardContainer);
}

export function placeShapeRandomly(player, shipBerth, boardContainer) {
  randomAgain(player, boardContainer);

  const orientations = ['H', 'V'];

  if (player.gameboard.army.length >= player.ships.length) return;

  status.textContent = 'PRESS PLAY TO START';

  //place on board based on random
  player.ships.forEach((ship) => {
    let placed = false;
    let x, y, orientation;

    while (!placed) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);

      orientation =
        orientations[Math.floor(Math.random() * orientations.length)];

      if (player.gameboard.canPlaceWithSpacing(ship, x, y, orientation)) {
        placed = player.gameboard.placeShip(ship, x, y, orientation);
      }
    }

    if (gameState.isComputerMode && player.name !== 'Computer') {
      renderShip(ship.length, x, y, orientation, ship.name, boardContainer);
    } else if (gameState.isComputerMode && player.name === 'Computer') {
      renderShip(ship.length, x, y, orientation, ship.name, boardContainer);
      boardContainer.classList.add('hidden');
    }
    if (!gameState.isComputerMode) {
      renderShip(ship.length, x, y, orientation, ship.name, boardContainer);
    }
  });

  const ships = shipBerth.querySelectorAll(`.ship`);

  ships.forEach((ship) => {
    ship.draggable = false;
    ship.classList.add('draggableOff');
  });
}
