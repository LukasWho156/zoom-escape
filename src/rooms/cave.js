import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import cave0 from '../assets/rooms/cave-0.png';
import cave1 from '../assets/rooms/cave-1.png';
import cave2 from '../assets/rooms/cave-2.png';

const Cave = new Room(
   'cave',
   cave0,
   cave1,
   cave2,
   [{
       target: 'cavepainting',
       open: false,
       position: { x: 0.4375, y: 0.5625},
   }, ],
   [{
       sprite: SPRITES['darkness'],
       x: 22,
       y: 47,
   }, {
       sprite: SPRITES['fire'],
       x: 205,
       y: 97,
   }, ]
);

export { Cave };