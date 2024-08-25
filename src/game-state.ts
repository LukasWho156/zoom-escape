import { Game } from "luthe-amp/lib/index";
import { Inventory } from "./inventory";
import { Room } from "./rooms/room";
import { Sprite } from "./sprites/sprite";

class GameState extends EventTarget {

    private rooms: { [key: string]: Room };
    private sprites: { [key: string]: Sprite };
    readonly inventory: Inventory;

    private openedExits: {from: string, to: string}[] = [];

    constructor(rooms: { [key: string]: Room }, sprites: { [key: string]: Sprite }, inventory: Inventory) {
        super();
        this.rooms = rooms;
        this.sprites = sprites;
        this.inventory = inventory;
    }

    openExit = (from: string, to: string) => {
        const room = this.rooms[from];
        const exit = room?.exits.find(e => e.target === to);
        if(!exit) {
            return false;
        }
        exit.open = true;
        this.openedExits.push({from, to});
        return true;
    }

    closeExit = (from: string, to: string) => {
        const room = this.rooms[from];
        const exit = room?.exits.find(e => e.target === to);
        if(!exit) {
            return false;
        }
        exit.open = false;
        return true;
    }

    activateSprite = (sprite: string) => {
        if(!this.sprites[sprite]) {
            return false;
        }
        this.sprites[sprite].active = true;
        return true;
    }

    deactivateSprite = (sprite: string) => {
        if(!this.sprites[sprite]) {
            return false;
        }
        this.sprites[sprite].active = false;
        return true;
    }

    getSpriteState = (sprite: string) => {
        if(!this.sprites[sprite]) {
            return -1;
        }
        if(!this.sprites[sprite].active) {
            return -1;
        }
        return this.sprites[sprite].state;
    }

    setSpriteState = (sprite: string, value: number) => {
        if(!this.sprites[sprite]) {
            return false;
        }
        this.sprites[sprite].state = value;
        return true;
    }

    collectItem = (item: string) => {
        this.inventory.addItem(item);
    }

    loseItem = (item: string) => {
        this.inventory.remove(item);
    }

    queryInput = () => {
        const dialog = document.getElementById('queryDialog') as HTMLDialogElement;
        const input = document.getElementById('queryInput') as HTMLInputElement;
        input.value = '';
        dialog.showModal();
        return new Promise((resolve, reject) => {
            const query = () => {
                dialog.removeEventListener('close', query);
                resolve(input.value);
            }
            dialog.addEventListener('close', query);
        })
    }

    sfx = (id: string) => {
        Game.audio.playSound(id);
    }

    saveGame = () => {
        const save: any = {
            inventory: this.inventory.getItemList(),
            sprites: {},
            exits: this.openedExits,
        }
        for(const key in this.sprites) {
            save.sprites[key] = {
                active: this.sprites[key].active,
                state: this.sprites[key].state,
            }
        }
        Game.saveToStorage('progress', save);
    }

    loadGame = (progress: any) => {
        for(const item of progress.inventory) {
            this.inventory.addItem(item);
        }
        for(const exit of progress.exits) {
            this.openExit(exit.from, exit.to);
        }
        for(const key in progress.sprites) {
            this.sprites[key].active = progress.sprites[key].active;
            this.sprites[key].state = progress.sprites[key].state;
        }
    }

}

export { GameState };