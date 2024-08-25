import { RenderSystem } from "luthe-amp/lib/graphics/systems/render-system";
import { Sprite2D } from "luthe-amp/lib/graphics/utility/sprite-2d";
import { Game, GameScreen, THREE } from "luthe-amp/lib/index"
import { VignetteShader } from "../shaders/vignette-shader";
import { MouseInteractionSystem } from "luthe-amp/lib/input/mouse-interaction-system";
import { makeMainScreen } from "./main-screen";
import { MouseInteractionComponent } from "luthe-amp/lib/input/mouse-interaction-component";

const makeButton = (x: number, y: number, textSprite: string) => {
    const group = new THREE.Group();
    group.position.set(x, y, 0);
    const button = new Sprite2D({
        texture: 'button',
        z: 1,
        scaleX: 0.5,
        scaleY: 0.5,
    });
    group.add(button);
    const text = new Sprite2D({
        texture: textSprite,
        y: -15,
        z: 2,
        scaleX: 0.5,
        scaleY: 0.5
    });
    group.add(text)
    const mic = new MouseInteractionComponent({cursor: 'pointer'}, button);
    mic.addEventListener('hover', () => button.setFrame(1));
    mic.addEventListener('leave', () => button.setFrame(0))
    return {button: group, mic: mic};
}

const makeStartScreen = () => {

    const screen = new GameScreen();
    const renderSys = new RenderSystem();
    screen.addSystem(renderSys, 100);

    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-256, 256, 256, -352, 0.1, 1000);
    cam.position.z = 100;
    renderSys.addRenderPass(scene, cam);

    const bg = new Sprite2D({
        texture: 'start-bg',
        scaleX: 0.5,
        scaleY: 0.5,
    });
    scene.add(bg);

    const vignette = new THREE.Mesh(
        new THREE.PlaneGeometry(512, 512),
        new THREE.ShaderMaterial(VignetteShader)
    );
    vignette.material.transparent = true;
    vignette.position.set(0, 0, 5);
    scene.add(vignette);

    const mis = new MouseInteractionSystem(Game.width, Game.height, cam, Game.renderer.domElement);
    screen.addSystem(mis);

    const settingsDialog = document.getElementById('settingsDialog') as HTMLDialogElement;    
    const {button: bSet, mic: mSet} = makeButton(0, -150, 'bt-settings');
    scene.add(bSet);
    mis.add(mSet);
    mSet.addEventListener('click', () => {
        settingsDialog.showModal();
    })

    const soundSlider = document.getElementById('soundSlider') as HTMLInputElement;
    soundSlider.value = (Game.userData.settings.soundVolume * 100).toString();
    Game.audio.soundVolume = Game.userData.settings.soundVolume;
    soundSlider.addEventListener('change', () => {
        Game.userData.settings.soundVolume = parseInt(soundSlider.value) / 100;
        Game.audio.soundVolume = Game.userData.settings.soundVolume;
        Game.saveToStorage('settings', Game.userData.settings);
    })

    const musicSlider = document.getElementById('musicSlider') as HTMLInputElement;
    musicSlider.value = (Game.userData.settings.musicVolume * 100).toString();
    Game.audio.musicVolume = Game.userData.settings.musicVolume;
    musicSlider.addEventListener('change', () => {
        Game.userData.settings.musicVolume = parseInt(musicSlider.value) / 100;
        Game.audio.musicVolume = Game.userData.settings.musicVolume;
        Game.saveToStorage('settings', Game.userData.settings);
    })

    const sensitivitySlider = document.getElementById('sensitivitySlider') as HTMLInputElement;
    sensitivitySlider.value = (Game.userData.settings.mouseSensitivity * 10000).toString();
    sensitivitySlider.addEventListener('change', () => {
        Game.userData.settings.mouseSensitivity = parseInt(sensitivitySlider.value) / 10000;
        Game.saveToStorage('settings', Game.userData.settings);
    })

    makeMainScreen().then(next => {
        const {button: bNG, mic: mNG} = makeButton(0, 0, 'bt-new-game');
        scene.add(bNG);
        mis.add(mNG);
        mNG.addEventListener('click', () => {
            Game.setActiveScreen(next.screen);
        })
        const existing: any = Game.loadFromStorage('progress');
        if(!!existing?.sprites) {
            const {button: bCont, mic: mCont} = makeButton(0, 150, 'bt-continue');
            scene.add(bCont);
            mis.add(mCont);
            mCont.addEventListener('click', () => {
                next.loadExisting();
                Game.setActiveScreen(next.screen);
            })
        }
    })

    return screen;

}

export { makeStartScreen };