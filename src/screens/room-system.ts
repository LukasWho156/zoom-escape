import { Game, System } from "luthe-amp/lib/index";
import { Exit, Room } from "../rooms/room";
import { MouseInteractionSystem } from "luthe-amp/lib/input/mouse-interaction-system";
import { GameState } from "../game-state";

class RoomSystem {

    private rooms;
    private activeRoom: Room;;
    private parentRoom?: Room;
    private parentExit?: Exit;
    private targetExit?: Exit;
    private zoomSpeed = 0.001;

    private spriteScene;
    private material;
    private mis;
    private gameState;

    private zoomLevel = 0;
    private _ready = false;
    get ready() {
        return this._ready;
    }

    private zoomBuffer = 0;
    private mouseBuffer = { x: 0, y: 0 };
    private targetOffset = { x: 0.5, y: 0.5 };
    private currentOffset = { x: 0.5, y: 0.5 }

    private _autoZoom = false;
    get autoZoom() {
        return this._autoZoom;
    }
    set autoZoom(value) {
        this._autoZoom = value;
        if(value && this.zoomLevel > 0 && this.zoomLevel <= 1) {
            this.zoomLevel = 0;
        }
    }

    constructor(rooms: {[key: string]: Room}, start: string, material: THREE.ShaderMaterial, spriteScene: THREE.Scene, mis: MouseInteractionSystem, gameState: GameState) {
        this.rooms = rooms;
        this.material = material;
        this.spriteScene = spriteScene;
        this.mis = mis;
        this.gameState = gameState;
        rooms[start].load(this.mis, this.gameState).then(() => {
            this._ready = true;
            this.material.uniforms.map.value = Game.getTexture(`${start}0`).texture;
        })
        for(const room of Object.values(rooms)) {
            spriteScene.add(room.spriteGroup);
        }
        this.enter(start);
        this.positionSpriteGroups();
    }

    private enter = (room: string) => {
        // unload siblings
        if(this.activeRoom) {
            for(const exit of this.activeRoom.exits) {
                if(exit.target === room) {
                    continue;
                }
                this.rooms[exit.target].unload();
            }
        }
        // unload grandparent
        if(this.parentRoom !== this.rooms[room]) {
            this.parentRoom?.unload();
        }
        // set new active room
        if(this.activeRoom) this.activeRoom.leave();
        this.activeRoom = this.rooms[room];
        this.activeRoom.enter();
        // reset parent room
        this.parentExit = null;
        this.parentRoom = null;
        // load children
        for(const exit of this.activeRoom.exits) {
            this.rooms[exit.target].load(this.mis, this.gameState);
        };
        // load parent
        for(const key in this.rooms) {
            const exit = this.rooms[key].findExitTo(room);
            if(exit) {
                this.parentExit = exit;
                this.parentRoom = this.rooms[key];
                this.parentRoom.load(this.mis, this.gameState);
            }
        }
    }

    bufferZoom = (amount: number) => {
        this.zoomBuffer += amount;
    }

    bufferMouse = (x: number, y: number) => {
        this.mouseBuffer.x = x;
        this.mouseBuffer.y = y;
    }

    private zoom = (amount: number, x: number, y: number) => {
        const tempZoom = Math.floor(this.zoomLevel);
        if(this.zoomLevel === 0) {
            // trying to scroll into base plane: find the closest (open) child
            if(amount < 0) {
                const closest = this.activeRoom.findExit(x, (1 - y));
                if(!closest) {
                    this.targetExit = null;
                    return;
                }
                this.targetExit = closest;
                this.targetOffset.x = closest.position.x - 1 / 16;
                this.targetOffset.y = closest.position.y - 1 / 16;
                this.currentOffset.x = this.targetOffset.x;
                this.currentOffset.y = this.targetOffset.y;
            }
            // trying to scroll out of base plane: check if the current room has a parent
            if(amount > 0) {
                if(!this.parentExit) {
                    return;
                }
                if(!this.parentRoom?.loaded) {
                    return;
                }
                this.targetOffset.x = this.parentExit.position.x - 1 / 16;
                this.targetOffset.y = this.parentExit.position.y - 1 / 16;
                this.currentOffset.x = this.targetOffset.x;
                this.currentOffset.y = this.targetOffset.y;
                this.zoomLevel = 3;
            }
        }
        if((this.zoomLevel - amount) < 0.9 && amount < 0) {
            const closest = this.activeRoom.findExit(x, (1 - y), this.zoomLevel, this.currentOffset);
            this.targetExit = closest;
            this.targetOffset.x = closest.position.x - 1 / 16;
            this.targetOffset.y = closest.position.y - 1 / 16;
        }
        this.zoomLevel -= amount;
        if(this.zoomLevel < 0 || this.zoomLevel >= 3) {
            this.zoomLevel = 0;
            //this.zoomBuffer = 0;
        }
        // check if texture needs an update
        const newZoom = Math.floor(this.zoomLevel);
        if(newZoom != tempZoom) {
            // room change!
            this.currentOffset.x = this.targetOffset.x;
            this.currentOffset.y = this.targetOffset.y;
            if(newZoom + tempZoom === 1) {
                if(amount > 0) {
                    this.targetExit = this.parentExit;
                    this.enter(this.parentRoom.id);
                } else {
                    if(this.rooms[this.targetExit.target].loaded) {
                        this.enter(this.targetExit.target);
                    } else {
                        this.zoomLevel = 0.99999;
                    }
                }
            }
            this.material.uniforms.map.value = Game.getTexture(`${this.activeRoom.id}${Math.floor(this.zoomLevel)}`).texture;
        }
        // set zoom uniform
        this.material.uniforms.zoom.value = 1 / Math.pow(2, this.zoomLevel % 1);
    }

    private positionSpriteGroups = () => {
        const activeRoomZoom = 0.5 * ((this.zoomLevel >= 1) ? Math.pow(2, this.zoomLevel - 3) : Math.pow(2, this.zoomLevel));
        this.activeRoom.spriteGroup.scale.set(activeRoomZoom, activeRoomZoom, 1);
        const displacement = (1 - 2 * activeRoomZoom) * 8 / 7;
        const dx = this.material.uniforms.target.value[0] * displacement;
        const dy = this.material.uniforms.target.value[1] * displacement;
        this.activeRoom.spriteGroup.position.set(
            dx * 512,
            dy * 512,
            1
        );
        this.parentRoom?.spriteGroup.scale.set(activeRoomZoom * 8, activeRoomZoom * 8, 1);
        this.parentRoom?.spriteGroup.position.set(
            (dx - (this.parentExit.position.x - 1 / 16) * 16 * activeRoomZoom) * 512,
            (dy - (this.parentExit.position.y - 1 / 16) * 16 * activeRoomZoom) * 512,
            1.5
        )
        for(const child of this.activeRoom.exits) {
            this.rooms[child.target].spriteGroup.scale.set(activeRoomZoom / 8, activeRoomZoom / 8, 1);
            this.rooms[child.target].spriteGroup.position.set(
                (dx + (child.position.x - 1 / 16) * 2 * activeRoomZoom) * 512,
                (dy + (child.position.y - 1 / 16) * 2 * activeRoomZoom) * 512,
                0.5
            )
        }
    }

    update = (delta: number) => {
        if(this.autoZoom) {
            this.zoom(-delta * this.zoomSpeed, 0.3755, 0.25);
            this.zoomSpeed += delta * 0.0000002;
            this.zoomSpeed = Math.min(this.zoomSpeed, 0.004);
        } else if(this.zoomBuffer !== 0) {
            const a = Math.abs(this.zoomBuffer) < 2 * delta ? this.zoomBuffer : 2 * delta * Math.sign(this.zoomBuffer);
            this.zoom(a * Game.userData.settings.mouseSensitivity, this.mouseBuffer.x, this.mouseBuffer.y);
            this.zoomBuffer -= a;
        }
        const amount = (1.0 - Math.pow(0.75, delta / 16));
        this.currentOffset.x += (this.targetOffset.x - this.currentOffset.x) * amount;
        this.currentOffset.y += (this.targetOffset.y - this.currentOffset.y) * amount;
        this.material.uniforms.target.value = [
            this.currentOffset.x,
            this.currentOffset.y,
        ];
        this.positionSpriteGroups();
    }

}

export { RoomSystem }