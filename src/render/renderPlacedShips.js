export function renderShip(len, x, y, orientation, shipName) {
  for (let i = 0; i < len; i++) {
    const row = orientation === 'V' ? x + i : x;
    const column = orientation === 'H' ? y + i : y;

    const boardElement = document.querySelector(
      `.player1 div[data-row="${row}"][data-column="${column}"]`,
    );

    const whole = document.createElement('div');
    whole.classList.add('ship');
    whole.classList.add(shipName);
    whole.classList.add(`box${i}`);
    boardElement.appendChild(whole);

    if (i === 0 && orientation === 'H') {
      whole.classList.add('tailHorizontal');
    } else if (i === len - 1 && orientation === 'H') {
      whole.classList.add('headHorizontal');
    } else if (orientation === 'H') {
      whole.classList.add('horizontalMiddle');
    }

    if (i === 0 && orientation === 'V') {
      whole.classList.add('tailVertical');
    } else if (i === len - 1 && orientation === 'V') {
      whole.classList.add('headVertical');
    } else if (orientation === 'V') {
      whole.classList.add('verticalMiddle');
    }

    const ship = document.createElement('div');

    whole.appendChild(ship);

    ship.classList.add('hitmark');
  }
}
