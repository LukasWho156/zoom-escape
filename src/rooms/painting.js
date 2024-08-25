import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import painting0 from '../assets/rooms/painting-0.png';
import painting1 from '../assets/rooms/painting-1.png';
import painting2 from '../assets/rooms/painting-2.png';

const Painting = new Room(
   'painting',
   painting0,
   painting1,
   painting2,
   [],
   [{
       sprite: SPRITES['girl'],
       x: 22,
       y: 188,
   }, ]
);

export { Painting };