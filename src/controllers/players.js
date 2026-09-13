import { Player } from '../models/Player.js';

export let P1Element, P2Element;
export let player1, player2;
export let shipContainer1, shipContainer2;
export let status;
export let activePlayer;

export function initialize(play1, play2) {
  P1Element = document.querySelector('.player1');
  P2Element = document.querySelector('.player2');

  console.log(play1);
  player1 = new Player(play1);
  player2 = new Player(play2);

  shipContainer1 = document.querySelector('.shipContainer');
  shipContainer2 = document.querySelector('.yard');

  status = document.querySelector('.status');

  activePlayer = {
    boardContainer: P1Element,
    player: player1,
    berthContainer: shipContainer1,
  };
}
