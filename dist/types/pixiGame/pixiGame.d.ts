import { game, gameConfigOptions } from "../game/game";
import { configManager, RequiredDeep } from "game/managers/configManager";
import { sprite } from "./sprite";
import type { Graphics, Sprite } from "pixi.js";
declare const Application: typeof import("pixi.js").Application;
interface pixiGameConfig extends gameConfigOptions {
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
declare class pixiGame extends game {
    protected static configManager: configManager<RequiredDeep<pixiGameConfig>>;
    config: RequiredDeep<pixiGameConfig>;
    PIXI: {
        app: InstanceType<typeof Application>;
        camera: {
            x: number;
            y: number;
            smoothDamp: number;
        };
    };
    constructor(config?: pixiGameConfig);
    addSprite(spriteToAdd: Graphics | Sprite, collisionShape?: "Circle" | "Polygon" | "Rectangle" | "Shape" | "Line"): sprite;
}
export { pixiGame };
