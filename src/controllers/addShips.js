import { Ship } from '../models/Ship.js';

export function placeShapeRandomly(player) {
  const ships = [
    new Ship(5),
    new Ship(4),
    new Ship(3),
    new Ship(3),
    new Ship(2),
  ];

  const orientations = ['H', 'V'];

  ships.forEach((ship) => {
    let placed;

    do {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const binaryNumber = Math.round(Math.random());

      placed = player.gameboard.placeShip(
        ship,
        x,
        y,
        orientations[binaryNumber],
      );
      console.log(placed);
    } while (placed === null);
  });

  console.log(player.gameboard);
}
