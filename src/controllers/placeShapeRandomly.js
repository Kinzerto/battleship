import { renderShip } from '../render/renderPlacedShips.js';
import { player1 } from './players.js';
import { reset } from './restart.js';
import { shipContainer } from './manualPlaceShip.js';
import { status } from './turn.js';

export function placeShapeRandomly(player) {
  if (player.name !== 'Computer') {
    reset(player1);
  }

  const orientations = ['H', 'V'];

  if (player.gameboard.army.length >= player.ships.length) return;
  status.textContent = 'PRESS PLAY TO START';

  player.ships.forEach((ship) => {
    let placed = false;
    let x, y, orientation;

    while (!placed) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      orientation = orientations[Math.round(Math.random())];

      placed = player.gameboard.placeShip(ship, x, y, orientation);
    }
    if (player.name !== 'Computer') {
      renderShip(ship.length, x, y, orientation, ship.name);
    }
  });

  const ships = shipContainer.querySelectorAll(`.ship`);
  ships.forEach((ship) => {
    ship.draggable = false;
    ship.classList.add('draggableOff');
  });
}
