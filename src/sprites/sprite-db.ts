import { Sprite } from "./sprite";

const SPRITES = {

    'bucket': new Sprite('bucket', {active: false, onClick: gameState => {
        gameState.deactivateSprite('bucket');
        gameState.collectItem('bucket');
        gameState.sfx('collect');
        gameState.saveGame();
    }}),

    'cat-awake': new Sprite('cat-awake', {active: false, onClick: gameState => {
        gameState.sfx('purr');
    }}),

    'cat-sleeping': new Sprite('cat-sleeping', {onClick: gameState => {
        if(gameState.inventory.selectedItem !== 'fish') {
            gameState.sfx('meow');
            return;
        }
        gameState.loseItem('fish');
        gameState.deactivateSprite('cat-sleeping');
        gameState.activateSprite('cat-awake');
        gameState.openExit('lobby', 'painting');
        gameState.sfx('meow');
        gameState.saveGame();
    }}),

    'code': new Sprite('code'),

    'crowbar': new Sprite('crowbar', {onClick: gameState => {
        gameState.deactivateSprite('crowbar');
        gameState.collectItem('crowbar');
        gameState.sfx('collect');
        gameState.saveGame();
    }}),

    'darkness': new Sprite('darkness', {onClick: gameState => {
        if(gameState.inventory.selectedItem === 'wood') {
            gameState.loseItem('wood');
            gameState.activateSprite('fire');
            gameState.saveGame();
            gameState.sfx('collect');
            return;
        }
        if(gameState.getSpriteState('fire') === 0 && gameState.inventory.selectedItem === 'matches') {
            gameState.loseItem('matches');
            gameState.deactivateSprite('darkness');
            gameState.setSpriteState('fire', 1);
            gameState.openExit('cave', 'cavepainting');
            gameState.saveGame();
            gameState.sfx('fire');
            return;
        }
        gameState.sfx('incorrect');
    }}),

    'door': new Sprite('door', {onClick: gameState => {
        gameState.queryInput().then((res: string) => {
            if (res === "738") {
                gameState.deactivateSprite("door");
                gameState.openExit('settlement', 'lobby')
                gameState.dispatchEvent(new CustomEvent('win'));
            } else {}
        })
    }}),

    'fire': new Sprite('fire', { active: false , onClick: gameState => {
        if(gameState.getSpriteState('fire') === 0) {
            if(gameState.inventory.selectedItem !== 'matches') {
                gameState.sfx('incorrect');
                return;
            }
            gameState.deactivateSprite('darkness');
            gameState.setSpriteState('fire', 1);
            gameState.openExit('cave', 'cavepainting');
            gameState.saveGame();
            gameState.sfx('fire');
        }
    }}),

    'fishing-line': new Sprite('fishing-line', {onClick: gameState => {
        gameState.deactivateSprite('fishing-line');
        gameState.collectItem('fishing-line');
        gameState.sfx('collect');
        gameState.saveGame();
    }}),

    'fishing-rod': new Sprite('fishing-rod', {onClick: gameState => {
        const state = gameState.getSpriteState('fishing-rod');
        if(state === 0 && gameState.inventory.selectedItem === 'bait') {
            gameState.setSpriteState('fishing-rod', 1);
            gameState.loseItem('bait');
            gameState.sfx('collect');
            gameState.saveGame();
            return;
        }
        if(state === 1) {
            gameState.setSpriteState('fishing-rod', 2);
            gameState.collectItem('fish');
            gameState.sfx('fishing-rod');
            gameState.saveGame();
            return;
        }
        if(state < 2) {
            gameState.sfx('incorrect');
        }
    }}),

    'flag': new Sprite('flag', {onClick: gameState => {
        gameState.deactivateSprite('flag');
        gameState.collectItem('fabric');
        gameState.sfx('collect');
        gameState.saveGame();
    }}),

    'flowerpot': new Sprite('flowerpot', {onClick: gameState => {
        const state = gameState.getSpriteState('flowerpot');
        if(state === 0 && gameState.inventory.selectedItem === 'seed') {
            gameState.setSpriteState('flowerpot', 1);
            gameState.loseItem('seed');
            gameState.sfx('collect');
            gameState.saveGame();
            return;
        }
        if(state === 1 && gameState.inventory.selectedItem === 'bucket-full') {
            gameState.setSpriteState('flowerpot', 2);
            gameState.loseItem('bucket-full');
            gameState.openExit('tree', 'flower');
            gameState.sfx('watering');
            gameState.saveGame();
            return;
        }
        if(state < 2) {
            gameState.sfx('incorrect');
        }
    }}),

    'girl': new Sprite('girl', {onClick: gameState => {
        gameState.setSpriteState('girl', 1);
        gameState.sfx('seven');
        gameState.saveGame();
    }}),

    'goop': new Sprite('goop', {onClick: gameState => {
        if(gameState.inventory.selectedItem !== 'fabric') {
            gameState.sfx('incorrect');
            return;
        }
        gameState.deactivateSprite('goop');
        gameState.loseItem('fabric');
        gameState.openExit('mouse', 'nose');
        gameState.sfx('nose-blow');
        gameState.saveGame();
    }}),

    'keyboard': new Sprite('keyboard', {onClick: gameState => {
        gameState.queryInput().then((res: string) => {
            if (res.toLowerCase() === "cattag") {
                gameState.deactivateSprite("lid");
                gameState.openExit('subwindow', 'binocular')
                gameState.sfx('progress');
                gameState.saveGame();
            } else {
                gameState.sfx('incorrect');
            }
        })
    }}),

    'lid': new Sprite('lid'),

    'matches': new Sprite('matches', {onClick: gameState => {
        gameState.deactivateSprite('matches');
        gameState.collectItem('matches');
        gameState.sfx('collect');
        gameState.saveGame();
    }}),

    'painted-three': new Sprite('painted-three'),

    'seed': new Sprite('seed', {onClick: gameState => {
        gameState.deactivateSprite('seed');
        gameState.collectItem('seed');
        gameState.sfx('collect');
        gameState.saveGame();
    }}),

    'water': new Sprite('water', {onClick: gameState => {
        if(gameState.inventory.selectedItem !== 'bucket') {
            return;
        }
        gameState.loseItem('bucket');
        gameState.collectItem('bucket-full');
        gameState.sfx('watering');
        gameState.saveGame();
    }}),

    'well-rope': new Sprite('well-rope', { onClick: gameState => {
        if(gameState.getSpriteState('well-rope') !== 0) {
            return;
        }
        gameState.setSpriteState('well-rope', 1);
        gameState.activateSprite('bucket');
        gameState.saveGame();
    }}),

    'woodboards': new Sprite('woodboards', { onClick: gameState => {
        if(gameState.inventory.selectedItem !== 'crowbar') {
            gameState.sfx('incorrect');
            return;
        }
        const state = gameState.getSpriteState('woodboards');
        if(state === 2) {
            gameState.deactivateSprite('woodboards');
            gameState.loseItem('crowbar');
            gameState.collectItem('wood');
            gameState.openExit('lobby', 'nightsky');
        } else {
            gameState.setSpriteState('woodboards', state + 1);
        }
        gameState.sfx('hammer');
        gameState.saveGame();
    }}),

    'worm': new Sprite('worm', {onClick: gameState => {
        gameState.deactivateSprite('worm');
        gameState.collectItem('worm');
        gameState.sfx('collect');
    }}),

}

export { SPRITES }