import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import knothole0 from '../assets/rooms/knothole-0.png';
import knothole1 from '../assets/rooms/knothole-1.png';
import knothole2 from '../assets/rooms/knothole-2.png';

const Knothole = new Room(
   'knothole',
   knothole0,
   knothole1,
   knothole2,
   [{
       target: 'cave',
       open: true,
       position: { x: 0.5625, y: 0.5625},
   }, ],
   []
);

export { Knothole };