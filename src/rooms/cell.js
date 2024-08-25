import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import cell0 from '../assets/rooms/cell-0.png';
import cell1 from '../assets/rooms/cell-1.png';
import cell2 from '../assets/rooms/cell-2.png';

const Cell = new Room(
   'cell',
   cell0,
   cell1,
   cell2,
   [{
       target: 'nucleus',
       open: true,
       position: { x: 0.4375, y: 0.6875},
   }, ],
   [{
       sprite: SPRITES['worm'],
       x: 386,
       y: 330,
   }, ]
);

export { Cell };