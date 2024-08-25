import { Room } from './room.ts'
import { SPRITES } from '../sprites/sprite-db.ts'

import lobby0 from '../assets/rooms/lobby-0.png';
import lobby1 from '../assets/rooms/lobby-1.png';
import lobby2 from '../assets/rooms/lobby-2.png';

const Lobby = new Room(
   'lobby',
   lobby0,
   lobby1,
   lobby2,
   [{
       target: 'painting',
       open: false,
       position: { x: 0.6875, y: 0.6875},
   }, {
       target: 'mousehole',
       open: true,
       position: { x: 0.6875, y: 0.1875},
   }, {
       target: 'nightsky',
       open: false,
       position: { x: 0.1875, y: 0.6875},
   }, ],
   [{
       sprite: SPRITES['cat-sleeping'],
       x: 279,
       y: 291,
   }, {
       sprite: SPRITES['cat-awake'],
       x: 95,
       y: 23,
   }, {
       sprite: SPRITES['woodboards'],
       x: 17,
       y: 217,
   }, ]
);

export { Lobby };