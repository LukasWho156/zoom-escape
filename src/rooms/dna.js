import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import dna0 from '../assets/rooms/dna-0.png';
import dna1 from '../assets/rooms/dna-1.png';
import dna2 from '../assets/rooms/dna-2.png';

const Dna = new Room(
   'dna',
   dna0,
   dna1,
   dna2,
   [],
   [{
       sprite: SPRITES['fishing-line'],
       x: 58,
       y: 228,
   }, {
       sprite: SPRITES['code'],
       x: 45,
       y: 55,
   }, ]
);

export { Dna };