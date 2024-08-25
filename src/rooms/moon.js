import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import moon0 from '../assets/rooms/moon-0.png';
import moon1 from '../assets/rooms/moon-1.png';
import moon2 from '../assets/rooms/moon-2.png';

const Moon = new Room(
   'moon',
   moon0,
   moon1,
   moon2,
   [{
       target: 'lunarsurface',
       open: true,
       position: { x: 0.4375, y: 0.9375},
   }, ],
   []
);

export { Moon };