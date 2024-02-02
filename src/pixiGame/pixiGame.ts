import { game, gameConfigOptions, gameDefaultConfig } from "../game/game";
import { configManager, RequiredDeep } from "../game/managers/configManager";
import { sprite } from "./sprite";
import { keyManager } from "../game/managers/keyManager";
import { eventManager } from "../game/managers/eventManager";

import type { Graphics, Sprite } from "pixi.js";
import type { Application } from "pixi.js";

// import { loadPIXI } from "./loadPIXI";
// const PIXI = loadPIXI();
// const { Application } = PIXI;

interface pixiGameConfig extends gameConfigOptions {
    pixi?: {
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

class pixiGame extends game {
    protected static configManager = new configManager(pixiGameDefaultConfig);

    public config: RequiredDeep<pixiGameConfig>;

    public PIXI: {
        app: InstanceType<typeof Application>,
        camera: {
            x: number,
            y: number
        },
    };

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

    public addSprite (spriteToAdd: Graphics | Sprite, collisionShape: "Circle" | "Polygon" | "Rectangle" | "Shape" | "Line" = "Rectangle"): sprite {
        return new sprite(this, spriteToAdd, collisionShape);
    }
}

export { pixiGame };