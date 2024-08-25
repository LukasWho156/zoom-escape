import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import mousehole0 from '../assets/rooms/mousehole-0.png';
import mousehole1 from '../assets/rooms/mousehole-1.png';
import mousehole2 from '../assets/rooms/mousehole-2.png';

const Mousehole = new Room(
   'mousehole',
   mousehole0,
   mousehole1,
   mousehole2,
   [{
       target: 'mouse',
       open: true,
       position: { x: 0.6875, y: 0.1875},
   }, ],
   []
);

export { Mousehole };