import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import boat0 from '../assets/rooms/boat-0.png';
import boat1 from '../assets/rooms/boat-1.png';
import boat2 from '../assets/rooms/boat-2.png';

const Boat = new Room(
   'boat',
   boat0,
   boat1,
   boat2,
   [],
   [{
       sprite: SPRITES['water'],
       x: 0,
       y: 0,
   }, {
       sprite: SPRITES['fishing-rod'],
       x: 12,
       y: 120,
   }, ]
);

export { Boat };