import './css/reset.scss';
import './css/style.scss';

import { enablePlayerAttacks } from './controllers/playerTurn.js';
import { computer } from './controllers/computer.js';
import { P1, P2 } from './controllers/players.js';
import { turn } from './controllers/turn.js';

enablePlayerAttacks(P2);

if (turn === 'P2') {
  computer(P1);
}
