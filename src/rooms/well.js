import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import well0 from '../assets/rooms/well-0.png';
import well1 from '../assets/rooms/well-1.png';
import well2 from '../assets/rooms/well-2.png';

const Well = new Room(
   'well',
   well0,
   well1,
   well2,
   [],
   [{
       sprite: SPRITES['bucket'],
       x: 399,
       y: 62,
   }, {
       sprite: SPRITES['well-rope'],
       x: 245,
       y: 183,
   }, ]
);

export { Well };