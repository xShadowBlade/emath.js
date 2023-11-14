import { Game, GameConfigOptions, GameDefaultConfig } from "../game/game";
import { Application } from "pixi.js";
import type { Graphics, Sprite } from "pixi.js";

import { configManager, RequiredDeep } from "game/configManager";
import { sprite } from "./sprite";

interface PixiGameConfig extends GameConfigOptions {
    /**
     * Whether or not to setup a 2d camera system.
     * Defaults to `false`
     */
    setupCamera?: boolean,

    camera?: {
        // /**
        //  * The X position of the camera. Defaults to `0`.
        //  */
        // x?: number,

        // /**
        //  * The Y position of the camera. Defaults to `0`.
        //  */
        // y?: number,

        /**
         * The smooth damp multiplier of the camera. Defaults to `0.15`.
         */
        smoothDamp?: number,
    }
}

const PixiGameDefaultConfig: RequiredDeep<PixiGameConfig> = {
    ...GameDefaultConfig,
    setupCamera: false,
    camera: {
        // x: 0,
        // y: 0,
        smoothDamp: 0.15,
    },
};

class PixiGame extends Game {
    protected static configManager = new configManager(PixiGameDefaultConfig);

    public config: RequiredDeep<PixiGameConfig>;

    public PIXI: {
        app: Application,
        camera: {
            x: number,
            y: number,
            smoothDamp: number,
        },
    };

    constructor (config?: PixiGameConfig) {
        super();
        this.config = PixiGame.configManager.parse(config);

        // Setup PIXI
        const app = new Application({
            // @ts-ignore
            background: 0x000000,
            resizeTo: window,
        });

        // @ts-ignore
        app.stage.eventMode = "static";
        // @ts-ignore
        document.body.appendChild(app.view);
        // console.log("PIXI Setup complete.");
        // globalThis.__PIXI_APP__ = papp;
        window.addEventListener("resize", () => {
            // Update the background's size to match the new window size
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            // Resize the renderer
            app.renderer.resize(newWidth, newHeight);
        });
        this.PIXI = {
            app,
            camera: {
                x: 0,
                y: 0,
                smoothDamp: this.config.camera.smoothDamp,
            },
        };
        // Setup 2d camera
        // if (this.config.setupCamera) {
            
        // }
    }

    public addSprite (spriteToAdd: Graphics | Sprite, collisionShape: "Circle" | "Polygon" | "Rectangle" | "Shape" | "Line" = "Rectangle"): sprite {
        return new sprite(this, spriteToAdd, collisionShape);
    }
}

export { PixiGame };