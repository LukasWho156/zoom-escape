import { RenderSystem } from "luthe-amp/lib/graphics/systems/render-system";
import { ShaderSprite } from "luthe-amp/lib/graphics/utility/shader-sprite";
import { Game, GameScreen, THREE } from "luthe-amp/lib/index"
import { LoadingSystem } from "luthe-amp/lib/util/loading-system"
import { LoadingShader } from "../shaders/loading-shader";
import { MouseInteractionSystem } from "luthe-amp/lib/input/mouse-interaction-system";
import { MouseInteractionComponent } from "luthe-amp/lib/input/mouse-interaction-component";
import { makeMainScreen } from "./main-screen";
import { makeStartScreen } from "./start-screen";

const makeLoadScreen = (promises: Promise<any>[]) => {

    const screen = new GameScreen();
    const renderSys = new RenderSystem();
    screen.addSystem(renderSys, 100);

    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(0, 512, 512, -96, 0.1, 1000);
    cam.position.z = 100;
    renderSys.addRenderPass(scene, cam);

    const playButton = new ShaderSprite({
        texture: 'play',
        x: 256,
        y: 256,
        scaleX: 0.5,
        scaleY: 0.5,
        options: {
            shader: LoadingShader,
        }
    });
    scene.add(playButton);

    const mis = new MouseInteractionSystem(Game.width, Game.height, cam, Game.renderer.domElement);
    screen.addSystem(mis);
    const mic = new MouseInteractionComponent({cursor: 'pointer'}, playButton.sprite);
    mic.addEventListener('click', async () => {
        Game.audio.initSounds();
        const nextScreen = makeStartScreen();
        Game.setActiveScreen(nextScreen);
    })
    mic.active = false;
    mis.add(mic);

    const loadingSys = new LoadingSystem(promises, (percentage) => {
        LoadingShader.uniforms.percentage.value = percentage;
    }, () => {
        mic.active = true;
    });
    screen.addSystem(loadingSys, 50);

    return screen;

}

export { makeLoadScreen }