import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import flower0 from '../assets/rooms/flower-0.png';
import flower1 from '../assets/rooms/flower-1.png';
import flower2 from '../assets/rooms/flower-2.png';

const Flower = new Room(
   'flower',
   flower0,
   flower1,
   flower2,
   [],
   []
);

export { Flower };