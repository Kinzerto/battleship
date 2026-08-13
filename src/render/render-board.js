export function renderBoard(player, parent) {
  for (let i = 0; i < player.gameboard.matrix.length; i++) {
    for (let j = 0; j < player.gameboard.matrix[i].length; j++) {
      const cell = document.createElement('div');

      // Put data attr in every cell
      cell.dataset.row = i;
      cell.dataset.column = j;

      parent.appendChild(cell);
    }
  }
}
