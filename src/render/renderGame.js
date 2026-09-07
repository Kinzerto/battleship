export function renderGame(parent) {
  parent.replaceChildren();

  const container = document.createElement('div');
  container.classList.add('container');

  const boardWrapper = document.createElement('div');
  boardWrapper.classList.add('board-wrapper');

  const status = document.createElement('div');
  status.classList.add('status');

  const board1 = document.createElement('div');
  board1.classList.add('player1');

  const board2 = document.createElement('div');
  board2.classList.add('player2');

  const shipContainer = document.createElement('div');
  shipContainer.classList.add('shipContainer');

  const shipConfirmBtn = document.createElement('div');
  shipConfirmBtn.classList.add('confirmBtn');

  const shipLock = document.createElement('span');
  shipLock.classList.add('lock');
  shipLock.textContent = 'Lock';

  const shipReset = document.createElement('span');
  shipReset.classList.add('reset');
  shipReset.textContent = 'Reset';

  shipConfirmBtn.append(shipLock, shipReset);
  shipContainer.appendChild(shipConfirmBtn);

  const yard = document.createElement('div');
  yard.classList.add('yard');

  const yardConfirmBtn = document.createElement('div');
  yardConfirmBtn.classList.add('confirmBtn');

  const yardLock = document.createElement('span');
  yardLock.classList.add('lock');
  yardLock.textContent = 'Lock';

  const yardReset = document.createElement('span');
  yardReset.classList.add('reset');
  yardReset.textContent = 'Reset';

  yardConfirmBtn.append(yardLock, yardReset);
  yard.appendChild(yardConfirmBtn);

  boardWrapper.append(status, board1, board2, shipContainer, yard);

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');

  const random = document.createElement('button');
  random.classList.add('random');
  random.textContent = 'Random';

  const play = document.createElement('button');
  play.classList.add('play');
  play.textContent = 'Play';

  const restart = document.createElement('button');
  restart.classList.add('restart');
  restart.textContent = 'Restart';

  const lock = document.createElement('button');
  lock.classList.add('lock');
  lock.textContent = 'Lock';

  buttons.append(random, play, restart, lock);

  container.append(boardWrapper, buttons);

  parent.appendChild(container);
}
