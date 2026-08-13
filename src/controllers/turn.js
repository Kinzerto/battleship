export let turn = Math.random() < 0.5 ? 'P1' : 'P2';

export function changeTurn() {
  turn = turn === 'P1' ? 'P2' : 'P1';
}
