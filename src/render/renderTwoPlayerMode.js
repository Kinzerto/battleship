import { initialize, player1, player2 } from '../controllers/players.js';
import { startGame } from '../controllers/startGame.js';
import { chooseMode } from './chooseMode.js';
import { renderGame } from './renderGame.js';

export function renderPlayerMode() {
  document.body.replaceChildren();

  const modeWrapper = document.createElement('div');
  modeWrapper.classList.add('modeWrapper');

  const title = document.createElement('h1');
  title.textContent = 'Battleship';

  const subtitle = document.createElement('h3');
  subtitle.textContent = '2 PLAYER MODE';

  // Form
  const form = document.createElement('form');

  // Group inputs
  const groupInput = document.createElement('div');
  groupInput.classList.add('groupInput');

  // Player 1 input
  const inputGroup1 = document.createElement('div');
  inputGroup1.classList.add('input-group');

  const player1Input = document.createElement('input');
  player1Input.classList.add('input-text');
  player1Input.name = 'player1';
  player1Input.type = 'text';
  player1Input.placeholder = 'Type here';
  player1Input.autocomplete = 'off';
  player1Input.maxLength = 20;
  player1Input.minLength = 2;
  player1Input.required = true;

  const player1Label = document.createElement('label');
  player1Label.classList.add('input-text-label');
  player1Label.htmlFor = 'player1';
  player1Label.textContent = 'Player 1 Name';

  inputGroup1.append(player1Input, player1Label);

  // Player 2 input
  const inputGroup2 = document.createElement('div');
  inputGroup2.classList.add('input-group');

  const player2Input = document.createElement('input');
  player2Input.classList.add('input-text');
  player2Input.name = 'player2';
  player2Input.type = 'text';
  player2Input.placeholder = 'Type here';
  player2Input.autocomplete = 'off';
  player2Input.maxLength = 20;
  player2Input.minLength = 2;
  player2Input.required = true;

  const player2Label = document.createElement('label');
  player2Label.classList.add('input-text-label');
  player2Label.htmlFor = 'player2';
  player2Label.textContent = 'Player 2 Name';

  inputGroup2.append(player2Input, player2Label);

  groupInput.append(inputGroup1, inputGroup2);

  // Start button
  const ButtonWrapper = document.createElement('div');
  ButtonWrapper.classList.add('ButtonWrapper');

  const startButton = document.createElement('button');
  startButton.classList.add('startMode');
  startButton.type = 'submit';

  const mode = document.createElement('button');
  mode.textContent = 'MODE';
  mode.classList.add('changeMode');

  const startSpan = document.createElement('span');
  startSpan.textContent = 'START';

  startButton.appendChild(startSpan);
  ButtonWrapper.append(startButton, mode);

  // Form structure
  form.append(groupInput, ButtonWrapper);

  // Final structure
  modeWrapper.append(title, subtitle, form);

  document.body.appendChild(modeWrapper);

  // Submit form
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    startFunc(player1Input, player2Input);
  });

  mode.addEventListener('click', (e) => {
    e.preventDefault();

    changeMode();
  });
}

function startFunc(inp1, inp2) {
  const P1 = inp1.value.trim();
  const P2 = inp2.value.trim();

  if (P1.length < 2 || P2.length < 2) {
    return;
  }

  renderGame();
  initialize(P1, P2);
  startGame();
}

function changeMode() {
  chooseMode();
}
