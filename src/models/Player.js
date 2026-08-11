import { Gameboard } from './Gameboard.js';

export class Player {
  constructor(name = 'Player') {
    this.name = name;
    this.gameboard = new Gameboard();
  }
}
