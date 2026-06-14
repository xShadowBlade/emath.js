/**
 * @file Declares classes and functions for managing game data.
 * Ex. Saving, loading, exporting, etc.
 */
import "reflect-metadata"; // Required for class-transformer
import { instanceToPlain, plainToInstance } from "class-transformer";
import { compressToBase64, decompressFromBase64 } from "lz-string";
import type { Game } from "../Game";

import { eMathMetadata } from "../../metadata";

// Save validation
import md5 from "md5";

import type { UnknownObject, ConstructableObject } from "../../common/types";

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
 * A class that manages game data, including saving, loading, and exporting data.
 *
 * The main methods are: {@link DataManager.saveData}, {@link DataManager.loadData}, and {@link DataManager.exportData}.
 * The other methods are used internally, but can be used for more advanced functionality / customization.
 */
class DataManager {
    /**
     * The current game data.
     * To access the data, use {@link DataManager.setData} and {@link DataManager.getData}.
     */
    private readonly data: Record<string, unknown> = {};

    /** A reference to the game instance. */
    private readonly gameRef: Game;

    /** The local storage object. */
    private readonly localStorage: Storage | null;

    /**
     * A queue of functions to call when the game data is loaded.
     * These functions are called when calling {@link DataManager.loadData} and the data is loaded.
     * (they should have been added using class-transformer's decorators, but esbuild doesn't support decorators yet)
     */
    private readonly eventsOnLoad: (() => void)[] = [];

    /**
     * Creates a new instance of the game class.
     * @param gameRef - A function that returns the game instance.
     * @param localStorage - The local storage object. Defaults to `window.localStorage`.
     */
    constructor(gameRef: Game, localStorage?: Storage) {
        this.gameRef = gameRef;

        // Set the local storage object
        this.localStorage =
            localStorage ??
            ((): Storage | null => {
                if (typeof window === "undefined") {
                    console.warn(
                        "eMath.js: Local storage is not supported. Methods that rely on local storage will not work. You can use compileData() and decompileData() instead to implement a custom save system.",
                    );
                    return null;
                }
                return window.localStorage;
            })();
    }

    /**
     * Adds an event to call when the game data is loaded.
     * @param event - The event to call when the game data is loaded.
     * @example dataManager.addEventOnLoad(() => console.log("Data loaded!"));
     */
    public addEventOnLoad(event: () => void): void {
        this.eventsOnLoad.push(event);
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
        this.data[key] = value;

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
    public useData<T>(
        key: string,
        value: T,
    ): [dataSupplier: () => T, dataSetter: ((newValue: T) => void) | ((callback: (previousValue: T) => T) => void)] {
        this.data[key] = value;

        return [
            (): T => this.data[key] as T,
            (newValueOrCallback: T | ((previousValue: T) => T)): void => {
                if (typeof newValueOrCallback === "function") {
                    this.data[key] = (newValueOrCallback as (previousValue: T) => T)(this.data[key] as T);
                    return;
                }

                this.data[key] = newValueOrCallback;
            },
        ];
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
     * @returns [hash, data] - The compressed game data and a hash as a base64-encoded string to use for saving.
     */
    public compileDataRaw(data = this.data): [SaveMetadata, object] {
        // Call the `beforeCompileData` event on the game eventManager
        this.gameRef.eventManager.dispatch("beforeCompileData");

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
        return [saveMetadata, plainGameData];
    }

    /**
     * Compresses the given game data to a base64-encoded using lz-string.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns The compressed game data and a hash as a base64-encoded string to use for saving.
     */
    public compileData(data = this.data): string {
        const dataRawString = JSON.stringify(this.compileDataRaw(data));
        return compressToBase64(dataRawString);
    }

    /**
     * Decompiles the data stored in localStorage and returns the corresponding object.
     * @param data - The data to decompile. If not provided, it will be fetched from localStorage using the key `${game.config.name.id}-data`.
     * @returns The decompiled object, or null if the data is empty or invalid.
     */
    public decompileData(data?: string | null): [SaveMetadata, UnknownObject] | null {
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

        let parsedData: [SaveMetadata, UnknownObject];

        try {
            // Decompress the data, then JSON parse it
            parsedData = JSON.parse(decompressFromBase64(data)) as [SaveMetadata, UnknownObject];
            return parsedData;
        } catch (error) {
            // If the data is corrupted, return null
            if (error instanceof SyntaxError) {
                console.error(`Failed to decompile data (corrupted) "${data}":`, error);
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
    public validateData(data: [SaveMetadata, object]): boolean {
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
     * @param reload - Whether to reload the page after resetting the data. Defaults to `false`.
     * (Reloading may help with some issues with saving data)
     */
    public resetData(reload = false): void {
        // // If the normal data is not set, throw an error. If normalData is not set, there is nothing to reset to.
        // if (!this.normalData) {
        //     throw new Error("dataManager.resetData(): You must call init() before writing to data.");
        // }
        // // Reset the data
        // this.data = this.normalData;
        // // Save the data
        // this.saveData();
        // // Reload the page if specified
        // if (reload) window.location.reload();

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
    }

    /**
     * Saves the game data to local storage under the key `${game.config.name.id}-data`.
     * If you don't want to save to local storage, use {@link compileData} instead.
     * @param dataToSave - The data to save. If not provided, it will be fetched from localStorage using {@link compileData}. If the data is null, the save will be cleared instead.
     */
    public saveData(dataToSave: string | null = this.compileData()): void {
        // If the data is empty, throw
        if (typeof dataToSave === "undefined" || dataToSave === "") {
            console.warn("dataManager.saveData(): Data to save is empty.");
            return;
        }

        // If local storage is not supported, throw
        if (!this.localStorage) {
            console.warn(
                "dataManager.saveData(): Local storage is not supported. You can use compileData() instead to implement a custom save system.",
            );
            return;
        }

        // Call the `beforeSaveData` event on the game eventManager
        this.gameRef.eventManager.dispatch("beforeSaveData");

        // Save the data to local storage

        // If the data is null, remove the item from local storage instead of saving it as "null"
        if (dataToSave === null) {
            this.localStorage.removeItem(`${this.gameRef.config.name.id}-data`);
            return;
        }

        this.localStorage.setItem(`${this.gameRef.config.name.id}-data`, dataToSave);

        // Call the `saveData` event on the game eventManager
        this.gameRef.eventManager.dispatch("saveData");
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
            downloadLink.download = `${this.gameRef.config.name.id}-data.txt`; // Specify the file name
            downloadLink.textContent = `Download ${this.gameRef.config.name.id}-data.txt file`; // Text shown on the link

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }

    /**
     * Loads game data and processes it.
     * @param dataToParse - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
     */
    public parseData(dataToParse = this.decompileData()): void {
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
                this.data[key] = loadedData[key];
                continue;
            }

            // If there is a constructor for the current key, use class-transformer to convert the loaded data to an instance of the correct class
            this.data[key] = plainToInstance((this.data[key] as ConstructableObject).constructor, loadedData[key]);
        }
    }

    /**
     * Loads game data and processes it.
     * @param dataToLoad - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
     * @returns Returns null if the data is empty or invalid, or false if the data is tampered with. Otherwise, returns true.
     */
    public loadData(dataToLoad: [SaveMetadata, UnknownObject] | null | string = this.decompileData()): null | boolean {
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
        this.gameRef.eventManager.dispatch("loadData");

        return isDataValid;
    }
}

export { DataManager };
export type { SaveMetadata, StaticClassWithData };
