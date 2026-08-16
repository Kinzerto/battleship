export function renderShip(len, x, y, orientation, player) {
  for (let i = 0; i < len; i++) {
    const row = orientation === 'V' ? x + i : x;
    const column = orientation === 'H' ? y + i : y;

    const boardElement = document.querySelector(
      `.player1 div[data-row="${row}"][data-column="${column}"]`,
    );

    boardElement.style.backgroundColor = 'lightblue';
  }
}
