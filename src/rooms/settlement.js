import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import settlement0 from '../assets/rooms/settlement-0.png';
import settlement1 from '../assets/rooms/settlement-1.png';
import settlement2 from '../assets/rooms/settlement-2.png';

const Settlement = new Room(
   'settlement',
   settlement0,
   settlement1,
   settlement2,
   [{
       target: 'well',
       open: true,
       position: { x: 0.1875, y: 0.4375},
   }, {
       target: 'flagpole',
       open: true,
       position: { x: 0.8125, y: 0.4375},
   }, {
       target: 'lobby',
       open: false,
       position: { x: 0.4375, y: 0.4375},
   }, ],
   [{
       sprite: SPRITES['door'],
       x: 180,
       y: 164,
   }, ]
);

export { Settlement };