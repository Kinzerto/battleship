export class Gameboard {
  constructor() {
    this.matrix = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.hit = new Set();
    this.missed = new Set();
    this.isGameOver = false;
    this.army = [];
  }

  placeShip(ship, x, y, orientation) {
    if (x >= 10 || y >= 10 || x < 0 || y < 0) return false;

    // IF ORIENTATION IS VERTICAL(V)
    if (orientation === 'V') {
      // CHECKS SHIP IF IT OVERLAP VERTICALLY FROM THE BOARD. IF TRUE STOP OPERATION
      if (ship.length + x > 10) return false;

      //CHECKS IF THE SHIP WILL OVERLAP TO OTHER SHIPS.IF TRUE STOPS OPERATION
      for (let i = 0; i < ship.length; i++) {
        const tmp = this.matrix[x + i][y];
        if (tmp) return false;
      }

      // PLACE SHIP IF IT FITS IN THE BOARD
      for (let i = 0; i < ship.length; i++) {
        this.matrix[x + i][y] = ship;
      }

      // PUT THE SHIP IN OBJECT(this.army) FOR TRACKING DAMAGE AND IF IT HAS SUNKED
      this.army.push(ship);
      return true;
      /*===============================================================================*/
      // IF ORIENTATION IS HORIZONTALLY(H)
    } else if (orientation === 'H') {
      // CHECKS SHIP IF IT OVERLAP HORIZONTALLY FROM THE BOARD. IF TRUE STOP OPERATION
      if (ship.length + y > 10) return false;

      //CHECKS IF THE SHIP WILL OVERLAP TO OTHER SHIPS.IF TRUE STOPS OPERATION
      for (let i = 0; i < ship.length; i++) {
        const tmp = this.matrix[x][y + i];
        if (tmp) return false;
      }

      // PLACE SHIP IF IT FITS IN THE BOARD
      for (let i = 0; i < ship.length; i++) {
        this.matrix[x][y + i] = ship;
      }

      // PUT THE SHIP IN OBJECT(this.army) FOR TRACKING DAMAGE AND IF IT HAS SUNKED
      this.army.push(ship);
      return true;
    }
  }

  // Checks if any cell surrounding (row, column), including diagonals, has a ship
  hasAdjacentShip(row, column) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = row + dx;
        const ny = column + dy;

        if (nx < 0 || nx > 9 || ny < 0 || ny > 9) continue;
        if (this.matrix[nx][ny]) return true;
      }
    }
    return false;
  }

  // Checks whether a ship can be placed at (x, y) with at least 1 empty cell of spacing
  // around it (used for random placement so ships never touch, even diagonally)
  canPlaceWithSpacing(ship, x, y, orientation) {
    if (x >= 10 || y >= 10 || x < 0 || y < 0) return false;

    for (let i = 0; i < ship.length; i++) {
      const row = orientation === 'V' ? x + i : x;
      const column = orientation === 'H' ? y + i : y;

      if (row >= 10 || column >= 10) return false;
      if (this.hasAdjacentShip(row, column)) return false;
    }

    return true;
  }

  // RECIEVING ATTACK IN BOARD
  receiveAttack(x, y) {
    if (x > 9 || y > 9 || x < 0 || y < 0) return null;
    if (this.isGameOver) return;

    const tmpCoordinates = `${x},${y}`;

    if (this.hit.has(tmpCoordinates) || this.missed.has(tmpCoordinates))
      return null;

    let shot = this.matrix[x][y];

    if (shot) {
      shot.hit();

      if (this.army.every((ship) => ship.isSunk() === true)) {
        this.isGameOver = true;
      }

      this.hit.add(tmpCoordinates);
      return { hit: 'hit', shot };
    }

    this.missed.add(`${x},${y}`);

    return 'miss';
  }
}
