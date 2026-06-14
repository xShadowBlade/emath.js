/**
 * @file Declares the main game class.
 */
import { KeyManager } from "./managers/KeyManager";
import { EventManager } from "./managers/EventManager";
import type { StaticClassWithData } from "./managers/DataManager";
import { DataManager } from "./managers/DataManager";
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
declare const gameDefaultConfig: {
    readonly mode: "production";
    readonly name: {
        readonly title: "";
        readonly id: "";
        readonly version: "0.0.0";
    };
    readonly settings: {
        readonly framerate: 30;
    };
    readonly initIntervalBasedManagers: true;
    readonly localStorage: Storage | undefined;
};
/**
 * A game instance.
 */
declare class Game {
    /** The static config manager for the game. */
    protected static readonly configManager: ConfigManager<GameConfigOptionsRequired>;
    /** The config object */
    readonly config: typeof Game.configManager.options;
    /**
     * The data manager for the game.
     * As of v5.0.0, all data is stored here.
     */
    readonly dataManager: DataManager;
    /** The key manager for the game. */
    readonly keyManager: KeyManager;
    /** The event manager for the game. */
    readonly eventManager: EventManager;
    /** The tickers for the game. */
    protected readonly tickers: ((dt: number) => void)[];
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
    constructor(config?: GameConfigOptions);
    /**
     * Initializes the game. Also initializes the data manager.
     * See {@link DataManager.init} for more information.
     */
    init(): void;
    /**
     * Changes the framerate of the game.
     * @param fps - The new framerate to use.
     */
    changeFps(fps: number): void;
    addData<T extends StaticClassWithData>(dataToAdd: T): T;
}
export type { GameConfigOptions };
export { Game, gameDefaultConfig };
