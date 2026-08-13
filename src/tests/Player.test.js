import { Player } from '../models/Player.js';

describe('Test Player class', () => {
  test('player has a default name', () => {
    const player = new Player();

    expect(player.name).toBe('Player');
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
});
