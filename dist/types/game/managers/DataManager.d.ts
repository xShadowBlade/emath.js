/**
 * @file Declares classes and functions for managing game data.
 * Ex. Saving, loading, exporting, etc.
 */
import "reflect-metadata";
import type { Game } from "../Game";
import type { UnknownObject, Pointer } from "../../common/types";
/**
 * Interface for the metadata of a save file.
 */
interface SaveMetadata {
    /** The hash of the game data (Default hash is MD5) Used to check for tampering. */
    hash: string;
    /** Metadata about the game. */
    game: {
        /** The title of the game. */
        title: string;
        /** The id of the game. */
        id: string;
        /** The version of the game. */
        version: string;
    };
    /** Metadata about the eMath library. */
    emath: {
        /** The version of the eMath library. */
        version: string;
    };
}
/**
 * A class that manages game data, including saving, loading, and exporting data.
 *
 * The main methods are: {@link DataManager.saveData}, {@link DataManager.loadData}, and {@link DataManager.exportData}.
 * The other methods are used internally, but can be used for more advanced functionality / customization.
 */
declare class DataManager {
    /**
     * Game data in its initial state.
     * This is used to merge the loaded data with the default data, when calling {@link DataManager.parseData}.
     * It is set when calling {@link DataManager.init}.
     */
    private normalData?;
    /**
     * Game data in its initial state, as a plain object.
     * This is used to merge the loaded data with the default data, when calling {@link DataManager.parseData}.
     * It is set when calling {@link DataManager.init}.
     */
    private normalDataPlain?;
    /**
     * The current game data.
     * To access the data, use {@link DataManager.setData} and {@link DataManager.getData}.
     */
    private data;
    /**
     * The static game data.
     * @deprecated Static data is basically useless and should not be used. Use variables in local scope instead.
     */
    private static;
    /** A reference to the game instance. */
    private readonly gameRef;
    /**
     * A queue of functions to call when the game data is loaded.
     * These functions are called when calling {@link DataManager.loadData} and the data is loaded.
     * (they should have been added using class-transformer's decorators, but esbuild doesn't support decorators yet)
     */
    private readonly eventsOnLoad;
    /**
     * Creates a new instance of the game class.
     * @param gameRef - A function that returns the game instance.
     */
    constructor(gameRef: Pointer<Game>);
    /**
     * Adds an event to call when the game data is loaded.
     * @param event - The event to call when the game data is loaded.
     * @example dataManager.addEventOnLoad(() => console.log("Data loaded!"));
     */
    addEventOnLoad(event: () => void): void;
    /**
     * Sets the data for the given key.
     * The getter is a work in progress.
     * @template S - The key to set the data for.
     * @template T - The value to set the data to.
     * @param key - The key to set the data for.
     * @param value - The value to set the data to.
     * @returns An object with a single entry of the name of the key and the value of the data. This is a getter and setter.
     * @example
     * // ! WARNING: Do not destruct the `value` property, as it will remove the getter and setter.
     * const testData = dataManager.setData("test", 5);
     * console.log(testData.value); // 5
     * testData.value = 10; // Also sets the data
     * console.log(testData.value); // 10
     */
    setData<S extends string, T>(key: S, value: T): {
        value: T;
        /** @deprecated Use the setter instead. */
        setValue: (valueToSet: T) => void;
    };
    /**
     * Gets the data for the given key.
     * @deprecated Set the return value of {@link setData} to a variable instead, as that is a getter and provides type checking.
     * @param key - The key to get the data for.
     * @returns The data for the given key.
     */
    getData(key: string): unknown;
    /**
     * Sets the static data for the given key.
     * This data is not affected by data loading and saving, and is mainly used internally.
     * @deprecated Static data is basically useless and should not be used. Use variables in local scope instead.
     * @param key - The key to set the static data for.
     * @param value - The value to set the static data to.
     * @returns A getter for the static data.
     */
    setStatic<t>(key: string, value: t): t;
    /**
     * Gets the static data for the given key.
     * @deprecated Set the return value of {@link setStatic} to a variable instead, as that is a getter and provides type checking. Also, static data is basically useless and should not be used. Use variables in local scope instead.
     * @param key - The key to get the static data for.
     * @returns The static data for the given key.
     */
    getStatic(key: string): unknown;
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
    compileDataRaw(data?: UnknownObject): [SaveMetadata, object];
    /**
     * Compresses the given game data to a base64-encoded using lz-string.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns The compressed game data and a hash as a base64-encoded string to use for saving.
     */
    compileData(data?: UnknownObject): string;
    /**
     * Decompiles the data stored in localStorage and returns the corresponding object.
     * @param data - The data to decompile. If not provided, it will be fetched from localStorage using the key `${game.config.name.id}-data`.
     * @returns The decompiled object, or null if the data is empty or invalid.
     */
    decompileData(data?: string | null): [SaveMetadata, UnknownObject] | null;
    /**
     * Validates the given data using a hashing algorithm (md5)
     * @param data - [hash, data] The data to validate.
     * @returns Whether the data is valid / unchanged. False means that the data has been tampered with / save edited.
     */
    validateData(data: [SaveMetadata, object]): boolean;
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
    parseData(dataToParse?: [SaveMetadata, UnknownObject] | null, mergeData?: boolean): UnknownObject | null;
    /**
     * Loads game data and processes it.
     * @param dataToLoad - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
     * @returns Returns null if the data is empty or invalid, or false if the data is tampered with. Otherwise, returns true.
     */
    loadData(dataToLoad?: [SaveMetadata, UnknownObject] | null | string): null | boolean;
}
export { DataManager };
export type { SaveMetadata };
