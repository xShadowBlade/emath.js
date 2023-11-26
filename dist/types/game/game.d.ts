import { keyManager } from "./managers/keyManager";
import { eventManager } from "./managers/eventManager";
import { dataManager } from "./managers/dataManager";
import { gameCurrency } from "./gameCurrency";
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
}
declare const gameDefaultConfig: RequiredDeep<gameConfigOptions>;
declare class gameStatic {
    staticData: any;
    constructor(staticData?: any);
    set(name: string, value: any): void;
    get(name: string): any;
}
declare class gameData {
    data: any;
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
     * @constructor
     * @param config - The configuration object for the game.
     */
    constructor(config?: gameConfigOptions);
    /**
     * Adds a new currency section to the game.
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
     * Creates a new game reset object with the specified currencies to reset.
     * @param currenciesToReset - The currencies to reset.
     * @returns The newly created game reset object.
     */
    addReset(currenciesToReset: gameCurrency[], extender?: gameReset): gameReset;
}
export { game, gameCurrency, gameStatic, gameData, gameConfigOptions, gameDefaultConfig };
