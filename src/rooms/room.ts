import { THREE, Game } from "luthe-amp/lib/index";
import { Sprite } from "../sprites/sprite";
import { MouseInteractionSystem } from "luthe-amp/lib/input/mouse-interaction-system";
import { GameState } from "../game-state";

type Exit = {
    target: string,
    open: boolean,
    position: {
        x: number,
        y: number,
    }
}

type PositionedSprite = {
    sprite: Sprite,
    x: number,
    y: number,
}

class Room {

    readonly id: string;
    
    private file0: string;
    private file1: string;
    private file2: string;

    readonly exits: Exit[];
    readonly sprites: PositionedSprite[];

    readonly spriteGroup = new THREE.Group();

    private _loaded = false;
    get loaded() {
        return this._loaded;
    }
    private shouldUnload = false;
    private loadPromise?: Promise<void>;
    
    private groupInited = false;

    constructor(id: string, file0: string, file1: string, file2: string, exits: Exit[], sprites: PositionedSprite[]) {
        this.id = id;
        this.file0 = file0;
        this.file1 = file1;
        this.file2 = file2;
        this.exits = exits;
        this.sprites = sprites ?? [];
    }

    private setupSpriteGroup = (mis: MouseInteractionSystem, gameState: GameState) => {
        for(const sprite of Object.values(this.sprites)) {
            const s = sprite.sprite.instantiate(mis, gameState);
            s.setPosition(sprite.x * 2, sprite.y * 2, 2);
            this.spriteGroup.add(s);
        }
        this.groupInited = true;
    }

    enter = () => {
        for(const sprite of this.sprites) {
            sprite.sprite.setInteractionEnabled(true);
        }
    }

    leave = () => {
        for(const sprite of this.sprites) {
            sprite.sprite.setInteractionEnabled(false);
        }
    }

    load = (mis: MouseInteractionSystem, gameState: GameState) => {
        if(!this.groupInited) {
            this.setupSpriteGroup(mis, gameState);
        }
        this.spriteGroup.visible = true;
        this.shouldUnload = false;
        if(this._loaded) {
            return;
        }
        this.loadPromise = Promise.all([
            Game.loadTexture(this.file0, `${this.id}0`),
            Game.loadTexture(this.file1, `${this.id}2`),
            Game.loadTexture(this.file2, `${this.id}1`),
        ]).then(() => {
            this._loaded = true;
            this.loadPromise = null;
            if(this.shouldUnload) {
                this.unload();
            }
        });
        return this.loadPromise;
    }

    unload = () => {
        this.spriteGroup.visible = false;
        if(this._loaded) {
            Game.unloadTexture(`${this.id}0`);
            Game.unloadTexture(`${this.id}2`);
            Game.unloadTexture(`${this.id}1`);
            this._loaded = false;
        } else {
            this.shouldUnload = true;
        }
    }

    findExit = (x: number, y: number, zoomLevel?: number, offset?: {x: number, y: number}) => {
        if(!!zoomLevel && !!offset) {
            const zoom = Math.pow(2, zoomLevel);
            x = (zoom - 1) * offset.x + x / zoom;
            y = (zoom - 1) * offset.y + y / zoom;
            console.log('offsetted thingy', x, y);
        }
        let closest: Exit = null;
        let closestDistance: number = null;
        for(const exit of this.exits) {
            if(!exit.open) {
                continue;
            }
            const dist = (x - exit.position.x) * (x - exit.position.x) + (y - exit.position.y) * (y - exit.position.y);
            if(closestDistance !== null) {
                if(dist >= closestDistance) {
                    continue;
                }
            }
            closest = exit;
            closestDistance = dist;
        }
        return closest;
    }

    findExitTo = (room: string) => {
        for(const exit of this.exits) {
            if(exit.open && exit.target === room) {
                return exit;
            }
        }
        return null;
    }

}

export { Room, Exit }