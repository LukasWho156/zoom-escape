import { Game, GameScreen } from 'luthe-amp';
import { connectWS } from 'luthe-amp/lib/util/connect-ws';
import { makeLoadScreen } from './screens/load-screen.ts';

import bucket from './assets/sprites/bucket.png';
import catAwake from './assets/sprites/cat-awake.png';
import catSleeping from './assets/sprites/cat-sleeping.png';
import code from './assets/sprites/code.png';
import crowbar from './assets/sprites/crowbar.png';
import darkness from './assets/sprites/darkness.png';
import door from './assets/sprites/door.png';
import fire from './assets/sprites/fire.png';
import fishingLine from './assets/sprites/fishing-line.png';
import fishingRod from './assets/sprites/fishing-rod.png';
import flag from './assets/sprites/flag.png';
import flowerpot from './assets/sprites/flowerpot.png';
import girl from './assets/sprites/girl.png';
import goop from './assets/sprites/goop.png';
import keyboard from './assets/sprites/keyboard.png';
import lid from './assets/sprites/lid.png';
import matches from './assets/sprites/matches.png';
import paintedThree from './assets/sprites/painted-three.png';
import seed from './assets/sprites/seed.png';
import wellRope from './assets/sprites/well-rope.png';
import water from './assets/sprites/water.png';
import woodboards from './assets/sprites/woodboards.png';
import worm from './assets/sprites/worm.png';

import inventoryBg from './assets/inventory-bg.png'
import items from './assets/items.png'
import startBg from './assets/start-bg.png';
import button from './assets/button.png';
import btNewGame from './assets/bt-new-game.png';
import btContinue from './assets/bt-continue.png';
import btSettings from './assets/bt-settings.png';
import play from './assets/play.png';
import settings from './assets/settings.png';

import sfxSoundtrack from './assets/sfx/soundtrack.mp3';
import sfxCollect from './assets/sfx/collect.mp3';
import sfxFire from './assets/sfx/fire.mp3';
import sfxFishingRod from './assets/sfx/fishing-rod.mp3';
import sfxFlag from './assets/sfx/flag.mp3';
import sfxHammer from './assets/sfx/hammer.mp3';
import sfxIncorrect from './assets/sfx/incorrect.mp3';
import sfxMatch from './assets/sfx/match.mp3';
import sfxMeow from './assets/sfx/meow.mp3';
import sfxNoseBlow from './assets/sfx/nose-blow.mp3';
import sfxProgress from './assets/sfx/progress.mp3';
import sfxPurr from './assets/sfx/purr.mp3';
import sfxSeven from './assets/sfx/seven.mp3';
import sfxWatering from './assets/sfx/watering.mp3';

import font from './assets/font.ttf';

import config from './config.json';

async function main() {

    Game.init(config);

    const curSettings = Game.loadFromStorage('settings');
    Game.userData.settings =  {
        musicVolume: curSettings.musicVolume ?? 0.7,
        soundVolume: curSettings.soundVolume ?? 1.0,
        mouseSensitivity: curSettings.mouseSensitivity ?? 0.0025,
    };
    Game.userData.font = font;

    await Game.loadTexture(play, 'play');

    const promises = [
        Game.loadTexture(inventoryBg, 'inventory-bg'),
        Game.loadTexture(items, 'items', { framesX: 4, framesY: 3 }),
        Game.loadTexture(startBg, 'start-bg'),
        Game.loadTexture(button, 'button', { framesY: 2 }),
        Game.loadTexture(btContinue, 'bt-continue'),
        Game.loadTexture(btNewGame, 'bt-new-game'),
        Game.loadTexture(btSettings, 'bt-settings'),
        Game.loadTexture(settings, 'settings'),

        Game.loadTexture(bucket, 'sprite-bucket'),
        Game.loadTexture(catAwake, 'sprite-cat-awake'),
        Game.loadTexture(catSleeping, 'sprite-cat-sleeping'),
        Game.loadTexture(code, 'sprite-code'),
        Game.loadTexture(crowbar, 'sprite-crowbar'),
        Game.loadTexture(darkness, 'sprite-darkness'),
        Game.loadTexture(door, 'sprite-door'),
        Game.loadTexture(fire, 'sprite-fire', { framesX: 2 }),
        Game.loadTexture(fishingLine, 'sprite-fishing-line'),
        Game.loadTexture(fishingRod, 'sprite-fishing-rod', {framesX: 2, framesY: 2 }),
        Game.loadTexture(flowerpot, 'sprite-flowerpot', { framesX: 3 }),
        Game.loadTexture(flag, 'sprite-flag'),
        Game.loadTexture(girl, 'sprite-girl', { framesY: 2 }),
        Game.loadTexture(goop, 'sprite-goop'),
        Game.loadTexture(keyboard, 'sprite-keyboard'),
        Game.loadTexture(lid, 'sprite-lid'),
        Game.loadTexture(matches, 'sprite-matches'),
        Game.loadTexture(paintedThree, 'sprite-painted-three'),
        Game.loadTexture(seed, 'sprite-seed'),
        Game.loadTexture(water, 'sprite-water'),
        Game.loadTexture(wellRope, 'sprite-well-rope', { framesX: 2 }),
        Game.loadTexture(woodboards, 'sprite-woodboards', { framesX: 2, framesY: 2 }),
        Game.loadTexture(worm, 'sprite-worm'),

        Game.loadSound(sfxSoundtrack, {id: 'soundtrack', loop: true}),
        Game.loadSound(sfxCollect, {id: 'collect'}),
        Game.loadSound(sfxFire, {id: 'fire'}),
        Game.loadSound(sfxFishingRod, {id: 'fishing-rod'}),
        Game.loadSound(sfxFlag, {id: 'flag'}),
        Game.loadSound(sfxHammer, {id: 'hammer'}),
        Game.loadSound(sfxIncorrect, {id: 'incorrect'}),
        Game.loadSound(sfxMatch, {id: 'match'}),
        Game.loadSound(sfxMeow, {id: 'meow'}),
        Game.loadSound(sfxNoseBlow, {id: 'nose-blow'}),
        Game.loadSound(sfxProgress, {id: 'progress'}),
        Game.loadSound(sfxPurr, {id: 'purr'}),
        Game.loadSound(sfxSeven, {id: 'seven'}),
        Game.loadSound(sfxWatering, {id: 'watering'}),
    ];

    const loadScreen = makeLoadScreen(promises);
    
    Game.setActiveScreen(loadScreen);

    Game.start();

}

main();