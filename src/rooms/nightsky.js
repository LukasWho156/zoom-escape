import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import nightsky0 from '../assets/rooms/nightsky-0.png';
import nightsky1 from '../assets/rooms/nightsky-1.png';
import nightsky2 from '../assets/rooms/nightsky-2.png';

const Nightsky = new Room(
   'nightsky',
   nightsky0,
   nightsky1,
   nightsky2,
   [{
       target: 'moon',
       open: true,
       position: { x: 0.4375, y: 0.6875},
   }, ],
   [{
       sprite: SPRITES['seed'],
       x: 303,
       y: 159,
   }, ]
);

export { Nightsky };