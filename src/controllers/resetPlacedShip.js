import { renderBoard } from '../render/render-board.js';
import { manual } from './manualPlaceShip.js';
import { activePlayer, status } from './players.js';

export function resetShips() {
  activePlayer.player.resetGameboard();
  activePlayer.boardContainer.classList.remove('hidden');

  renderBoard(activePlayer.player, activePlayer.boardContainer);

  manual(activePlayer.player, activePlayer.berthContainer);

  status.textContent = `Drag a ship onto the board. Right-click a ship to rotate.`;
}
