import { Gameboard } from '../models/Gameboard.js';
import { Ship } from '../models/Ship';

/*
Gameboard
│
├── placeShip()
│   ├── places horizontal ship
│   ├── places vertical ship
│   ├── prevents ship going outside board
│   └── prevents overlapping ships
│
└── receiveAttack()
    ├── damages ship when hit
    ├── records missed attack
    ├── prevents attacking same coordinate twice
    └── detects when all ships are sunk
*/
describe('Test Battleship Gameboard', () => {
  describe('Test placeShip() method', () => {
    it('places horizontal ship', () => {
      const board = new Gameboard();
      const carrier = new Ship(5);
      board.placeShip(carrier, 0, 4, 'H');

      for (let i = 0; i < carrier.length; i++) {
        expect(board.matrix[0][4 + i]).toBe(carrier);
      }
    });

    it('places vertical ship', () => {
      const board = new Gameboard();
      const battleship = new Ship(4);
      board.placeShip(battleship, 0, 0, 'V');

      for (let i = 0; i < battleship.length; i++) {
        expect(board.matrix[0 + i][0]).toBe(battleship);
      }
    });

    it('prevents ship going outside board', () => {
      const board = new Gameboard();
      const copy = board.matrix.map((row) => [...row]);
      const cruiser = new Ship(3);

      // board.placeShip(cruiser, 0, 10, 'V');
      board.placeShip(cruiser, 0, 8, 'H');

      expect(board.matrix).toEqual(copy);
    });

    it('prevents overlapping ships', () => {
      const board = new Gameboard();
      const battleship = new Ship(4);
      const cruiser = new Ship(3);

      board.placeShip(cruiser, 5, 5, 'V');
      const copy = board.matrix.map((row) => [...row]);

      board.placeShip(battleship, 5, 5, 'H');

      expect(board.matrix).toEqual(copy);
    });
  });

  describe('Test receiveAttack() method', () => {
    it('damages ship when hit', () => {
      const board = new Gameboard();
      const carrier = new Ship(5);
      const battleship = new Ship(4);

      board.placeShip(carrier, 0, 4, 'H');
      board.placeShip(battleship, 6, 0, 'V');

      console.log(board.matrix);

      board.receiveAttack(0, 4);
      board.receiveAttack(0, 5);
      board.receiveAttack(7, 0);

      expect(board.army[0].damage).toBe(2);
      expect(board.army[1].damage).toBe(1);
    });

    it('prevents attacking same coordinate twice', () => {
      const board = new Gameboard();
      const carrier = new Ship(5);
      const battleship = new Ship(4);

      board.placeShip(carrier, 0, 4, 'H');
      board.placeShip(battleship, 6, 0, 'V');

      board.receiveAttack(0, 4);
      board.receiveAttack(0, 5);
      board.receiveAttack(7, 0);

      expect(board.receiveAttack(7, 0)).toBe(null);
    });

    it('detects when all ships are sunk', () => {
      const board = new Gameboard();
      const carrier = new Ship(5);
      const battleship = new Ship(4);

      board.placeShip(carrier, 0, 4, 'H');
      board.placeShip(battleship, 6, 0, 'V');

      board.receiveAttack(0, 4);
      board.receiveAttack(0, 5);
      board.receiveAttack(0, 6);
      board.receiveAttack(0, 7);
      board.receiveAttack(0, 8);

      board.receiveAttack(6, 0);
      board.receiveAttack(7, 0);
      board.receiveAttack(8, 0);
      board.receiveAttack(9, 0);

      expect(board.isGameOver).toBe(true);
    });
  });
});
