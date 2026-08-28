export const yard = document.querySelector('.yard');

export function showEnemyShipsName(player) {
  yard.replaceChildren();
  const containShip = document.createElement('div');
  containShip.classList.add('containShip');

  const ships = player.ships;
  const header = document.createElement('div');
  header.textContent = 'Enemy ships';
  header.classList.add('title');

  yard.appendChild(header);
  yard.appendChild(containShip);

  ships.forEach((ship) => {
    const shipName = document.createElement('span');
    shipName.classList.add('enemyShips');
    shipName.classList.add(ship.name);
    shipName.textContent = ship.name;
    containShip.appendChild(shipName);
  });
}
