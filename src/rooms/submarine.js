import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import submarine0 from '../assets/rooms/submarine-0.png';
import submarine1 from '../assets/rooms/submarine-1.png';
import submarine2 from '../assets/rooms/submarine-2.png';

const Submarine = new Room(
   'submarine',
   submarine0,
   submarine1,
   submarine2,
   [{
       target: 'subwindow',
       open: true,
       position: { x: 0.3125, y: 0.5625},
   }, ],
   []
);

export { Submarine };