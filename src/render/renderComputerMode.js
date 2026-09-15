import { initialize, player1, player2 } from '../controllers/players.js';
import { startGame } from '../controllers/startGame.js';
import { chooseMode } from './chooseMode.js';
import { renderGame } from './renderGame.js';

export function renderComputerMode() {
  document.body.replaceChildren();

  const modeWrapper = document.createElement('div');
  modeWrapper.classList.add('modeWrapper');

  const title = document.createElement('h1');
  title.textContent = 'Battleship';

  const subtitle = document.createElement('h3');
  subtitle.textContent = 'COMPUTER MODE';

  // Form
  const form = document.createElement('form');
  form.setAttribute('novalidate', ''); // we handle validation ourselves

  // Group inputs
  const groupInput = document.createElement('div');
  groupInput.classList.add('groupInput');

  // Player 1 input
  const inputGroup1 = document.createElement('div');
  inputGroup1.classList.add('input-group');

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

  // Error message element
  const player1Error = document.createElement('div');
  player1Error.classList.add('input-error');
  // player1Error.id = 'player1-error';
  // player1Error.setAttribute('role', 'alert');
  // player1Error.style.display = 'none';

  inputGroup1.append(player1Input, player1Label, player1Error);

  groupInput.append(inputGroup1);

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

  document.body.appendChild(modeWrapper);

  // Clear error as user types
  player1Input.addEventListener('input', () => {
    clearError(player1Input, player1Error);
  });

  // Submit form
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    startFunc(player1Input, player1Error);
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
  input.focus();
}

function clearError(input, errorEl) {
  errorEl.textContent = '';
  input.classList.remove('input-error-state');
  input.setAttribute('aria-invalid', 'false');
}

function startFunc(inp1, errorEl) {
  const P1 = inp1.value.trim();

  const error = validatePlayerName(P1);

  if (error) {
    showError(inp1, errorEl, error);
    inp1.focus();
    return;
  }

  clearError(inp1, errorEl);

  renderGame();
  initialize(P1);
  startGame();
}

function changeMode() {
  chooseMode();
}
