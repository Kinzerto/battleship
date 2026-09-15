import { renderBoard } from '../render/render-board.js';
import { checkShipPlaced, manual } from './manualPlaceShip.js';
import { activePlayer } from './players.js';

export function resetShips() {
  activePlayer.player.resetGameboard();
  activePlayer.boardContainer.classList.remove('hidden');

  renderBoard(activePlayer.player, activePlayer.boardContainer);

  manual(activePlayer.player, activePlayer.berthContainer);
  // checkShipPlaced();

  console.log(activePlayer.player.gameboard);
}
