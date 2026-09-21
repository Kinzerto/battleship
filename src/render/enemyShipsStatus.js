export function showEnemyShipsName(player, shipBerth) {
  shipBerth.replaceChildren();

  const containShip = document.createElement('div');
  containShip.classList.add('containShip');

  const ships = player.ships;
  const header = document.createElement('div');
  header.textContent = `${player.name} Fleet`;
  header.classList.add('title');

  shipBerth.appendChild(header);
  shipBerth.appendChild(containShip);

  ships.forEach((ship) => {
    const shipName = document.createElement('span');
    shipName.classList.add('enemyShips');
    shipName.classList.add(ship.name);
    shipName.textContent = ship.name;
    containShip.appendChild(shipName);
  });
}
