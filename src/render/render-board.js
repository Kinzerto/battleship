import ghost from '../assets/images/ghost.png';

export function renderBoard(player, parent) {
  parent.replaceChildren();

  const topLfeft = document.createElement('div');
  topLfeft.classList.add('corner', 'void');

  const ghostPng = document.createElement('img');
  ghostPng.src = ghost;
  ghostPng.alt = 'cute ghost png logo';

  topLfeft.append(ghostPng);

  parent.appendChild(topLfeft);

  for (let i = 0; i < player.gameboard.matrix.length; i++) {
    if (i === 0) {
      for (let c = 0; c < 10; c++) {
        const top = document.createElement('div');
        top.textContent = c + 1;

        top.classList.add('corner');
        parent.appendChild(top);
      }
    }
    const top = document.createElement('div');
    top.textContent = String.fromCharCode(65 + i);

    top.classList.add('corner');
    top.classList.add('left');
    parent.appendChild(top);

    for (let j = 0; j < player.gameboard.matrix[i].length; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      // Put data attr in every cell
      cell.dataset.row = i;
      cell.dataset.column = j;

      parent.appendChild(cell);
    }
  }
}
