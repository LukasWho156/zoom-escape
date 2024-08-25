import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import nucleolus0 from '../assets/rooms/nucleolus-0.png';
import nucleolus1 from '../assets/rooms/nucleolus-1.png';
import nucleolus2 from '../assets/rooms/nucleolus-2.png';

const Nucleolus = new Room(
   'nucleolus',
   nucleolus0,
   nucleolus1,
   nucleolus2,
   [{
       target: 'dna',
       open: true,
       position: { x: 0.3125, y: 0.3125},
   }, ],
   []
);

export { Nucleolus };