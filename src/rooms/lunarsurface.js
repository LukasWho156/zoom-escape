import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import lunarsurface0 from '../assets/rooms/lunarsurface-0.png';
import lunarsurface1 from '../assets/rooms/lunarsurface-1.png';
import lunarsurface2 from '../assets/rooms/lunarsurface-2.png';

const Lunarsurface = new Room(
   'lunarsurface',
   lunarsurface0,
   lunarsurface1,
   lunarsurface2,
   [{
       target: 'tree',
       open: true,
       position: { x: 0.6875, y: 0.5625},
   }, {
       target: 'settlement',
       open: true,
       position: { x: 0.4375, y: 0.6875},
   }, ],
   []
);

export { Lunarsurface };