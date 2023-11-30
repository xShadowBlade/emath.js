/**
 * @file Declares classes and functions for managing game data.
 * Ex. Saving, loading, exporting, etc.
 */
import { game } from "../game";
import "reflect-metadata";
/**
 * A class that manages game data, including saving, loading, and exporting data.
 */
declare class dataManager {
    private normalData;
    private gameData;
    private gameRef;
    /**
     * Creates a new instance of the game class.
     * @param gameRef - A function that returns the game instance.
     */
    constructor(gameRef: game);
    /**
     * Compresses the given game data to a base64-encoded string.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns The compressed game data as a base64-encoded string.
     */
    private compileData;
    /**
     * Decompiles the data stored in localStorage and returns the corresponding object.
     * @param data - The data to decompile. If not provided, it will be fetched from localStorage.
     * @returns The decompiled object, or null if the data is empty or invalid.
     */
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
 * Function to convert a class or and object to a string that can be used to recreate the class when loaded.
 * @param class - The class to convert to a string.
 * Classes are converted to strings using the following format:
 * ```<EMATHJSONCLASS>${class.name}/${// All nonstatic properties of the class in an object}```
 * @deprecated I should stop trying to reinvent the wheel.
 * @example
class myClass {
    static af: number = 23;
    static ab () { return 232 };

    asd: number;
    constructor (asd) {
        this.asd = asd;
    }
}

const a = new myClass(232);

classToJsonString(a); // `a/{"asd": 232}`
 */
/**
 * Function to convert a string created by classToJsonString() back into a class.
 * @param string - The string to convert to a class.
 * @deprecated I should stop trying to reinvent the wheel.
 */
export { dataManager };
