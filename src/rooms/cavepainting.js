import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import cavepainting0 from '../assets/rooms/cavepainting-0.png';
import cavepainting1 from '../assets/rooms/cavepainting-1.png';
import cavepainting2 from '../assets/rooms/cavepainting-2.png';

const Cavepainting = new Room(
   'cavepainting',
   cavepainting0,
   cavepainting1,
   cavepainting2,
   [{
       target: 'ocean',
       open: true,
       position: { x: 0.3125, y: 0.3125},
   }, ],
   [{
       sprite: SPRITES['painted-three'],
       x: 434,
       y: 316,
   }, ]
);

export { Cavepainting };