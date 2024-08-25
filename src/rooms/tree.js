import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import tree0 from '../assets/rooms/tree-0.png';
import tree1 from '../assets/rooms/tree-1.png';
import tree2 from '../assets/rooms/tree-2.png';

const Tree = new Room(
   'tree',
   tree0,
   tree1,
   tree2,
   [{
       target: 'knothole',
       open: true,
       position: { x: 0.4375, y: 0.4375},
   }, {
       target: 'flower',
       open: false,
       position: { x: 0.8125, y: 0.4375},
   }, ],
   [{
       sprite: SPRITES['flowerpot'],
       x: 355,
       y: 88,
   }, ]
);

export { Tree };