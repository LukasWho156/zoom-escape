import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import nostril0 from '../assets/rooms/nostril-0.png';
import nostril1 from '../assets/rooms/nostril-1.png';
import nostril2 from '../assets/rooms/nostril-2.png';

const Nostril = new Room(
   'nostril',
   nostril0,
   nostril1,
   nostril2,
   [{
       target: 'mucosa',
       open: true,
       position: { x: 0.6875, y: 0.6875},
   }, ],
   [{
       sprite: SPRITES['matches'],
       x: 145,
       y: 125,
   }, ]
);

export { Nostril };