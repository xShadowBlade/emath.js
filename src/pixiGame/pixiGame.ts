/**
 * @file Declares the main pixi game class, which includes PIXI-specific methods and properties.
 */
import { Game, GameConfigOptions, gameDefaultConfig } from "../game/game";
import { ConfigManager } from "../game/managers/configManager";
import { GameSprite, CollisionShapeType } from "./sprite";
import { KeyManager } from "../game/managers/keyManager";
import { EventManager } from "../game/managers/eventManager";

import type { Graphics, Sprite } from "pixi.js";
import type { Application } from "pixi.js";

// import { loadPIXI } from "./loadPIXI";
// const PIXI = loadPIXI();
// const { Application } = PIXI;

/** The configuration options for the game. */
interface PixiGameConfig extends GameConfigOptions {
    /** The PIXI-specific config */
    pixi: {
        /** The PIXI app to use for the game. */
        app: Application | null;
    };
}

/** The default configuration for the game. */
const pixiGameDefaultConfig: PixiGameConfig & typeof gameDefaultConfig = {
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
class PixiGame extends Game {
    protected static configManager = new ConfigManager(pixiGameDefaultConfig);

    /** The configuration for the game. */
    // public config: RequiredDeep<pixiGameConfig>;
    public config: typeof pixiGameDefaultConfig;

    /** The PIXI-specific properties for the game. */
    public PIXI: {
        /** The PIXI app to use for the game. */
        app: Application;
        /** The camera position. */
        camera: {
            /** The x position of the camera. */
            x: number;
            /** The y position of the camera. */
            y: number;
        };
    };

    /**
     * Creates a new instance of the pixiGame class.
     * @param config - The configuration for the game.
     */
    constructor (config?: PixiGameConfig) {
        super(config);
        this.config = PixiGame.configManager.parse(config);

        // Setup PIXI
        if (!this.config.pixi.app) throw new Error(`No PIXI app was provided in config: ${JSON.stringify(this.config)}`);
        const app = this.config.pixi.app;

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
        this.keyManager = new KeyManager({
            autoAddInterval: true,
            pixiApp: this.PIXI.app,
        });
        this.eventManager = new EventManager({
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
    public addSprite (spriteToAdd: Graphics | Sprite, collisionShape: CollisionShapeType = "Rectangle"): GameSprite {
        return new GameSprite(this, spriteToAdd, collisionShape);
    }
}

// export { PixiGame as PixiGame, PixiGameConfig as PixiGameConfig, pixiGameDefaultConfig };
export { PixiGame, PixiGameConfig, pixiGameDefaultConfig };