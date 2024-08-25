import { RenderSystem } from "luthe-amp/lib/graphics/systems/render-system";
import { Game, GameScreen, THREE } from "luthe-amp/lib/index";
import { createOrthoCam } from "luthe-amp/lib/util/create-ortho-cam";
import { TestShader } from "../shaders/test-shader";
import { RoomSystem } from "./room-system";
//@ts-ignore
import { ROOMS } from "../rooms/room-db.js";
import { MouseInteractionSystem } from "luthe-amp/lib/input/mouse-interaction-system";
import { GameState } from "../game-state";
import { SPRITES } from "../sprites/sprite-db";
import { Sprite2D } from "luthe-amp/lib/graphics/utility/sprite-2d";
import { VignetteShader } from "../shaders/vignette-shader";
import { Inventory } from "../inventory";
import { MouseInteractionComponent } from "luthe-amp/lib/input/mouse-interaction-component";
//@ts-ignore
import { Text } from 'troika-three-text';

let eventCache: PointerEvent[] = [];
let distance: number = -1;
const points = [{x: 0, y: 0}, {x: 0, y: 0}];

const makeMainScreen = async () => {

    const screen = new GameScreen();

    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(0, Game.width, 512, -96, 0.1, 1000);
    cam.position.z = 100;

    const renderSys = new RenderSystem();
    screen.addSystem(renderSys, 100);
    renderSys.addRenderPass(scene, cam);

    const testMaterial = new THREE.ShaderMaterial(TestShader);
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(512, 512),
        testMaterial
    );
    plane.position.set(256, 256, 0);
    scene.add(plane);

    const vignette = new THREE.Mesh(
        new THREE.PlaneGeometry(512, 512),
        new THREE.ShaderMaterial(VignetteShader)
    );
    vignette.material.transparent = true;
    vignette.position.set(256, 256, 5);
    scene.add(vignette);

    const settings = new Sprite2D({
        texture: 'settings',
        x: 512,
        y: 512,
        z: 4,
        handle: 'top right',
    });
    scene.add(settings);

    const inventoryBg = new Sprite2D({
        texture: 'inventory-bg',
        handle: 'top left',
        z: 5
    });
    scene.add(inventoryBg);

    const creditBackdrop = new THREE.Mesh(
        new THREE.PlaneGeometry(512, 512),
        new THREE.MeshBasicMaterial({
            color: 0x000000,
            opacity: 0.5,
            transparent: true,
        })
    );
    creditBackdrop.position.set(256, 256, 4);
    const credits = new Text()
    credits.text = 'You escaped!\nOr did you?\n\nA game by Theresa and Lukas\n\nThank you for playing!';
    credits.font = Game.userData.font;
    credits.anchorX = 'center';
    credits.anchorY = 'middle';
    credits.textAlign = 'center';
    credits.fontSize = 32;
    credits.maxWidth = 500;
    credits.color = 0xffffff;
    credits.outlineColor = 0x000000;
    credits.outlineWidth = 2;
    credits.sync();
    creditBackdrop.add(credits);
    creditBackdrop.visible = false;
    scene.add(creditBackdrop);

    const mis = new MouseInteractionSystem(Game.width, Game.height, cam, Game.renderer.domElement);

    const inventory = new Inventory(mis);
    screen.addSystem(inventory, 50);
    inventory.group.position.set(256, -80, 6);
    scene.add(inventory.group);

    const inventoryMic = new MouseInteractionComponent({}, inventoryBg);
    inventoryMic.addEventListener('click', () => inventory.select(null));
    mis.add(inventoryMic);

    const settingsDialog = document.getElementById('settingsDialog') as HTMLDialogElement;
    const settingsMic = new MouseInteractionComponent({cursor: 'pointer'}, settings);
    settingsMic.addEventListener('click', () => settingsDialog.showModal());
    mis.add(settingsMic);

    const gameState = new GameState(ROOMS, SPRITES, inventory);

    const roomSystem = new RoomSystem(ROOMS, 'lobby', testMaterial, scene, mis, gameState);
    screen.addSystem(roomSystem);
    gameState.addEventListener('win', () => {
        roomSystem.autoZoom = true;
        creditBackdrop.visible = true;
    });

    screen.addListener('wheel', (event: WheelEvent) => {
        event.preventDefault();
        roomSystem.bufferZoom(event.deltaY, event.offsetX / 512, event.offsetY / 512);
    });

    screen.addListener('pointerdown', (event: PointerEvent) => {
        if(eventCache.length <= 1) {
            points[eventCache.length].x = event.offsetX;
            points[eventCache.length].y = event.offsetY;
        }
        eventCache.push(event);
        distance = -1;
    });

    screen.addListener('pointerup', (event: PointerEvent) => {
        eventCache = eventCache.filter(e => e.pointerId != event.pointerId);
        distance = -1;
    })

    screen.addListener('pointermove', (event: PointerEvent) => {
        const index = eventCache.findIndex(e => e.pointerId === event.pointerId);
        if(index >= 0 && index <= 2) {
            points[index].x = event.offsetX;
            points[index].y = event.offsetY;
        }
        if(eventCache.length === 2) {
            const x1 = points[0].x;
            const x2 = points[1].x;
            const y1 = points[0].y;
            const y2 = points[1].y;
            const newDistance = Math.sqrt(
                (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
            );
            if(distance >= 0) {
                if(Math.abs(distance - newDistance) <= 25) {
                    roomSystem.bufferZoom(10 * (distance - newDistance), 0.5 / 512 * (x1 + x2), 0.5 / 512 * (y1 + y2));
                }
            }
            distance = newDistance;
        } else {
            distance = -1;
        }
    });

    screen.addSystem({mount: () => {
        Game.audio.playMusic('soundtrack');
    }});

    const loadExisting = () => {
        const progress = Game.loadFromStorage('progress');
        if(!!progress) gameState.loadGame(progress);
    }

    return { screen: screen, loadExisting: loadExisting };

}

export { makeMainScreen }