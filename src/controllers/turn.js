export let turn = Math.random() < 0.5 ? 'P1' : 'P2';

const status = document.querySelector('.status');

status.textContent = `Player ${turn}'s Turn`;

export function changeTurn() {
  turn = turn === 'P1' ? 'P2' : 'P1';
  status.textContent = `Player ${turn}'s Turn`;
}
