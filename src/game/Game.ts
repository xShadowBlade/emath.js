/**
 * @file Declares the main game class.
 */
import type { StaticClassWithData } from "./managers/DataManager";
import { DataManager } from "./managers/DataManager";
import { EventManager } from "./managers/EventManager";
import { KeyManager } from "./managers/KeyManager";

import type { RequiredDeep } from "./managers/ConfigManager";
import { ConfigManager } from "./managers/ConfigManager";

/**
 * The game configuration interface. Some options are not used internally, but you can access them by using `game.config`.
 * See {@link gameDefaultConfig} for the default configuration.
 */
interface GameConfigOptions {
    /**
     * The mode to run the game in. Not used internally.
     */
    mode?: "development" | "production";

    /**
     * The name of the game. Not used internally.
     */
    name: {
        /**
         * The title of the game.
         */
        title?: string;

        /**
         * The ID of the game. Used for naming saves.
         */
        id: string;

        /**
         * The version of the game. Not used internally.
         */
        version?: string;
    };

    /**
     * The settings for the game.
     */
    settings?: {
        /** The framerate to use for the game and various managers. Defaults to `30` */
        framerate?: number;
    };

    /**
     * Whether or not to automatically initialize the interval-based managers.
     * Warning: If you set this to `false`, you will need to manually call `keyManager.init()` and `eventManager.init()` to initialize them.
     */
    initIntervalBasedManagers?: boolean;

    /**
     * The storage to use for the game.
     * If you want to use a different storage, you can specify it here.
     * @default window.localStorage
     */
    localStorage?: Storage | undefined;
}

type GameConfigOptionsRequired = RequiredDeep<Omit<GameConfigOptions, "localStorage">> & {
    localStorage: Storage | undefined;
};

/**
 * The default configuration for the game
 */
const gameDefaultConfig = {
    mode: "production",
    name: {
        title: "",
        id: "",
        version: "0.0.0",
    },
    settings: {
        framerate: 30,
    },
    initIntervalBasedManagers: true,
    localStorage: undefined as Storage | undefined,
} as const satisfies GameConfigOptionsRequired;

/**
 * A game instance.
 */
class Game {
    /** The static config manager for the game. */
    protected static readonly configManager = new ConfigManager<GameConfigOptionsRequired>(gameDefaultConfig);

    /** The config object */
    public readonly config: typeof Game.configManager.options;

    /**
     * The data manager for the game.
     * As of v5.0.0, all data is stored here.
     */
    public readonly dataManager: DataManager;

    /** The key manager for the game. */
    public readonly keyManager: KeyManager;

    /** The event manager for the game. */
    public readonly eventManager: EventManager;

    /**
     * Creates a new instance of the game class.
     * @param config - The configuration object for the game.
     * @example
     * const myGame = new game({
     *     name: {
     *         title: "My Game",
     *         id: "my-game",
     *     },
     *     // Additional options here
     * });
     */
    constructor(config?: GameConfigOptions) {
        // Parse the config
        this.config = Game.configManager.parse(config);

        // Init managers
        this.dataManager = new DataManager(this, this.config.localStorage as Storage | undefined);

        this.eventManager = new EventManager({
            autoAddInterval: this.config.initIntervalBasedManagers,
            fps: this.config.settings.framerate,
        });

        this.keyManager = new KeyManager(this, {
            autoAddInterval: this.config.initIntervalBasedManagers,
        });
    }

    /**
     * Changes the framerate of the game.
     * @param fps - The new framerate to use.
     */
    public changeFps(fps: number): void {
        this.eventManager.changeFps(fps);
    }

    public addData<T extends StaticClassWithData>(dataToAdd: T): T {
        this.dataManager.addCustomData(dataToAdd);
        return dataToAdd;
    }
}

// test
// const myGame = new Game();
// const currency = myGame.addCurrency("curr", [
//     {
//         id: "upgId1",
//         cost: (level) => level.mul(10),
//     },
//     {
//         id: "upgId2",
//         cost: (level) => level.mul(20),
//     },
// ] as const satisfies UpgradeInit[]);

// const upgrade1 = currency.getUpgrade("upgId1");

// const skillTree = myGame.addSkillTree("skillTree", [
//     {
//         id: "skill1",
//         costCurrency: currency,
//         cost: (level) => level.mul(10),
//     },
//     {
//         id: "skill2",
//         costCurrency: currency,
//         requirements: ["skill1"],
//         cost: (level) => level.mul(20),
//     },
// ] as const satisfies SkillInit[]);

export { Game, gameDefaultConfig };
export type { GameConfigOptions };
