import { E } from "../eMath";
import { attribute } from "../classes/attribute";
import { keyManager } from "./keyManager";
import { eventManager } from "./main";
import { dataManager } from "./dataManager";
import { configManager, RequiredDeep } from "./configManager";
/**
 * Represents a game currency.
 */
declare class GameCurrency {
    currencyPointer: any;
    staticPointer: any;
    /**
     * Creates a new instance of the Game class.
     * @param currencyPointer A function that returns the current currency value.
     * @param staticPointer A function that returns the static data for the game.
     */
    constructor(currencyPointer: any, staticPointer: any);
    /**
     * Adds an attribute with the given name and value to the game's static pointer.
     * @param name - The name of the attribute to add.
     * @param value - The value of the attribute to add.
     * @returns The newly created attribute.
     */
    addAttribute(name: string, value: E): attribute;
}
interface GameConfigOptions {
    mode?: "development" | "production";
    name: {
        title?: string;
        id: string;
    };
    settings?: {
        framerate?: number;
    };
}
declare const GameDefaultConfig: RequiredDeep<GameConfigOptions>;
/**
 * Represents a game instance.
 */
declare class Game {
    protected static configManager: configManager<RequiredDeep<GameConfigOptions>>;
    functions: any;
    data: any;
    static: any;
    config: typeof Game.configManager.options;
    dataManager: dataManager;
    keyManager: keyManager;
    eventManager: eventManager;
    private tickers;
    /**
     * Creates a new instance of the Game class.
     * @constructor
     * @param config - The configuration object for the game.
     */
    constructor(config?: GameConfigOptions);
    /**
     * Adds a new currency section to the game.
     * @param name - The name of the currency section.
     * @returns A new instance of the GameCurrency class.
     */
    addCurrency(name: string): GameCurrency;
    /**
     * Adds a new currency group to the game.
     * @param name - The name of the currency group.
     * @param currencies - An array of currency names to add to the group.
     */
    addCurrencyGroup(name: string, currencies: string[]): void;
}
export { Game, GameCurrency, GameConfigOptions, GameDefaultConfig };
