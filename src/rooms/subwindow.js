import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import subwindow0 from '../assets/rooms/subwindow-0.png';
import subwindow1 from '../assets/rooms/subwindow-1.png';
import subwindow2 from '../assets/rooms/subwindow-2.png';

const Subwindow = new Room(
   'subwindow',
   subwindow0,
   subwindow1,
   subwindow2,
   [{
       target: 'binocular',
       open: false,
       position: { x: 0.3125, y: 0.6875},
   }, {
       target: 'pc',
       open: true,
       position: { x: 0.8125, y: 0.4375},
   }, ],
   [{
       sprite: SPRITES['lid'],
       x: 130,
       y: 335,
   }, ]
);

export { Subwindow };