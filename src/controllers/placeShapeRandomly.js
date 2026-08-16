import { renderShip } from '../render/renderShips.js';

export function placeShapeRandomly(player) {
  if (player.name !== 'Computer') {
    player.gameboard.matrix = Array.from({ length: 10 }, () =>
      Array(10).fill(null),
    );

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const boardElement = document.querySelector(
          `.player1 div[data-row="${i}"][data-column="${j}"]`,
        );
        boardElement.style.backgroundColor = 'inherit';
      }
    }
    player.gameboard.army = [];
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

  console.log(player.gameboard.matrix);
  console.log(player.gameboard.army);
}
