import { Ship } from '../models/Ship.js';

describe('Test class Ships length', () => {
  const carrier = new Ship(5);
  const battleship = new Ship(4);
  const destroyer = new Ship(3);
  const submarine = new Ship(3);
  const patrol_boat = new Ship(2);

  it('returns the length of the ships', () => {
    expect(carrier.length).toBe(5);
    expect(battleship.length).toBe(4);
    expect(destroyer.length).toBe(3);
    expect(submarine.length).toBe(3);
    expect(patrol_boat.length).toBe(2);
  });

  it('returns correct damage', () => {
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    expect(carrier.damage).toBe(5);

    battleship.hit();
    battleship.hit();
    battleship.hit();
    battleship.hit();
    battleship.hit();
    battleship.hit();
    battleship.hit();
    expect(battleship.damage).toBe(4);
  });

  it('returns true if ship has sunk', () => {
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    expect(carrier.isSunk()).toBe(true);
  });

  it('returns false if ship is NOT sunk', () => {
    carrier.hit();
    carrier.hit();
    carrier.hit();
    expect(carrier.isSunk()).toBe(true);
  });
});
