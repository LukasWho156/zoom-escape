import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import nose0 from '../assets/rooms/nose-0.png';
import nose1 from '../assets/rooms/nose-1.png';
import nose2 from '../assets/rooms/nose-2.png';

const Nose = new Room(
   'nose',
   nose0,
   nose1,
   nose2,
   [{
       target: 'nostril',
       open: true,
       position: { x: 0.5625, y: 0.4375},
   }, ],
   []
);

export { Nose };