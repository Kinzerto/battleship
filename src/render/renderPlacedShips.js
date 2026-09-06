export function renderShip(len, x, y, orientation, shipName, boardContainer) {
  for (let i = 0; i < len; i++) {
    const row = orientation === 'V' ? x + i : x;
    const column = orientation === 'H' ? y + i : y;

    const boardElement = boardContainer.querySelector(
      `[data-row="${row}"][data-column="${column}"]`,
    );

    const wholeShip = document.createElement('div');
    wholeShip.classList.add('ship');
    wholeShip.classList.add(shipName);
    wholeShip.classList.add(`box${i}`);
    boardElement.appendChild(wholeShip);

    if (i === 0 && orientation === 'H') {
      wholeShip.classList.add('tailHorizontal');
    } else if (i === len - 1 && orientation === 'H') {
      wholeShip.classList.add('headHorizontal');
    } else if (orientation === 'H') {
      wholeShip.classList.add('horizontalMiddle');
    }

    if (i === 0 && orientation === 'V') {
      wholeShip.classList.add('tailVertical');
    } else if (i === len - 1 && orientation === 'V') {
      wholeShip.classList.add('headVertical');
    } else if (orientation === 'V') {
      wholeShip.classList.add('verticalMiddle');
    }

    const ship = document.createElement('div');
    ship.classList.add('hitmark');

    wholeShip.appendChild(ship);
  }
}
