export class Ship {
  constructor(length) {
    this.length = length;
    this.damage = 0;
  }

  hit() {
    if (this.damage >= this.length) return;
    this.damage++;
  }

  isSunk() {
    return this.damage >= this.length;
  }
}
