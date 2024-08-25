import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import mucosa0 from '../assets/rooms/mucosa-0.png';
import mucosa1 from '../assets/rooms/mucosa-1.png';
import mucosa2 from '../assets/rooms/mucosa-2.png';

const Mucosa = new Room(
   'mucosa',
   mucosa0,
   mucosa1,
   mucosa2,
   [{
       target: 'cell',
       open: true,
       position: { x: 0.4375, y: 0.4375},
   }, ],
   []
);

export { Mucosa };