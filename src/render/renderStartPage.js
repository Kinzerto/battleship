import { chooseMode } from './chooseMode.js';

export function renderStartPage() {
  document.body.replaceChildren();
  const pageWrapper = document.createElement('div');
  pageWrapper.classList.add('PageWrapper');

  const title = document.createElement('h1');
  title.textContent = 'Battleship';

  const subtitle = document.createElement('h3');
  subtitle.textContent = 'COMMAND YOUR FLEET';

  const button = document.createElement('button');

  button.addEventListener('click', () => {
    chooseMode();
  });

  const span = document.createElement('span');
  span.textContent = 'GAME ON';

  button.appendChild(span);

  pageWrapper.append(title, subtitle, button);

  document.body.appendChild(pageWrapper);
}
