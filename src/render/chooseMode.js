import { gameState } from '../state/state.js';
import { renderComputerMode } from './renderComputerMode.js';
import { renderGame } from './renderGame.js';
import { renderPlayerMode } from './renderTwoPlayerMode.js';

export function chooseMode() {
  document.body.replaceChildren();

  const modeWrapper = document.createElement('div');
  modeWrapper.classList.add('modeWrapper');

  const title = document.createElement('h1');
  title.textContent = 'Battleship';

  const subtitle = document.createElement('h3');
  subtitle.textContent = 'CHOOSE GAME MODE';

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');

  const computerButton = document.createElement('button');
  computerButton.classList.add('computerMode');

  const computerSpan = document.createElement('span');
  computerSpan.textContent = 'COMPUTER';

  const twoPlayerButton = document.createElement('button');
  twoPlayerButton.classList.add('twoPlayerMode');

  const twoPlayerSpan = document.createElement('span');
  twoPlayerSpan.textContent = '2 PLAYER';

  computerButton.appendChild(computerSpan);
  twoPlayerButton.appendChild(twoPlayerSpan);

  buttons.append(computerButton, twoPlayerButton);

  modeWrapper.append(title, subtitle, buttons);

  document.body.appendChild(modeWrapper);

  computerButton.addEventListener('click', () => {
    gameState.isComputerMode = true;
    renderComputerMode();
  });

  twoPlayerButton.addEventListener('click', () => {
    gameState.isComputerMode = false;
    renderPlayerMode();
  });
}
