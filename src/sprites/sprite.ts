import { Sprite2D } from "luthe-amp/lib/graphics/utility/sprite-2d";
import { Game } from "luthe-amp/lib/index";
import { MouseInteractionComponent } from "luthe-amp/lib/input/mouse-interaction-component";
import { MouseInteractionSystem } from "luthe-amp/lib/input/mouse-interaction-system";
import { GameState } from "../game-state";

type ClickHandlerFn = (gameState: GameState) => void;

type SpriteConfig = {
    texture?: string,
    active?: boolean,
    onClick?: ClickHandlerFn,
}

class Sprite {

    readonly id: string;

    private mic: MouseInteractionComponent;
    private onClick: ClickHandlerFn;
    private textureId: string;
    
    private _active = true;
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
        if(!value) {
            if(!!this._sprite) this._sprite.visible = false;
            if(!!this.mic) this.mic.active = false;
        } else {
            if(!!this._sprite) this._sprite.visible = true;
            if(!!this.mic) this.mic.active = true;
        }
    }

    private _state = 0;
    get state() {
        return this._state;
    }
    set state(value) {
        if(!!this._sprite) this._sprite.setFrame(value);
        this._state = value;
    }

    private _sprite: Sprite2D;
    get sprite() {
        return this._sprite;
    }

    constructor(id: string, config?: SpriteConfig) {
        this.id = id;
        this.textureId = config?.texture ?? this.id;
        this.onClick = config?.onClick;
        if(config?.active === false) {
            this._active = false;
        }
    }

    instantiate = (mis: MouseInteractionSystem, gameState: GameState) => {
        this._sprite = new Sprite2D({
            texture: `sprite-${this.textureId}`,
            handle: 'bottom left',
            options: {
                collider: 'pixel',
            }
        });
        this._sprite.setFrame(this._state);
        if(this.onClick) {
            this.mic = new MouseInteractionComponent({cursor: 'pointer'}, this._sprite);
            this.mic.addEventListener('click', () => this.onClick(gameState));
            mis.add(this.mic);
        }
        if(!this._active) {
            this.active = false;
        }
        return this._sprite;
    }

    setInteractionEnabled = (value: boolean) => {
        if(!this.active) return;
        if(this.mic) this.mic.active = value;
    }

}

export { Sprite };