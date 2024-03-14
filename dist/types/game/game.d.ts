/**
 * @file Declares the main game class.
 */
import { ESource } from "../E/eMain";
import { keyManager } from "./managers/keyManager";
import { eventManager } from "./managers/eventManager";
import { dataManager } from "./managers/dataManager";
import { gameCurrency } from "./gameCurrency";
import { gameAttribute } from "./gameAttribute";
import { gameReset } from "./resetLayer";
import { configManager, RequiredDeep } from "./managers/configManager";
/**
 * A pointer to a value or a function that returns a value by reference.
 */
type Pointer<T> = (() => T) | T;
/**
 * The game configuration interface. Some options are not used internally, but you can access them by using `game.config`.
 */
interface gameConfigOptions {
    /** The mode to run the game in. Not used internally. */
    mode?: "development" | "production";
    /** The name of the game. Not used internally. */
    name: {
        /** The title of the game.  */
        title?: string;
        /** The ID of the game. Used for naming saves. */
        id: string;
        /** The version of the game. Not used internally. */
        version?: string;
    };
    /** The settings for the game. */
    settings?: {
        /** The framerate to use for the game and various managers. Defaults to `30` */
        framerate?: number;
    };
    /**
     * Whether or not to automatically initialize the interval-based managers.
     * Warning: If you set this to `false`, you will need to manually call `keyManager.init()` and `eventManager.init()` to initialize them.
     */
    initIntervalBasedManagers?: boolean;
}
declare const gameDefaultConfig: RequiredDeep<gameConfigOptions>;
/**
 * Represents a game instance.
 */
declare class game {
    protected static configManager: configManager<RequiredDeep<gameConfigOptions>>;
    /** The config object */
    config: typeof game.configManager.options;
    /**
     * The data manager for the game.
     * As of v5.0.0, all data is stored here.
     */
    dataManager: dataManager;
    /** The key manager for the game. */
    keyManager: keyManager;
    /** The event manager for the game. */
    eventManager: eventManager;
    protected tickers: ((dt: number) => void)[];
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
    constructor(config?: gameConfigOptions);
    /** Initializes the game. Also initializes the data manager. */
    init(): void;
    /**
     * Changes the framerate of the game.
     * @param fps - The new framerate to use.
     */
    changeFps(fps: number): void;
    /**
     * Adds a new currency section to the game. {@link gameCurrency} is the class.
     * It automatically adds the currency and currencyStatic objects to the data and static objects for saving and loading.
     * @param name - The name of the currency section. This is also the name of the data and static objects, so it must be unique.
     * @returns A new instance of the gameCurrency class.
     * @example
     * const currency = game.addCurrency("currency");
     * currency.static.gain();
     * console.log(currency.value); // E(1)
     */
    addCurrency<Name extends string>(name: Name): gameCurrency<Name>;
    /**
     * Adds a new attribute to the game. {@link gameAttribute} is the class.
     * It automatically adds the attribute and attributeStatic objects to the data and static objects for saving and loading.
     * @param name - The name of the attribute.
     * @param useBoost - Indicates whether to use boost for the attribute.
     * @param initial - The initial value of the attribute.
     * @returns The newly created attribute.
     * @example
     * const myAttribute = game.addAttribute("myAttribute");
     */
    addAttribute(name: string, useBoost?: boolean, initial?: ESource): gameAttribute;
    /**
     * Creates a new game reset object with the specified currencies to reset.
     * @param currenciesToReset - The currencies to reset.
     * @param extender - An optional object to extend the game reset object with.
     * @returns The newly created game reset object.
     */
    addReset(currenciesToReset: gameCurrency<string> | gameCurrency<string>[], extender?: gameReset): gameReset;
}
export { game, gameCurrency, gameAttribute, gameConfigOptions, gameDefaultConfig, Pointer };
