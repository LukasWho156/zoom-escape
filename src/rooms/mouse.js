import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import mouse0 from '../assets/rooms/mouse-0.png';
import mouse1 from '../assets/rooms/mouse-1.png';
import mouse2 from '../assets/rooms/mouse-2.png';

const Mouse = new Room(
   'mouse',
   mouse0,
   mouse1,
   mouse2,
   [{
       target: 'nose',
       open: false,
       position: { x: 0.4375, y: 0.4375},
   }, ],
   [{
       sprite: SPRITES['crowbar'],
       x: 352,
       y: 120,
   }, {
       sprite: SPRITES['goop'],
       x: 204,
       y: 202,
   }, ]
);

export { Mouse };