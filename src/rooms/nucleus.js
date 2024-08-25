import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import nucleus0 from '../assets/rooms/nucleus-0.png';
import nucleus1 from '../assets/rooms/nucleus-1.png';
import nucleus2 from '../assets/rooms/nucleus-2.png';

const Nucleus = new Room(
   'nucleus',
   nucleus0,
   nucleus1,
   nucleus2,
   [{
       target: 'nucleolus',
       open: true,
       position: { x: 0.6875, y: 0.5625},
   }, ],
   []
);

export { Nucleus };