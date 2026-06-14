/**
 * @file Declares classes and functions for managing game data.
 * Ex. Saving, loading, exporting, etc.
 */
import "reflect-metadata";
import type { Game } from "../Game";
import { eMathMetadata } from "../../metadata";
import type { UnknownObject } from "../../common/types";
/**
 * Interface for the metadata of a save file.
 */
type SaveMetadata = typeof eMathMetadata & {
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
};
/**
 * An interface for static classes that have data in the data manager.
 */
interface StaticClassWithData {
    /**
     * The name of the data entry in the data manager.
     */
    /**
     * Runs when {@link DataManager.loadData} is called and the data is loaded.
     */
    onLoadData?(): void;
    /**
     * Runs when the class is added to the data manager using {@link DataManager.addCustomData}.
     * @param dataManager - A reference to the dataManager that was run on.
     */
    onAddToDataManager?(dataManager: DataManager): void;
}
/**
 * A class that manages game data, including saving, loading, and exporting data.
 *
 * The main methods are: {@link DataManager.saveData}, {@link DataManager.loadData}, and {@link DataManager.exportData}.
 * The other methods are used internally, but can be used for more advanced functionality / customization.
 */
declare class DataManager {
    /**
     * The current game data.
     * To access the data, use {@link DataManager.setData} and {@link DataManager.getData}.
     */
    private readonly data;
    /** A reference to the game instance. */
    private readonly gameRef;
    /** The local storage object. */
    private readonly localStorage;
    /**
     * A queue of functions to call when the game data is loaded.
     * These functions are called when calling {@link DataManager.loadData} and the data is loaded.
     * (they should have been added using class-transformer's decorators, but esbuild doesn't support decorators yet)
     */
    private readonly eventsOnLoad;
    /**
     * Creates a new instance of the game class.
     * @param gameRef - A function that returns the game instance.
     * @param localStorage - The local storage object. Defaults to `window.localStorage`.
     */
    constructor(gameRef: Game, localStorage?: Storage);
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
    setData<T>(key: string, value: T): () => T;
    useData<T>(key: string, value: T): [dataSupplier: () => T, dataSetter: ((newValue: T) => void) | ((callback: (previousValue: T) => T) => void)];
    /**
     * Gets the data for the given key.
     * @deprecated Set the return value of {@link setData} to a variable instead, as that is a getter and provides type checking.
     * @param key - The key to get the data for.
     * @returns The data for the given key.
     */
    getData(key: string): unknown;
    addCustomData(data: StaticClassWithData): void;
    /**
     * Compiles the given game data to a tuple containing the compressed game data and a hash.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns [hash, data] - The compressed game data and a hash as a base64-encoded string to use for saving.
     */
    compileDataRaw(data?: Record<string, unknown>): [SaveMetadata, object];
    /**
     * Compresses the given game data to a base64-encoded using lz-string.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns The compressed game data and a hash as a base64-encoded string to use for saving.
     */
    compileData(data?: Record<string, unknown>): string;
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
     * (Reloading may help with some issues with saving data)
     */
    resetData(reload?: boolean): void;
    /**
     * Saves the game data to local storage under the key `${game.config.name.id}-data`.
     * If you don't want to save to local storage, use {@link compileData} instead.
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
     * @returns The loaded data.
     */
    parseData(dataToParse?: [SaveMetadata, UnknownObject] | null): void;
    /**
     * Loads game data and processes it.
     * @param dataToLoad - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
     * @returns Returns null if the data is empty or invalid, or false if the data is tampered with. Otherwise, returns true.
     */
    loadData(dataToLoad?: [SaveMetadata, UnknownObject] | null | string): null | boolean;
}
export { DataManager };
export type { SaveMetadata, StaticClassWithData };
