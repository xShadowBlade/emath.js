/**
 * @file Declares classes and functions for managing game data.
 * Ex. Saving, loading, exporting, etc.
 */
import "reflect-metadata"; // Required for class-transformer
import { instanceToPlain, plainToInstance } from "class-transformer";
import { compressToBase64, decompressFromBase64 } from "lz-string";
import type { Game } from "../Game";

import { eMathMetadata } from "../../metadata";

// Recursive plain to class
import { Currency } from "../../classes/Currency";
import { UpgradeData } from "../../classes/Upgrade";
import { ItemData } from "../../classes/Item";
import { Decimal } from "../../E/e";

// Save validation
import md5 from "md5";

import type { UnknownObject, ClassType, ConstructableObject, Pointer } from "../../common/types";

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
 * Checks if the given object is a plain object.
 * @param obj - The object to check.
 * @returns Whether the object is a plain object.
 */
function isPlainObject(obj: unknown): boolean {
    return typeof obj === "object" && obj?.constructor === Object;
}

const objectHasOwnProperty = (obj: UnknownObject, key: string): boolean =>
    Object.prototype.hasOwnProperty.call(obj, key);

/**
 * Merge properties from the normal data to the loaded data. This is to ensure that new properties are added to the loaded data.
 * @deprecated use Object.assign instead
 * @param sourcePlain - The plain source object to reference if the property is missing from the target.
 * @param source - The source object to merge from.
 * @param target - The target object.
 * @returns The merged object.
 */
function deepMerge(
    sourcePlain: UnknownObject | null | undefined,
    source: UnknownObject | null | undefined,
    target: UnknownObject | null,
): UnknownObject {
    if (!sourcePlain || !source || !target) {
        console.warn("eMath.js: dataManager.deepMerge(): Missing arguments:", sourcePlain, source, target);
        return target ?? {};
    }

    const out = target;
    for (const key in sourcePlain) {
        if (objectHasOwnProperty(sourcePlain, key) && !objectHasOwnProperty(target, key)) {
            // If the property is missing from the target, add it
            out[key] = sourcePlain[key];
        }
        // Special case for currency.upgrades
        if (source[key] instanceof Currency) {
            const sourceCurrency = sourcePlain[key] as Currency;
            const targetCurrency = target[key] as Currency;

            // Backwards compatibility: In versions before 8.x.x, upgrades was of type UpgradeData[]. Now it's of type Record<string, UpgradeData>.
            // Convert the old format to the new format
            if (Array.isArray(targetCurrency.upgrades)) {
                const upgrades = targetCurrency.upgrades;
                targetCurrency.upgrades = {};
                for (const upgrade of upgrades) {
                    // ! warning: might not work
                    targetCurrency.upgrades[(upgrade as UpgradeData).id] = upgrade as UpgradeData;
                }
            }

            // Merge upgrades
            targetCurrency.upgrades = {
                ...sourceCurrency.upgrades,
                ...targetCurrency.upgrades,
            };
            out[key] = targetCurrency;

            // Merge items
            targetCurrency.items = {
                ...sourceCurrency.items,
                ...targetCurrency.items,
            };
        } else if (isPlainObject(sourcePlain[key]) && isPlainObject(target[key])) {
            // Recursive
            out[key] = deepMerge(
                (sourcePlain as Record<string, UnknownObject>)[key],
                (source as Record<string, UnknownObject>)[key],
                (target as Record<string, UnknownObject>)[key],
            );
        }
    }
    return out;
}

// Special cases for Currency.upgrades and Currency.items
const upgradeDataProperties = Object.getOwnPropertyNames(new UpgradeData({ id: "", level: Decimal.dZero }));
const itemDataProperties = Object.getOwnPropertyNames(new ItemData({ id: "", amount: Decimal.dZero }));

/**
 * Converts a plain object to a class instance.
 * @param templateClassToConvert - The template class to convert to.
 * @param plain - The plain object to convert.
 * @returns The converted class instance.
 */
function convertTemplateClass(templateClassToConvert: ClassType, plain: UnknownObject): ClassType {
    // Convert the object
    const out = plainToInstance(templateClassToConvert, plain) as ClassType;

    if (out instanceof Currency) {
        // Special case for Currency.upgrades
        for (const upgradeName in out.upgrades) {
            const upgrade = out.upgrades[upgradeName] as UpgradeData | undefined;

            if (
                !upgrade ||
                !upgradeDataProperties.every((prop) => Object.getOwnPropertyNames(upgrade).includes(prop))
            ) {
                // Delete the upgrade if it's invalid (extraneous properties, etc.)
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete out.upgrades[upgradeName];
                continue;
            }
            out.upgrades[upgradeName] = plainToInstance(UpgradeData, upgrade);
        }

        // Special case for Currency.items
        for (const itemName in out.items) {
            const item = out.items[itemName] as ItemData | undefined;

            if (!item || !itemDataProperties.every((prop) => Object.getOwnPropertyNames(item).includes(prop))) {
                // Delete the item if it's invalid (extraneous properties, etc.)
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete out.items[itemName];
                continue;
            }
            out.items[itemName] = plainToInstance(ItemData, item);
        }
    }
    if (!out) {
        throw new Error(`Failed to convert ${templateClassToConvert.name} to class instance.`);
    }
    return out;
}

/**
 * Converts a plain object to a class instance.
 * @param normal - The normal data to reference.
 * @param plain - The plain object to convert.
 * @returns The converted class instance.
 */
function plainToInstanceRecursive(
    normal: UnknownObject | null | undefined,
    plain?: UnknownObject | null | undefined,
): UnknownObject {
    if (!normal || !plain) {
        throw new Error("dataManager.plainToInstanceRecursive(): Missing arguments.");
    }
    const out = plain;
    for (const key in normal) {
        if (plain[key] === undefined) {
            // Should not happen
            console.warn(`eMath.js: Missing property "${key}" in loaded data.`);
            continue;
        }

        // If it's not an object, skip
        if (!isPlainObject(plain[key])) continue;

        // Convert the object using the normal data
        const normalDataClass = (normal[key] as ConstructableObject).constructor;

        // Check if the object is a plain object
        if (normalDataClass === Object) {
            // If the object doesn't match a template class, convert it recursively
            (out as Record<string, object>)[key] = plainToInstanceRecursive(
                (normal as Record<string, UnknownObject>)[key],
                (plain as Record<string, UnknownObject>)[key],
            );
            continue;
        }

        // console.log("Normal data class: ", normalDataClass);
        out[key] = convertTemplateClass(normalDataClass, (plain as Record<string, UnknownObject>)[key]);
    }
    return out;
}

/**
 * A class that manages game data, including saving, loading, and exporting data.
 *
 * The main methods are: {@link DataManager.saveData}, {@link DataManager.loadData}, and {@link DataManager.exportData}.
 * The other methods are used internally, but can be used for more advanced functionality / customization.
 */
class DataManager {
    /**
     * Game data in its initial state.
     * This is used to merge the loaded data with the default data, when calling {@link DataManager.parseData}.
     * It is set when calling {@link DataManager.init}.
     */
    private normalData?: UnknownObject;

    /**
     * Game data in its initial state, as a plain object.
     * This is used to merge the loaded data with the default data, when calling {@link DataManager.parseData}.
     * It is set when calling {@link DataManager.init}.
     */
    private normalDataPlain?: UnknownObject;

    /**
     * The current game data.
     * To access the data, use {@link DataManager.setData} and {@link DataManager.getData}.
     */
    private data: UnknownObject = {};

    /**
     * The static game data.
     * @deprecated Static data is basically useless and should not be used. Use variables in local scope instead.
     */
    private static: UnknownObject = {};

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
    constructor(gameRef: Pointer<Game>, localStorage?: Storage) {
        this.gameRef = typeof gameRef === "function" ? gameRef() : gameRef;

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
    public setData<S extends string, T>(
        key: S,
        value: T,
    ): {
        value: T;
        /** @deprecated Use the setter instead. */
        setValue: (valueToSet: T) => void;
    } {
        if (typeof this.data[key] === "undefined" && this.normalData) {
            console.warn("eMath.js: After initializing data, you should not add new properties to data.");
        }
        this.data[key] = value;
        const thisData = (): UnknownObject => this.data;

        return {
            get value(): T {
                // console.log("Getter called", key, thisData()[key]);
                return thisData()[key] as T;
            },
            set value(valueToSet: T) {
                // console.log("Setter called", key, valueToSet);
                thisData()[key] = valueToSet;
            },
            setValue(valueToSet: T): void {
                // console.log("Setter called", key, valueToSet);
                thisData()[key] = valueToSet;
            },
        };
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
     * Sets the static data for the given key.
     * This data is not affected by data loading and saving, and is mainly used internally.
     * @deprecated Static data is basically useless and should not be used. Use variables in local scope instead.
     * @param key - The key to set the static data for.
     * @param value - The value to set the static data to.
     * @returns A getter for the static data.
     */
    public setStatic<T>(key: string, value: T): T {
        console.warn(
            "eMath.js: setStatic: Static data is basically useless and should not be used. Use variables in local scope instead.",
        );

        if (typeof this.static[key] === "undefined" && this.normalData) {
            console.warn("eMath.js: After initializing data, you should not add new properties to staticData.");
        }
        this.static[key] = value;
        return this.static[key] as T;
    }

    /**
     * Gets the static data for the given key.
     * @deprecated Set the return value of {@link setStatic} to a variable instead, as that is a getter and provides type checking. Also, static data is basically useless and should not be used. Use variables in local scope instead.
     * @param key - The key to get the static data for.
     * @returns The static data for the given key.
     */
    public getStatic(key: string): unknown {
        console.warn(
            "eMath.js: Static data is basically useless and should not be used. Use variables in local scope instead.",
        );

        return this.static[key];
    }

    /**
     * Initializes / sets data that is unmodified by the player.
     * This is used to merge the loaded data with the default data.
     * It should be called before you load data.
     * Note: This should only be called once, and after it is called, you should not add new properties to data.
     * @example dataManager.init(); // Call this after setting the initial data.
     */
    public init(): void {
        this.normalData = this.data;
        this.normalDataPlain = instanceToPlain(this.data);
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
        const gameDataString = instanceToPlain(data);

        // Create a hash of the data
        const hashedData = md5(`${this.gameRef.config.name.id}/${JSON.stringify(gameDataString)}`);

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
        return [saveMetadata, gameDataString];
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
        // If the normal data is not set, throw an error. If normalData is not set, there is nothing to reset to.
        if (!this.normalData) {
            throw new Error("dataManager.resetData(): You must call init() before writing to data.");
        }

        // Reset the data
        this.data = this.normalData;

        // Save the data
        this.saveData();

        // Reload the page if specified
        if (reload) window.location.reload();
    }

    /**
     * Saves the game data to local storage under the key `${game.config.name.id}-data`.
     * If you don't want to save to local storage, use {@link compileData} instead.
     * @param dataToSave - The data to save. If not provided, it will be fetched from localStorage using {@link compileData}.
     */
    public saveData(dataToSave = this.compileData()): void {
        // Call the `beforeSaveData` event on the game eventManager
        this.gameRef.eventManager.dispatch("beforeSaveData");

        // If the data is empty, throw
        if (!dataToSave) {
            throw new Error("dataManager.saveData(): Data to save is empty.");
        }

        // If local storage is not supported, throw
        if (!this.localStorage) {
            throw new Error(
                "dataManager.saveData(): Local storage is not supported. You can use compileData() instead to implement a custom save system.",
            );
        }

        // Save the data to local storage
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
     * @param mergeData - Whether to merge the loaded data with the normal data. Defaults to `true`.
     * Warning: If set to `false`, the loaded data may have missing properties and may cause errors.
     * @returns The loaded data.
     */
    public parseData(dataToParse = this.decompileData(), mergeData = true): UnknownObject | null {
        // If the normal data is not set, throw an error
        if ((!this.normalData || !this.normalDataPlain) && mergeData) {
            throw new Error("dataManager.parseData(): You must call init() before writing to data.");
        }

        // If the data is empty, return null
        if (!dataToParse) return null;

        // Get the loaded data from the data tuple
        const [, loadedData] = dataToParse;

        // Merge the loaded data with the normal data, if specified
        const loadedDataMerged = !mergeData ? loadedData : deepMerge(this.normalDataPlain, this.normalData, loadedData);

        // Recursively convert the loaded data to class instances
        return plainToInstanceRecursive(this.normalData, loadedDataMerged);
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

        // TODO: dataToLoad somehow plainToInstance?
        const parsedData = this.parseData(dataToLoad);

        // If the data is empty, return null
        if (!parsedData) return null;

        // Set the data
        this.data = parsedData;

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
export type { SaveMetadata };
