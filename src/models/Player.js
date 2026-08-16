import { Gameboard } from './Gameboard.js';
import { Ship } from './Ship.js';

export class Player {
  constructor(name = 'Player') {
    this.name = name;
    this.gameboard = new Gameboard();
    this.ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];
  }
}
