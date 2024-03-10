/**
 * @file Declares classes and functions for managing game data.
 * Ex. Saving, loading, exporting, etc.
 */
import type { game } from "../game";
type ClassType = new (...args: any[]) => any;
type UnknownObject = Record<string, unknown>;
/**
 * A class that manages game data, including saving, loading, and exporting data.
 *
 * The main methods are: {@link dataManager.saveData}, {@link dataManager.loadData}, and {@link dataManager.exportData}.
 * The other methods are used internally, but can be used for more advanced functionality / customization.
 */
declare class dataManager {
    /**
     * Game data in its initial state.
     */
    private normalData?;
    /**
     * Game data in its initial state, as a plain object.
     */
    private normalDataPlain?;
    /**
     * The current game data.
     */
    private data;
    /**
     * The static game data.
     */
    private static;
    /**
     * A reference to the game instance.
     */
    private gameRef;
    /** A queue of functions to call when the game data is loaded. */
    private eventsOnLoad;
    /**
     * Creates a new instance of the game class.
     * @param gameRef - A function that returns the game instance.
     */
    constructor(gameRef: game | (() => game));
    /**
     * Adds an event to call when the game data is loaded.
     * @param event - The event to call when the game data is loaded.
     * @example dataManager.addEventOnLoad(() => console.log("Data loaded!"));
     */
    addEventOnLoad(event: () => void): void;
    /**
     * Sets the data for the given key.
     * @template s - The key to set the data for.
     * @template t - The value to set the data to.
     * @param key - The key to set the data for.
     * @param value - The value to set the data to.
     * @returns An object with a single entry of the name of the key and the value of the data. This is a getter and setter.
     * @example
     * ! WARNING: Do not destruct the `value` property, as it will remove the getter and setter.
     * const testData = dataManager.setData("test", 5);
     * console.log(testData.value); // 5
     * testData.value = 10; // Also sets the data
     * console.log(testData.value); // 10
     */
    setData<s extends string, t>(key: s, value: t): {
        value: t;
        /** @deprecated Use the setter instead. */
        setValue: (valueToSet: t) => void;
    };
    /**
     * Gets the data for the given key.
     * @deprecated Set the return value of {@link setData} to a variable instead, as that is a getter and provides type checking.
     * @param key - The key to get the data for.
     * @returns The data for the given key.
     */
    getData(key: string): unknown | undefined;
    /**
     * Sets the static data for the given key.
     * @param key - The key to set the static data for.
     * @param value - The value to set the static data to.
     * @returns A getter for the static data.
     */
    setStatic<t>(key: string, value: t): t;
    /**
     * Gets the static data for the given key.
     * @deprecated Set the return value of {@link setStatic} to a variable instead, as that is a getter and provides type checking.
     * @param key - The key to get the static data for.
     * @returns The static data for the given key.
     */
    getStatic(key: string): unknown | undefined;
    /**
     * Initializes / sets data that is unmodified by the player.
     * This is used to merge the loaded data with the default data.
     * It should be called before you load data.
     * Note: This should only be called once, and after it is called, you should not add new properties to data.
     * @example dataManager.init(); // Call this after setting the initial data.
     */
    init(): void;
    /**
     * Compiles the given game data to a tuple containing the compressed game data and a hash.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns [hash, data] - The compressed game data and a hash as a base64-encoded string to use for saving.
     */
    private compileDataRaw;
    /**
     * Compresses the given game data to a base64-encoded using lz-string, or btoa if lz-string is not available.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns The compressed game data and a hash as a base64-encoded string to use for saving.
     */
    compileData(data?: UnknownObject): string;
    /**
     * Decompiles the data stored in localStorage and returns the corresponding object.
     * @param data - The data to decompile. If not provided, it will be fetched from localStorage using the key `${game.config.name.id}-data`.
     * @returns The decompiled object, or null if the data is empty or invalid.
     */
    decompileData(data?: string | null): [string, UnknownObject] | null;
    /**
     * Validates the given data using a hashing algorithm (md5)
     * @param data - [hash, data] The data to validate.
     * @returns Whether the data is valid / unchanged. False means that the data has been tampered with / save edited.
     */
    validateData(data: [string, object]): boolean;
    /**
     * Resets the game data to its initial state and saves it.
     * @param reload - Whether to reload the page after resetting the data. Defaults to `false`.
     */
    resetData(reload?: boolean): void;
    /**
     * Saves the game data to local storage under the key `${game.config.name.id}-data`.
     * If you dont want to save to local storage, use {@link compileData} instead.
     * @param dataToSave - The data to save. If not provided, it will be fetched from localStorage using {@link compileData}.
     */
    saveData(dataToSave?: string): void;
    /**
     * Compiles the game data and prompts the user to download it as a text file using {@link window.prompt}.
     * If you want to implement a custom data export, use {@link compileData} instead.
     */
    exportData(): void;
    /**
     * Loads game data and processes it.
     * @param dataToParse - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
     * @param mergeData - Whether to merge the loaded data with the normal data. Defaults to `true`.
     * Warning: If set to `false`, the loaded data may have missing properties and may cause errors.
     * @returns The loaded data.
     */
    parseData(dataToParse?: [string, UnknownObject] | null, mergeData?: boolean): UnknownObject | null;
    /**
     * Loads game data and processes it.
     * @param dataToLoad - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
     * @returns Returns null if the data is empty or invalid, or false if the data is tampered with. Otherwise, returns true.
     */
    loadData(dataToLoad?: [string, UnknownObject] | null | string): null | boolean;
}
export { dataManager };
export type { UnknownObject, ClassType };
