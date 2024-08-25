import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import pc0 from '../assets/rooms/pc-0.png';
import pc1 from '../assets/rooms/pc-1.png';
import pc2 from '../assets/rooms/pc-2.png';

const Pc = new Room(
   'pc',
   pc0,
   pc1,
   pc2,
   [],
   [{
       sprite: SPRITES['keyboard'],
       x: 128,
       y: 71,
   }, ]
);

export { Pc };