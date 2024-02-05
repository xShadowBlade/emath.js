import { game, gameConfigOptions } from "../game/game";
import { configManager, RequiredDeep } from "../game/managers/configManager";
import { sprite } from "./sprite";
import type { Graphics, Sprite } from "pixi.js";
import type { Application } from "pixi.js";
interface pixiGameConfig extends gameConfigOptions {
    pixi?: {
        app: InstanceType<typeof Application> | null;
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
        };
    };
    constructor(config?: pixiGameConfig);
    addSprite(spriteToAdd: Graphics | Sprite, collisionShape?: "Circle" | "Polygon" | "Rectangle" | "Shape" | "Line"): sprite;
}
export { pixiGame };
