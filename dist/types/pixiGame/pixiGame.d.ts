/**
 * @file Declares the main pixi game class, which includes PIXI-specific methods and properties.
 */
import { game, gameConfigOptions } from "../game/game";
import { configManager, RequiredDeep } from "../game/managers/configManager";
import { sprite, collisionShapeType } from "./sprite";
import type { Graphics, Sprite } from "pixi.js";
import type { Application } from "pixi.js";
/** The configuration options for the game. */
interface pixiGameConfig extends gameConfigOptions {
    /** The PIXI-specific config */
    pixi: {
        /** The PIXI app to use for the game. */
        app: Application | null;
    };
}
/** The default configuration for the game. */
declare const pixiGameDefaultConfig: pixiGameConfig & RequiredDeep<gameConfigOptions>;
/**
 * Represents a game instance with PIXI-specific methods and properties.
 * Uses PIXI.js time-based game loop.
 */
declare class pixiGame extends game {
    protected static configManager: configManager<pixiGameConfig & RequiredDeep<gameConfigOptions>>;
    /** The configuration for the game. */
    config: typeof pixiGameDefaultConfig;
    /** The PIXI-specific properties for the game. */
    PIXI: {
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
    constructor(config?: pixiGameConfig);
    /**
     * Adds a sprite to the game.
     * @param spriteToAdd - The sprite to add.
     * @param collisionShape - The collision shape to use for the sprite.
     * @returns The sprite object.
     */
    addSprite(spriteToAdd: Graphics | Sprite, collisionShape?: collisionShapeType): sprite;
}
export { pixiGame, pixiGameConfig, pixiGameDefaultConfig };
