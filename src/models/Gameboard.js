export class Gameboard {
  constructor() {
    this.matrix = Array.from({ length: 10 }, () => Array(10).fill(0));
  }
}

const game = new Gameboard();
console.log(game.matrix);
