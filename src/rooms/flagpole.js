import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import flagpole0 from '../assets/rooms/flagpole-0.png';
import flagpole1 from '../assets/rooms/flagpole-1.png';
import flagpole2 from '../assets/rooms/flagpole-2.png';

const Flagpole = new Room(
   'flagpole',
   flagpole0,
   flagpole1,
   flagpole2,
   [],
   [{
       sprite: SPRITES['flag'],
       x: 135,
       y: 222,
   }, ]
);

export { Flagpole };