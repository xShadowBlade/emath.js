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
interface gameConfigOptions {
    mode?: "development" | "production";
    name: {
        title?: string;
        id: string;
    };
    settings?: {
        framerate?: number;
    };
    initIntervalBasedManagers?: boolean;
}
declare const gameDefaultConfig: RequiredDeep<gameConfigOptions>;
/**
 * Represents a game instance.
 */
declare class game {
    protected static configManager: configManager<RequiredDeep<gameConfigOptions>>;
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
    addCurrency(name: string): gameCurrency;
    /**
     * Adds a new currency group to the game.
     * @deprecated Use {@link addCurrency} instead. This method is buggy and will be removed in a future version.
     * @param name - The name of the currency group.
     * @param currencies - An array of currency names to add to the group.
     * @returns An array of gameCurrency objects, in the same order as the input array.
     */
    addCurrencyGroup(name: string, currencies: string[]): gameCurrency[];
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
    addReset(currenciesToReset: gameCurrency | gameCurrency[], extender?: gameReset): gameReset;
}
export { game, gameCurrency, gameAttribute, gameConfigOptions, gameDefaultConfig, Pointer };
