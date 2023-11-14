import { Game, GameConfigOptions } from "../game/game";
import { Application } from "pixi.js";
import type { Graphics, Sprite } from "pixi.js";
import { configManager, RequiredDeep } from "game/configManager";
import { sprite } from "./sprite";
interface PixiGameConfig extends GameConfigOptions {
    /**
     * Whether or not to setup a 2d camera system.
     * Defaults to `false`
     */
    setupCamera?: boolean;
    camera?: {
        /**
         * The smooth damp multiplier of the camera. Defaults to `0.15`.
         */
        smoothDamp?: number;
    };
}
declare class PixiGame extends Game {
    protected static configManager: configManager<RequiredDeep<PixiGameConfig>>;
    config: RequiredDeep<PixiGameConfig>;
    PIXI: {
        app: Application;
        camera: {
            x: number;
            y: number;
            smoothDamp: number;
        };
    };
    constructor(config?: PixiGameConfig);
    addSprite(spriteToAdd: Graphics | Sprite, collisionShape?: "Circle" | "Polygon" | "Rectangle" | "Shape" | "Line"): sprite;
}
export { PixiGame };
