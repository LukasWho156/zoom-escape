import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import binocular0 from '../assets/rooms/binocular-0.png';
import binocular1 from '../assets/rooms/binocular-1.png';
import binocular2 from '../assets/rooms/binocular-2.png';

const Binocular = new Room(
   'binocular',
   binocular0,
   binocular1,
   binocular2,
   [{
       target: 'boat',
       open: true,
       position: { x: 0.8125, y: 0.5625},
   }, ],
   []
);

export { Binocular };