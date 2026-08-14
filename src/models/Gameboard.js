export class Gameboard {
  constructor() {
    this.matrix = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.coordinates = new Set();
    this.isGameOver = false;
    this.army = [];
    this.missedAttacks = [];
  }

  placeShip(ship, x, y, orientation) {
    if (x >= 10 || y >= 10 || x < 0 || y < 0) return null;

    // IF ORIENTATION IS VERTICAL(V)
    if (orientation === 'V') {
      // CHECKS SHIP IF IT OVERLAP VERTICALLY FROM THE BOARD. IF TRUE STOP OPERATION
      if (ship.length + x > 10) return null;

      //CHECKS IF THE SHIP WILL OVERLAP TO OTHER SHIPS.IF TRUE STOPS OPERATION
      for (let i = 0; i < ship.length; i++) {
        const tmp = this.matrix[x + i][y];
        if (tmp) return null;
      }

      // PLACE SHIP IF IT FITS IN THE BOARD
      for (let i = 0; i < ship.length; i++) {
        this.matrix[x + i][y] = ship;
      }

      // PUT THE SHIP IN OBJECT(this.army) FOR TRACKING DAMAGE AND IF IT HAS SUNKED
      this.army.push(ship);

      /*===============================================================================*/
      // IF ORIENTATION IS HORIZONTALLY(H)
    } else if (orientation === 'H') {
      // CHECKS SHIP IF IT OVERLAP HORIZONTALLY FROM THE BOARD. IF TRUE STOP OPERATION
      if (ship.length + y > 10) return null;

      //CHECKS IF THE SHIP WILL OVERLAP TO OTHER SHIPS.IF TRUE STOPS OPERATION
      for (let i = 0; i < ship.length; i++) {
        const tmp = this.matrix[x][y + i];
        if (tmp) return null;
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

  // RECIEVING ATTACK IN BOARD
  receiveAttack(x, y) {
    if (x > 9 || y > 9 || x < 0 || y < 0) return;

    // IF this.isGameOver IS TRUE CANCEL THE OPERATION BELOW
    if (this.isGameOver) return;

    //TRACKS ATTACK MARKS ON THE BOARD TO PREVENT ATTACKING TWICE OR MORE ON THE SAME COORDINATES
    const tmpCoordinates = `${x},${y}`;

    if (this.coordinates.has(tmpCoordinates)) return null;

    let shot = this.matrix[x][y];

    //IF THE SHOT DIRECTED IN A SHIP OBJECT RUN THE CODE BELLOW
    if (shot) {
      // +1 DAMAGE ON SHIP
      shot.hit();

      // IF ALL THE SHIP SUNKED DISPLAY GAMEOVER AND CHANGE this.isGameOver to TRUE;
      if (this.army.every((ship) => ship.isSunk() === true)) {
        this.isGameOver = true;
      }

      this.coordinates.add(tmpCoordinates);
      return 'hit';
    }

    this.missedAttacks.push([+x, +y]);
    this.coordinates.add(tmpCoordinates);

    return 'miss';
  }
}
