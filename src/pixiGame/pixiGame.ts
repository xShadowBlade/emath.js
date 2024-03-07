/**
 * @file Declares the main pixi game class, which includes PIXI-specific methods and properties.
 */
import { game, gameConfigOptions, gameDefaultConfig } from "../game/game";
import { configManager, RequiredDeep } from "../game/managers/configManager";
import { sprite, collisionShapeType } from "./sprite";
import { keyManager } from "../game/managers/keyManager";
import { eventManager } from "../game/managers/eventManager";

import type { Graphics, Sprite } from "pixi.js";
import type { Application } from "pixi.js";

// import { loadPIXI } from "./loadPIXI";
// const PIXI = loadPIXI();
// const { Application } = PIXI;

interface pixiGameConfig extends gameConfigOptions {
    pixi: {
        app: InstanceType<typeof Application> | null;
    }
}

const pixiGameDefaultConfig: RequiredDeep<pixiGameConfig> = {
    ...gameDefaultConfig,
    initIntervalBasedManagers: false,
    pixi: {
        app: null,
    },
};

/**
 * Represents a game instance with PIXI-specific methods and properties.
 * Uses PIXI.js time-based game loop.
 */
class pixiGame extends game {
    protected static configManager = new configManager(pixiGameDefaultConfig);

    /** The configuration for the game. */
    public config: RequiredDeep<pixiGameConfig>;

    /** The key manager for the game. */
    public PIXI: {
        app: InstanceType<typeof Application>,
        camera: {
            x: number,
            y: number
        },
    };

    /**
     * Creates a new instance of the pixiGame class.
     * @param config - The configuration for the game.
     */
    constructor (config?: pixiGameConfig) {
        super(config);
        this.config = pixiGame.configManager.parse(config);

        // Setup PIXI
        if (!this.config.pixi.app) throw new Error(`No PIXI app was provided in config: ${JSON.stringify(this.config)}`);
        // @ts-expect-error - PIXI types are wrong
        const app = this.config.pixi.app as InstanceType<typeof Application>;

        // if (this.config.pixi.app instanceof Application) {
        //     app = this.config.pixi.app;
        // } else {
        //     // @ts-expect-error - PIXI types are wrong
        //     app = new Application(this.config.pixi.app);

        //     app.stage.eventMode = "static";
        //     // @ts-expect-error - Node document type is wrong
        //     document.body.appendChild(app.view);
        //     // TODO: Fix this
        //     // window.addEventListener("resize", () => {
        //     //     // Update the background's size to match the new window size
        //     //     const newWidth = window.innerWidth;
        //     //     const newHeight = window.innerHeight;

        //     //     // Resize the renderer
        //     //     app.renderer.resize(newWidth, newHeight);
        //     // });
        // }
        this.PIXI = {
            app,
            camera: {
                x: 0,
                y: 0,
            },
        };
        this.keyManager = new keyManager({
            autoAddInterval: true,
            pixiApp: this.PIXI.app,
        });
        this.eventManager = new eventManager({
            autoAddInterval: true,
            pixiApp: this.PIXI.app,
        });
    }

    /**
     * Adds a sprite to the game.
     * @param spriteToAdd - The sprite to add.
     * @param collisionShape - The collision shape to use for the sprite.
     * @returns The sprite object.
     */
    public addSprite (spriteToAdd: Graphics | Sprite, collisionShape: collisionShapeType = "Rectangle"): sprite {
        return new sprite(this, spriteToAdd, collisionShape);
    }
}

export { pixiGame, pixiGameConfig, pixiGameDefaultConfig };