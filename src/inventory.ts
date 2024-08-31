import { Game, THREE } from "luthe-amp/lib/index";
import { ShaderSprite } from "luthe-amp/lib/graphics/utility/shader-sprite";
import { MouseInteractionSystem } from "luthe-amp/lib/input/mouse-interaction-system";
import { MouseInteractionComponent } from "luthe-amp/lib/input/mouse-interaction-component";
import { SelectionShader } from "./shaders/selection-shader";
import { Sprite2D } from "luthe-amp/lib/graphics/utility/sprite-2d";

const ITEMS: {[key: string]: number} = {
    'bucket': 0,
    'crowbar': 1,
    'fishing-line': 2,
    'fabric': 3,
    'matches': 4,
    'fish': 5,
    'worm': 6,
    'bucket-full': 7,
    'wood': 8,
    'bait': 9,
    'seed': 10,
}

const COMBINTATIONS = [{
    ingredients: ['fishing-line', 'worm'],
    target: 'bait'
}];

class Inventory {

    private items: string[] = [];

    private sprites: { [key: string]: ShaderSprite } = {};
    readonly group = new THREE.Group();
    private _selectedItem?: string;
    get selectedItem() {
        return this._selectedItem;
    }

    private mis;

    constructor(mis: MouseInteractionSystem) {
        this.mis = mis;
    }

    addItem = (item: string) => {
        this.items.push(item);
        if(!this.sprites[item]) {

            const sprite = new ShaderSprite({
                texture: 'items',
                handle: 'bottom',
                options: {
                    shader: {
                        uniforms: {
                            selected: { value: false }
                        },
                        code: SelectionShader.code,
                    },
                }
            });
            sprite.setFrame(ITEMS[item]);
            sprite.scale.set(1, 1, 1);
            sprite.userData.targetScale = 48;

            this.sprites[item] = sprite;
            const mic = new MouseInteractionComponent({ cursor: 'pointer' }, sprite.sprite);
            mic.active = true;
            mic.addEventListener('click', () => {
                if(this.selectedItem === item) {
                    this.select(null);
                    sprite.userData.targetScale = 64;
                } else {
                    this.select(item);
                }
            });
            mic.addEventListener('hover', () => sprite.userData.targetScale = 64);
            mic.addEventListener('leave', () => {
                if(item !== this.selectedItem) {
                    sprite.userData.targetScale = 48;
                }
            });
            sprite.userData.mic = mic;
            this.mis.add(mic);

        } else {
            this.sprites[item].userData.mic.active = true;
        }
        this.group.add(this.sprites[item]);
    }

    remove = (item: string) => {
        this.items = this.items.filter(i => i !== item);
        if(!this.sprites[item]) {
            return;
        }
        this.group.remove(this.sprites[item]);
        this.sprites[item].userData.mic.active = false;
        if(this._selectedItem === item) {
            this.select(null);
        }
    }

    update = (delta: number) => {
        let totalWidth = 0;
        for(const item of this.items) {
            const sprite = this.sprites[item];
            const curScale = sprite.scale.x;
            const diff = sprite.userData.targetScale - curScale;
            const dScale = diff * (1 - Math.pow(0.8, delta / 16));
            sprite.scale.set(curScale + dScale, curScale + dScale, 1);
            totalWidth += curScale + dScale;
        }
        let offset = -totalWidth / 2;
        for(const item of this.items) {
            const sprite = this.sprites[item];
            sprite.position.x = offset + sprite.scale.x / 2;
            offset += sprite.scale.x;
        }
    }

    select = (item?: string) => {
        for(const c of COMBINTATIONS) {
            if(c.ingredients.find(i => i === item) && c.ingredients.find(i => i === this.selectedItem)) {
                this.remove(this.selectedItem);
                this.remove(item);
                this.addItem(c.target);
                Game.audio.playSound('collect');
                return;
            }
        }
        this._selectedItem = item;
        for(const key in this.sprites) {
            const sprite = this.sprites[key];
            if(key === item) {
                sprite.userData.targetScale = 64;
                sprite.sprite.material.uniforms.selected.value = true;
            } else {
                sprite.userData.targetScale = 48;
                sprite.sprite.material.uniforms.selected.value = false;
            }
        }
    }

    getItemList = () => {
        return [...this.items];
    }

}

export { Inventory }