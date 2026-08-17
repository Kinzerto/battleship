import { renderShip } from '../render/renderShips.js';
import { player1 } from './players.js';
import { reset } from './restart.js';

export function placeShapeRandomly(player) {
  if (player.name !== 'Computer') {
    reset(player1);
  }
  const orientations = ['H', 'V'];

  if (player.gameboard.army.length >= player.ships.length) return;

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
      renderShip(ship.length, x, y, orientation);
    }
  });
}
