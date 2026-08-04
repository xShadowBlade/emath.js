/**
 * @file Declares classes and functions for managing game data.
 * Ex. Saving, loading, exporting, etc.
 */
import { instanceToPlain, plainToInstance } from "class-transformer";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import "reflect-metadata"; // Required for class-transformer
import type { Game } from "../Game";
import { DataManagerEntry } from "./DataEntry";
import { EventManagerInternalEvents } from "./EventManager";

import { eMathMetadata } from "../../metadata";

// Save validation
import md5 from "md5";

import { LRUCache } from "../..";
import type { ConstructableObject, UnknownObject } from "../../common/types";

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
    // id: string;

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
 * A tuple type for the return value of {@link DataManager.useData}.
 * The first element is a function that returns the current value of the data.
 * The second element is a function that can be used to update the value of the data.
 * The second function can take either a new value or a callback function that receives the previous value and returns the new value.
 * @template T - The type of the data.
 */
type UseDataReturnType<T> = [
    dataSupplier: () => T,
    // dataSetter: ((newValue: T) => void) | ((callback: (previousValue: T) => T) => void),
    dataSetter: (newValueOrCallback: T | ((previousValue: T) => T)) => void,
];

type RawSaveData = [SaveMetadata, Record<string, unknown>];

/**
 * A class that manages game data, including saving, loading, and exporting data.
 *
 * The main methods are: {@link DataManager.saveData}, {@link DataManager.loadData}, and {@link DataManager.exportData}.
 * The other methods are used internally, but can be used for more advanced functionality / customization.
 */
class DataManager {
    /**
     * The default size of the {@link DataManager.lastSavesCached} cache.
     */
    public static readonly defaultLastSavesCacheSize = 5;

    /**
     * The current game data.
     * To access the data, use {@link DataManager.setData} and {@link DataManager.getData}.
     */
    protected readonly data: Record<string, unknown> = Object.create(null);

    protected readonly dataEntryInstances: Record<string, DataManagerEntry<unknown>> = Object.create(null);

    /** A reference to the game instance. */
    protected readonly gameRef: Game;

    /** The local storage object. */
    protected readonly localStorage: Storage | null;

    /**
     * A queue of functions to call when the game data is loaded.
     * These functions are called when calling {@link DataManager.loadData} and the data is loaded.
     * (they should have been added using class-transformer's decorators, but esbuild doesn't support decorators yet)
     */
    protected readonly eventsOnLoad: (() => void)[] = [];

    /**
     * A flag to determine whether the data can be saved or not. If set to false, calling {@link DataManager.saveData} will not save the data.
     * Set by {@link DataManager.resetData} to prevent saving data when resetting the game.
     */
    protected allowDataToBeSaved = true;

    /**
     * A cache of the last saved data.
     * Maps the current timestamp ({@link Date.now()}) to the last saved data.
     */
    protected readonly lastSavesCached: LRUCache<number, RawSaveData>;

    /**
     * The last saved data before a rollback. Used to restore the data if the rollback fails or {@link DataManager.undoRollback} is called.
     */
    protected lastDataBeforeRollback: RawSaveData | null = null;

    /**
     * Creates a new instance of the game class.
     * @param gameRef - A function that returns the game instance.
     * @param localStorage - The local storage object. Defaults to `window.localStorage`.
     * @param lastSavesCacheSize - The size of the cache for the last saved data. Defaults to {@link DataManager.defaultLastSavesCacheSize}.
     */
    constructor(gameRef: Game, localStorage?: Storage, lastSavesCacheSize = DataManager.defaultLastSavesCacheSize) {
        this.gameRef = gameRef;
        this.lastSavesCached = new LRUCache(lastSavesCacheSize);

        // Set the local storage object
        if (localStorage) {
            this.localStorage = localStorage;
        } else if (typeof window === "undefined") {
            console.warn(
                "eMath.js: window.localStorage is not supported. Methods that rely on local storage will not work. You can use compileData() and decompileData() instead to implement a custom save system or use a different storage.",
            );
            this.localStorage = null;
        } else {
            this.localStorage = window.localStorage;
        }
    }

    /**
     * Adds the given data to the cache of last saved data.
     * @param data - The data to add to the cache.
     */
    protected cacheSaveData(data: ReturnType<typeof this.compileDataRaw>): void {
        const timestamp = Date.now();
        this.lastSavesCached.set(timestamp, data);
    }

    /**
     * Gets the most recent cached save data at the given depth.
     * @param depth - The depth of the cached save data to get (how far back). Defaults to `1` (the most recent save).
     * @returns The most recent cached save data at the given depth, or undefined if there is no cached save data at that depth.
     */
    public getMostRecentCachedSave(depth = 1): ReturnType<typeof this.compileDataRaw> | undefined {
        let current = this.lastSavesCached.getFirst();

        if (!current) {
            console.warn(
                `eMath.js: getMostRecentCachedSave(): No cached save found at depth ${depth} (no cached saves). Returning undefined.`,
            );
            return undefined;
        }

        for (let i = 1; i < depth && current; i++) {
            if (!current.next) {
                console.warn(
                    `eMath.js: getLastCachedSave(): No cached save found at depth ${depth}. Returning last cached save at depth ${i}.`,
                );
                return current.value;
            }

            current = current.next;
        }

        // Should never happen, but just in case
        if (!current) return undefined;

        return current.value;
    }

    /**
     * @returns All cached saves in the order they were saved, from newest to oldest.
     */
    public getAllCachedSaves(): ReturnType<typeof this.compileDataRaw>[] {
        return Array.from(this.lastSavesCached, ([, node]) => node);
    }

    /**
     * Rolls back the game data to the last cached save at the given depth.
     * @param depth - The depth of the cached save to roll back to. See {@link DataManager.getMostRecentCachedSave} for more information.
     * @returns If no cached save is found at the given depth, returns `null`. If a cached save is found, returns the result of {@link DataManager.loadData} after loading the cached save (whether the data is valid or not).
     */
    public rollbackToLastCachedSave(depth = 1): null | boolean {
        const lastCachedSave = this.getMostRecentCachedSave(depth);
        if (!lastCachedSave) {
            console.warn(
                `eMath.js: rollbackToLastCachedSave(): No cached save found at depth ${depth}. Rollback aborted.`,
            );
            return null;
        }

        // Save the current data before rolling back
        this.lastDataBeforeRollback = this.compileDataRaw();

        return this.loadData(lastCachedSave);
    }

    /**
     * Undoes the last rollback by loading the last saved data before the rollback.
     * @returns If there is no last saved data before the rollback, returns `null`. If there is last saved data before the rollback, returns the result of {@link DataManager.loadData} after loading the last saved data before the rollback (whether the data is valid or not).
     */
    public undoRollback(): null | boolean {
        if (!this.lastDataBeforeRollback) {
            console.warn("eMath.js: undoRollback(): No rollback to undo. Undo aborted.");
            return null;
        }

        const result = this.loadData(this.lastDataBeforeRollback);
        this.lastDataBeforeRollback = null;
        return result;
    }

    /**
     * Adds an event to call when the game data is loaded.
     * @param event - The event to call when the game data is loaded.
     * @example dataManager.addEventOnLoad(() => console.log("Data loaded!"));
     */
    public addEventOnLoad(event: () => void): void {
        this.eventsOnLoad.push(event);
    }

    protected setDataInternal<T>(key: string, value: T): void {
        this.data[key] = value;

        // Notify the data entry instance if it exists
        if (this.dataEntryInstances[key]) {
            (this.dataEntryInstances[key] as DataManagerEntry<T>).notifyListeners();
        }
    }

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
    public setData<T>(key: string, value: T): () => T {
        // this.data[key] = value;
        this.setDataInternal(key, value);

        return () => this.data[key] as T;
    }

    /**
     * Sets the data for the given key and returns a getter and setter for the data.
     * @param key - The key to set the data for.
     * @param value - The initial value to set the data to.
     * @returns A tuple containing a getter and a setter for the data. The getter returns the current value of the data, and the setter can be used to update the value of the data. The setter can take either a new value or a callback function that receives the previous value and returns the new value.
     * @example
     * const [getTestData, setTestData] = dataManager.useData("test", 5);
     * console.log(getTestData()); // 5
     * setTestData(10); // Sets the data to 10
     * console.log(getTestData()); // 10
     * setTestData((prev) => prev + 5); // Updates the data to 15 using a callback
     * console.log(getTestData()); // 15
     */
    public useData<T>(key: string, value: T): UseDataReturnType<T> {
        this.setDataInternal(key, value);

        return [
            (): T => this.data[key] as T,
            (newValueOrCallback): void => {
                if (typeof newValueOrCallback === "function") {
                    this.setDataInternal(key, (newValueOrCallback as (previousValue: T) => T)(this.data[key] as T));
                    return;
                }

                this.setDataInternal(key, newValueOrCallback);
            },
        ];
    }

    /**
     * Creates a new data entry for the given key and value, or returns an existing one if it already exists.
     * @param key - The key to create the data entry for.
     * @param value - The initial value to set the data entry to.
     * @returns A new or existing data entry for the given key and value.
     */
    public useDataEntry<T>(key: string, value: T): DataManagerEntry<T> {
        if (this.dataEntryInstances[key]) {
            return this.dataEntryInstances[key] as DataManagerEntry<T>;
        }

        if (typeof value === "function") {
            console.warn(
                `eMath.js: useDataEntry(): The value for key "${key}" is a function. This may cause issues with setting the data entry`,
            );
        }

        this.data[key] = value;

        const entry = new DataManagerEntry<T>(this, key);
        this.dataEntryInstances[key] = entry;
        return entry;
    }

    /**
     * Gets the data for the given key.
     * @deprecated Set the return value of {@link setData} to a variable instead, as that is a getter and provides type checking.
     * @param key - The key to get the data for.
     * @returns The data for the given key.
     */
    public getData(key: string): unknown {
        return this.data[key];
    }

    /**
     * Adds a static class with data to the data manager. The class will be added to the data manager and its `onAddToDataManager` method will be called if it exists. When the data is loaded using {@link DataManager.loadData}, the class's `onLoadData` method will be called if it exists.
     * @param data - The static class with data to add to the data manager.
     */
    public addCustomData(data: StaticClassWithData): void {
        data.onAddToDataManager?.(this);

        this.addEventOnLoad(() => data.onLoadData?.());
    }

    /**
     * Compiles the given game data to a tuple containing the compressed game data and a hash.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @param shouldCache - Whether to cache the compiled data. Defaults to `true`.
     * @returns [hash, data] - The compressed game data and a hash as a base64-encoded string to use for saving.
     */
    public compileDataRaw(data = this.data, shouldCache = true): RawSaveData {
        // Call the `beforeCompileData` event on the game eventManager
        this.gameRef.eventManager.dispatch(EventManagerInternalEvents.beforeCompileData);

        // Convert the data to a plain object that can be stringified
        const plainGameData: UnknownObject = {};
        for (const key in data) {
            plainGameData[key] = instanceToPlain(data[key]);
        }

        // Create a hash of the data
        const hashedData = md5(`${this.gameRef.config.name.id}/${JSON.stringify(plainGameData)}`);

        // Create the metadata for the save file
        const saveMetadata: SaveMetadata = {
            hash: hashedData,
            game: {
                title: this.gameRef.config.name.title,
                id: this.gameRef.config.name.id,
                version: this.gameRef.config.name.version,
            },
            ...eMathMetadata,
        };

        // Return a tuple containing the metadata and the data
        const result = [saveMetadata, plainGameData] as RawSaveData;

        if (shouldCache) {
            this.cacheSaveData(result);
        }

        return result;
    }

    /**
     * Compresses the given game data to a UTF-16-encoded string using lz-string.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns The compressed game data and a hash as a UTF-16-encoded string to use for saving.
     */
    public compileData(data = this.data): string {
        const dataRawString = JSON.stringify(this.compileDataRaw(data));
        return compressToUTF16(dataRawString);
    }

    public getSizeOfDataBytes(data: typeof this.data): number;
    public getSizeOfDataBytes(data: string): number;
    /**
     * Gets the size of the given data in bytes.
     * @param data The data to get the size of. Can be either a string or the game data.
     * @returns The size of the data in bytes.
     */
    public getSizeOfDataBytes(data: typeof this.data | string): number {
        const stringifiedData = typeof data === "string" ? data : this.compileData(data);

        return new Blob([stringifiedData]).size;
    }

    /**
     * Decompiles the data stored in localStorage and returns the corresponding object.
     * @param data - The data to decompile. If not provided, it will be fetched from localStorage using the key `${game.config.name.id}-data`.
     * @returns The decompiled object, or null if the data is empty or invalid.
     */
    public decompileData(data?: string | null): RawSaveData | null {
        // If the data is not provided, get it from local storage
        if (!data) {
            // If local storage is not supported, return null
            if (!this.localStorage) {
                console.warn(
                    "eMath.js: Local storage is not supported. Methods that rely on local storage will not work: decompileData() requires the data to be passed as an argument.",
                );
                return null;
            }

            // Get the data from local storage
            data = this.localStorage.getItem(`${this.gameRef.config.name.id}-data`);
        }

        // If the data is empty, return null
        if (!data) return null;

        let parsedData: RawSaveData | null = null;

        try {
            // Decompress the data, then JSON parse it
            parsedData = JSON.parse(decompressFromUTF16(data)) as RawSaveData;
            return parsedData;
        } catch (error) {
            // If the data is corrupted, return null
            if (error instanceof SyntaxError) {
                console.error(`eMath.js: Failed to decompile data (corrupted) "${data}":`, error);
            } else {
                throw error;
            }
            return null;
        }
    }

    /**
     * Validates the given data using a hashing algorithm (md5)
     * @param data - [hash, data] The data to validate.
     * @returns Whether the data is valid / unchanged. False means that the data has been tampered with / save edited.
     */
    public validateData(data: RawSaveData): boolean {
        const [saveMetadata, gameDataToValidate] = data;

        // Backwards compatibility: In versions before 8.x.x, data was of type [hash: string, data: object]. Now it's of type [SaveMetadata, data: object].
        if (typeof saveMetadata === "string") {
            return md5(`${this.gameRef.config.name.id}/${JSON.stringify(gameDataToValidate)}`) === saveMetadata;
        }

        // Compare the hash of the data with the hash in the save file. If they don't match, the data has been tampered with.
        const hashSave = saveMetadata.hash;
        const hashCheck = md5(`${this.gameRef.config.name.id}/${JSON.stringify(gameDataToValidate)}`);

        return hashSave === hashCheck;
    }

    /**
     * Resets the game data to its initial state and saves it.
     * @param reload - Whether to reload the page after resetting the data. Defaults to `true`.
     * (Reloading may help with some issues with saving data)
     */
    public resetData(reload = true): void {
        // TODO: implement resetData without reloading
        if (!reload) {
            console.warn(
                "eMath.js: resetData(): Resetting data without reloading is not fully supported yet and may cause issues. It is recommended to set reload to true or implement a custom reset system by calling saveData() with the initial data.",
            );
        }

        if (typeof window === "undefined") {
            console.warn(
                "eMath.js: resetData(): Window is not defined. You can implement a custom reset system by calling saveData() with the initial data.",
            );
            return;
        }

        this.saveData(null);
        this.allowDataToBeSaved = false;
        window.location.reload();
    }

    /**
     * Saves the game data to local storage under the key `${game.config.name.id}-data`.
     * If you don't want to save to local storage, use {@link compileData} instead.
     * @param dataToSave - The data to save. If not provided, it will be fetched from localStorage using {@link compileData}. If the data is null, the save will be cleared instead.
     */
    public saveData(dataToSave: string | null = this.compileData()): void {
        // If the data is empty, throw
        if (typeof dataToSave === "undefined" || dataToSave === "") {
            console.warn("eMath.js: saveData(): Data to save is empty.");
            return;
        }

        // If local storage is not supported, throw
        if (!this.localStorage) {
            console.warn(
                "eMath.js: saveData(): Local storage is not supported. You can use compileData() instead to implement a custom save system.",
            );
            return;
        }

        // If saving data is currently not allowed, throw
        if (!this.allowDataToBeSaved) {
            console.warn("eMath.js: saveData(): Saving data is currently not allowed.");
            return;
        }

        // Call the `beforeSaveData` event on the game eventManager
        this.gameRef.eventManager.dispatch(EventManagerInternalEvents.beforeSaveData);

        // Save the data to local storage

        // If the data is null, remove the item from local storage instead of saving it as "null"
        if (dataToSave === null) {
            this.localStorage.removeItem(`${this.gameRef.config.name.id}-data`);
            return;
        }

        this.localStorage.setItem(`${this.gameRef.config.name.id}-data`, dataToSave);

        // Call the `saveData` event on the game eventManager
        this.gameRef.eventManager.dispatch(EventManagerInternalEvents.saveData);
    }

    /**
     * Compiles the game data and prompts the user to download it as a text file using {@link window.prompt}.
     * If you want to implement a custom data export, use {@link compileData} instead.
     */
    public exportData(): void {
        // Check if document is defined
        if (typeof document === "undefined") {
            console.warn(
                "eMath.js: exportData(): Document is not defined. You can use compileData() instead to implement a custom save system.",
            );
            return;
        }

        // Create the content
        const content = this.compileData();

        // Ask if user wants to download
        if (prompt("Download save data?:", content) != null) {
            const blob = new Blob([content], { type: "text/plain" });

            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `${this.gameRef.config.name.id}-save.data`;

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            URL.revokeObjectURL(downloadLink.href);
        }
    }

    /**
     * Loads game data and processes it.
     * @param dataToParse - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
     * @see {@link DataManager.loadData} for a method that also validates the data and calls onLoadData on all objects.
     */
    protected parseData(dataToParse = this.decompileData()): void {
        // No data to parse
        if (!dataToParse) return;

        // Get the loaded data from the data tuple
        const [, loadedData] = dataToParse;

        for (const key in loadedData) {
            // Check in the data that the key exists and skip otherwise
            if (typeof this.data[key] === "undefined") {
                console.warn(
                    `eMath.js: Loaded data has a key "${key}" that does not exist in the current game data. Skipping this key.`,
                );
                continue;
            }

            // If there is not a constructor for the current key, it is probably a primitive value, so just set it directly
            if (
                // TODO: currently only exists to make compiler happy, might have side effects
                this.data[key] == null ||
                typeof this.data[key].constructor === "undefined"
            ) {
                this.setDataInternal(key, loadedData[key]);
                continue;
            }

            // If there is a constructor for the current key, use class-transformer to convert the loaded data to an instance of the correct class
            this.setDataInternal(
                key,
                plainToInstance((this.data[key] as ConstructableObject).constructor, loadedData[key]),
            );
        }
    }

    /**
     * Loads game data and processes it.
     * @param dataToLoad - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
     * @returns Returns null if the data is empty or invalid, or false if the data is tampered with. Otherwise, returns true.
     */
    public loadData(dataToLoad: RawSaveData | null | string = this.decompileData()): null | boolean {
        dataToLoad = typeof dataToLoad === "string" ? this.decompileData(dataToLoad) : dataToLoad;

        // If the data is empty, return null
        if (!dataToLoad) return null;

        // Check if the data is valid
        const isDataValid = this.validateData([dataToLoad[0], instanceToPlain(dataToLoad[1])]);

        this.parseData(dataToLoad);

        // Call onLoadData on all objects
        for (const obj of this.eventsOnLoad) {
            obj();
        }

        // Call the `loadData` event on the game eventManager
        this.gameRef.eventManager.dispatch(EventManagerInternalEvents.loadData);

        return isDataValid;
    }
}

export { DataManager };
export type { SaveMetadata, StaticClassWithData, UseDataReturnType };
