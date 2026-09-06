import { Gameboard } from './Gameboard.js';
import { Ship } from './Ship.js';

export class Player {
  constructor(name = 'Computer') {
    this.name = name;
    this.gameboard = new Gameboard();
    this.ships = this.createShips();
  }

  resetGameboard() {
    this.gameboard = new Gameboard();
  }

  createShips() {
    return [
      new Ship(5, 'carrier'),
      new Ship(4, 'battleship'),
      new Ship(3, 'destroyer'),
      new Ship(3, 'submarine'),
      new Ship(2, 'patrol'),
    ];
  }

  resetShipDamage() {
    this.ships = this.createShips();
  }
}
