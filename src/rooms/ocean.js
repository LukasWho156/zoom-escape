import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import ocean0 from '../assets/rooms/ocean-0.png';
import ocean1 from '../assets/rooms/ocean-1.png';
import ocean2 from '../assets/rooms/ocean-2.png';

const Ocean = new Room(
   'ocean',
   ocean0,
   ocean1,
   ocean2,
   [{
       target: 'submarine',
       open: true,
       position: { x: 0.5625, y: 0.3125},
   }, ],
   []
);

export { Ocean };