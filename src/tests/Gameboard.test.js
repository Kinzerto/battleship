import { Gameboard } from '../models/Gameboard.js';
import { Ship } from '../models/Ship.js';

describe('Test class Gameboard', () => {
  it('tests if the ship is at specific  coordinates', () => {
    const game = new Gameboard();
    const carrier = new Ship(5);
    // const battleship = new Ship(4);
    // const destroyer = new Ship(3);
    // const submarine = new Ship(3);
    // const patrol_boat = new Ship(2);
    for (let i = carrier.length - 1; i >= 0; i--) {
      game.board[1 + i][0] = 'carrier';
    }
    console.log(game.board);
  });
});
