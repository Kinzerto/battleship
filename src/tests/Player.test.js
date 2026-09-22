import { Gameboard } from '../models/Gameboard.js';
import { Player } from '../models/Player.js';
import { Ship } from '../models/Ship.js';

describe('Test Player class', () => {
  test('player has a default name', () => {
    const player = new Player();

    expect(player.name).toBe('Computer');
  });

  test('player can have a custom name', () => {
    const player = new Player('Player 1');

    expect(player.name).toBe('Player 1');
  });

  test('each player has their own gameboard', () => {
    const player1 = new Player('Player 1');
    const player2 = new Player('Player 2');

    expect(player1.gameboard).not.toBe(player2.gameboard);
  });

  test('should initialize with a custom name when provided', () => {
    const player = new Player('Admiral');

    expect(player.name).toBe('Admiral');
  });

  test('lockShips() should set lock property to true', () => {
    const player = new Player();

    player.lockShips();

    expect(player.lock).toBe(true);
  });

  test('creates the correct ships', () => {
    const player = new Player();
    const ships = player.createShips();

    expect(ships).toHaveLength(5);

    expect(ships[0]).toBeInstanceOf(Ship);
    expect(ships[0].length).toBe(5);
    expect(ships[0].name).toBe('carrier');

    expect(ships[1].length).toBe(4);
    expect(ships[1].name).toBe('battleship');

    expect(ships[2].length).toBe(3);
    expect(ships[2].name).toBe('destroyer');

    expect(ships[3].length).toBe(3);
    expect(ships[3].name).toBe('submarine');

    expect(ships[4].length).toBe(2);
    expect(ships[4].name).toBe('patrol');
  });

  test('resets ship damage', () => {
    const player = new Player();

    // Damage a ship
    player.ships[0].hit();

    expect(player.ships[0].damage).toBe(1);

    // Reset
    player.resetShipDamage();

    // Damage should be reset
    expect(player.ships[0].damage).toBe(0);
  });
});
