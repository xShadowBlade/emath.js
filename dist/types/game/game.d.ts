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
declare class gameStatic {
    staticData: {
        [key: string]: any;
    };
    constructor(staticData?: any);
    set(name: string, value: any): void;
    get(name: string): any;
}
declare class gameData {
    data: {
        [key: string]: any;
    };
    constructor(data?: any);
    set(name: string, value: any): void;
    get(name: string): any;
}
/**
 * Represents a game instance.
 */
declare class game {
    protected static configManager: configManager<RequiredDeep<gameConfigOptions>>;
    config: typeof game.configManager.options;
    data: gameData;
    static: gameStatic;
    /**
     * The data manager for the game.
     */
    dataManager: dataManager;
    /**
     * The key manager for the game.
     */
    keyManager: keyManager;
    /**
     * The event manager for the game.
     */
    eventManager: eventManager;
    protected tickers: ((dt: number) => void)[];
    /**
     * Creates a new instance of the game class.
     * @param config - The configuration object for the game.
     */
    constructor(config?: gameConfigOptions);
    /**
     * Adds a new currency section to the game. {@link gameCurrency}
     * @param name - The name of the currency section.
     * @returns A new instance of the gameCurrency class.
     */
    addCurrency(name: string): gameCurrency;
    /**
     * Adds a new currency group to the game.
     * @param name - The name of the currency group.
     * @param currencies - An array of currency names to add to the group.
     */
    addCurrencyGroup(name: string, currencies: string[]): void;
    /**
     * Adds a new attribute to the game. {@link gameAttribute} is the class.
     * @param name - The name of the attribute.
     * @param useBoost - Indicates whether to use boost for the attribute.
     * @param initial - The initial value of the attribute.
     * @returns The newly created attribute.
     */
    addAttribute(name: string, useBoost?: boolean, initial?: ESource): gameAttribute;
    /**
     * Creates a new game reset object with the specified currencies to reset.
     * @param currenciesToReset - The currencies to reset.
     * @param extender - An optional object to extend the game reset object with.
     * @returns The newly created game reset object.
     */
    addReset(currenciesToReset: gameCurrency[], extender?: gameReset): gameReset;
}
export { game, gameCurrency, gameAttribute, gameStatic, gameData, gameConfigOptions, gameDefaultConfig };
