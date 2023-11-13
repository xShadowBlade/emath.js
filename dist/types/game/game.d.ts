import { E } from "../eMath";
import { attribute } from "../classes/attribute";
import { keyManager } from "./keybinds";
/**
 * Configuration object for the game.
 */
interface GameConfig {
    mode: "development" | "production";
    name: {
        title: string;
        id: string;
    };
    settings: {
        framerate: number;
    };
}
/**
 * Represents a game currency.
 */
declare class GameCurrency {
    currencyPointer: () => any;
    staticPointer: () => any;
    /**
     * Creates a new instance of the Game class.
     * @param currencyPointer A function that returns the current currency value.
     * @param staticPointer A function that returns the static data for the game.
     */
    constructor(currencyPointer: () => any, staticPointer: () => any);
    /**
     * Adds an attribute with the given name and value to the game's static pointer.
     * @param name - The name of the attribute to add.
     * @param value - The value of the attribute to add.
     * @returns The newly created attribute.
     */
    addAttribute(name: string, value: E): attribute;
}
/**
 * A class that manages game data, including saving, loading, and exporting data.
 */
declare class dataManager {
    private normalData;
    private gameData;
    private gameRef;
    /**
     * Creates a new instance of the Game class.
     * @constructor
     * @param gameRef - A function that returns the Game instance.
     */
    constructor(gameRef: () => Game);
    private compileData;
    private decompileData;
    /**
     * Resets the game data to its initial state and saves it.
     * @param reload - Whether to reload the page after resetting the data. Defaults to false.
     */
    resetData(reload?: boolean): void;
    /**
     * Saves the game data to local storage.
     */
    saveData(): void;
    /**
     * Compiles the game data and prompts the user to download it as a text file.
     */
    exportData(): void;
    /**
     * Loads game data and processes it.
     */
    loadData(): void;
}
/**
 * Represents a game instance.
 */
declare class Game {
    functions: any;
    data: any;
    static: any;
    meta: GameConfig;
    dataManager: dataManager;
    keyManager: keyManager;
    /**
     * Creates a new instance of the Game class.
     * @constructor
     * @param config - The configuration object for the game.
     */
    constructor(config: GameConfig);
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
export { Game, GameConfig, GameCurrency };
