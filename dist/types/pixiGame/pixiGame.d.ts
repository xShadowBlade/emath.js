/**
 * @file Declares the main pixi game class, which includes PIXI-specific methods and properties.
 */
import { game, gameConfigOptions } from "../game/game";
import { configManager, RequiredDeep } from "../game/managers/configManager";
import { sprite, collisionShapeType } from "./sprite";
import type { Graphics, Sprite } from "pixi.js";
import type { Application } from "pixi.js";
interface pixiGameConfig extends gameConfigOptions {
    pixi: {
        app: InstanceType<typeof Application> | null;
    };
}
declare const pixiGameDefaultConfig: RequiredDeep<pixiGameConfig>;
/**
 * Represents a game instance with PIXI-specific methods and properties.
 * Uses PIXI.js time-based game loop.
 */
declare class pixiGame extends game {
    protected static configManager: configManager<RequiredDeep<pixiGameConfig>>;
    /** The configuration for the game. */
    config: RequiredDeep<pixiGameConfig>;
    /** The key manager for the game. */
    PIXI: {
        app: InstanceType<typeof Application>;
        camera: {
            x: number;
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
