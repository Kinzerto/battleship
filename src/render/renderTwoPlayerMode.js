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
  form.setAttribute('novalidate', ''); // we handle validation ourselves

  // Group inputs
  const groupInput = document.createElement('div');
  groupInput.classList.add('groupInput');

  // Player 1 input
  const inputGroup1 = document.createElement('div');
  inputGroup1.classList.add('input-group1');

  const player1Input = document.createElement('input');
  player1Input.classList.add('input-text');
  player1Input.id = 'player1';
  player1Input.name = 'player1';
  player1Input.type = 'text';
  player1Input.placeholder = 'Type here';
  player1Input.autocomplete = 'off';
  player1Input.maxLength = 20;
  player1Input.minLength = 2;
  player1Input.required = true;
  player1Input.setAttribute('aria-describedby', 'player1-error');
  player1Input.setAttribute('aria-invalid', 'false');

  const player1Label = document.createElement('label');
  player1Label.classList.add('input-text-label');
  player1Label.htmlFor = 'player1';
  player1Label.textContent = 'Player Name';

  const player1Error = document.createElement('div');
  player1Error.classList.add('input-error');

  inputGroup1.append(player1Input, player1Label, player1Error);

  // Player 2 input
  const inputGroup2 = document.createElement('div');
  inputGroup2.classList.add('input-group2');

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

  const player2Error = document.createElement('div');
  player2Error.classList.add('input-error');
  // player2Error.textContent = 'player 2';

  inputGroup2.append(player2Input, player2Label, player2Error);

  groupInput.append(inputGroup1, inputGroup2);

  // Start button
  const ButtonWrapper = document.createElement('div');
  ButtonWrapper.classList.add('ButtonWrapper');

  const startButton = document.createElement('button');
  startButton.classList.add('startMode');
  startButton.type = 'submit';

  const mode = document.createElement('button');
  mode.textContent = '⏴ MODE';
  mode.classList.add('changeMode');

  const startSpan = document.createElement('span');
  startSpan.textContent = 'START';

  startButton.appendChild(startSpan);
  ButtonWrapper.append(startButton, mode);

  // Form structure
  form.append(groupInput, ButtonWrapper);

  // Final structure
  modeWrapper.append(title, subtitle, form);

  player1Input.addEventListener('input', () => {
    clearError(player1Input, player1Error);
  });

  player2Input.addEventListener('input', () => {
    clearError(player2Input, player2Error);
  });

  document.body.appendChild(modeWrapper);

  // Submit form
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    startFunc(player1Input, player2Input, player1Error, player2Error);
  });

  mode.addEventListener('click', (e) => {
    e.preventDefault();

    changeMode();
  });
}

/**
 * Validates a player name.
 * Returns an error message string if invalid, or null if valid.
 */
function validatePlayerName(name) {
  if (!name) {
    return 'Name is required.';
  }
  if (name.toLowerCase() === 'computer') {
    return '"Computer" is a reserved name.';
  }

  if (name.length < 2) {
    return 'Name must be at least 2 characters.';
  }

  if (name.length > 20) {
    return 'Name must be at most 20 characters.';
  }

  // Allow letters, numbers, spaces, hyphens, and apostrophes only
  const validPattern = /^[\p{L}\p{N} '-]+$/u;
  if (!validPattern.test(name)) {
    return 'Name contains invalid characters.';
  }

  return null;
}

function showError(input, errorEl, message) {
  errorEl.textContent = message;
  input.classList.add('input-error-state');
  input.setAttribute('aria-invalid', 'true');
}

function clearError(input, errorEl) {
  errorEl.textContent = '';
  input.classList.remove('input-error-state');
  input.setAttribute('aria-invalid', 'false');
}

function startFunc(inp1, inp2, error1El, error2El) {
  const P1 = inp1.value.trim();
  const P2 = inp2.value.trim();

  const p1Error = validatePlayerName(P1);
  const p2Error = validatePlayerName(P2);

  const duplicateError =
    !p1Error && !p2Error && P1.toLowerCase() === P2.toLowerCase()
      ? 'Player names must be different.'
      : null;

  if (p1Error) {
    showError(inp1, error1El, p1Error);
  } else if (duplicateError) {
    showError(inp1, error1El, duplicateError);
  } else {
    clearError(inp1, error1El);
  }

  if (p2Error) {
    showError(inp2, error2El, p2Error);
  } else if (duplicateError) {
    showError(inp2, error2El, duplicateError);
  } else {
    clearError(inp2, error2El);
  }

  // Stop if either field is invalid
  if (p1Error || p2Error || duplicateError) {
    // Focus the first invalid field
    (p1Error || duplicateError ? inp1 : inp2).focus();
    return;
  }

  renderGame();
  initialize(P1, P2);
  startGame();
}

function changeMode() {
  chooseMode();
}
