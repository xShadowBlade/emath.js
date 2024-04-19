/**
 * @file Declares classes and functions for managing game data.
 * Ex. Saving, loading, exporting, etc.
 */
import "reflect-metadata"; // Required for class-transformer
import { instanceToPlain, plainToInstance } from "class-transformer";
import { compressToBase64, decompressFromBase64 } from "lz-string";
import type { Game, Pointer } from "../Game";

// Recursive plain to class
import { Currency } from "../../classes/Currency";
// import { boost, boostObject } from "../../classes/boost";
import { Attribute } from "../../classes/Attribute";
// import { Decimal } from "../../E/old/e";
import { Decimal } from "../../E/e";
import { UpgradeData } from "../../classes/Upgrade";
import { E } from "../../E/eMain";

// Save validation
import md5 from "md5";

/** A class constructor */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassType = new (...args: any[]) => any;
/** A plain object with unknown properties. */
type UnknownObject = Record<string, unknown>;
// type plainTypes = string | number | boolean | UnknownObject | unknown[];

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
class DataManager {
    /**  Game data in its initial state. */
    private normalData?: UnknownObject;

    /** Game data in its initial state, as a plain object. */
    private normalDataPlain?: UnknownObject;

    /** The current game data. */
    private data: UnknownObject = {};

    /** The static game data. */
    private static: UnknownObject = {};

    /** A reference to the game instance. */
    private readonly gameRef: Game;

    /** A queue of functions to call when the game data is loaded. */
    private readonly eventsOnLoad: (() => void)[] = [];

    /**
     * Creates a new instance of the game class.
     * @param gameRef - A function that returns the game instance.
     */
    constructor (gameRef: Pointer<Game>) {
        // if (typeof window === "undefined") { // Don't run on serverside
        //     throw new Error("dataManager cannot be run on serverside");
        // }
        this.gameRef = typeof gameRef === "function" ? gameRef() : gameRef;
    }

    /**
     * Adds an event to call when the game data is loaded.
     * @param event - The event to call when the game data is loaded.
     * @example dataManager.addEventOnLoad(() => console.log("Data loaded!"));
     */
    public addEventOnLoad (event: () => void): void {
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
    public setData<S extends string, T> (key: S, value: T):
        // { [data in s]: t; }
        {
            value: T;
            /** @deprecated Use the setter instead. */
            setValue: (valueToSet: T) => void;
        }
    {
        if (typeof this.data[key] === "undefined" && this.normalData) {
            console.warn("After initializing data, you should not add new properties to data.");
        }
        this.data[key] = value;
        const thisData = () => this.data;

        return {
            get value (): T {
                // console.log("Getter called", key, thisData()[key]);
                return thisData()[key] as T;
            },
            set value (valueToSet: T) {
                // console.log("Setter called", key, valueToSet);
                thisData()[key] = valueToSet;
            },
            setValue (valueToSet: T): void {
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
    public getData (key: string): unknown | undefined {
        return this.data[key];
    }

    /**
     * Sets the static data for the given key.
     * This data is not affected by data loading and saving, and is mainly used internally.
     * @param key - The key to set the static data for.
     * @param value - The value to set the static data to.
     * @returns A getter for the static data.
     */
    public setStatic<t> (key: string, value: t): t {
        if (typeof this.static[key] === "undefined" && this.normalData) {
            console.warn("After initializing data, you should not add new properties to staticData.");
        }
        this.static[key] = value;
        return this.static[key] as t;
    }

    /**
     * Gets the static data for the given key.
     * @deprecated Set the return value of {@link setStatic} to a variable instead, as that is a getter and provides type checking.
     * @param key - The key to get the static data for.
     * @returns The static data for the given key.
     */
    public getStatic (key: string): unknown | undefined {
        return this.static[key];
    }

    /**
     * Initializes / sets data that is unmodified by the player.
     * This is used to merge the loaded data with the default data.
     * It should be called before you load data.
     * Note: This should only be called once, and after it is called, you should not add new properties to data.
     * @example dataManager.init(); // Call this after setting the initial data.
     */
    public init (): void {
        this.normalData = this.data;
        this.normalDataPlain = instanceToPlain(this.data);
    }

    /**
     * Compiles the given game data to a tuple containing the compressed game data and a hash.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns [hash, data] - The compressed game data and a hash as a base64-encoded string to use for saving.
     */
    public compileDataRaw (data = this.data): [SaveMetadata, object] {
        const gameDataString = instanceToPlain(data);
        const hasedData = md5(`${this.gameRef.config.name.id}/${JSON.stringify(gameDataString)}`);
        let version: string;
        try {
            // @ts-expect-error - Replaced by esbuild
            version = PKG_VERSION;
        } catch (error) {
            version = "8.0.0";
        }
        const saveMetadata: SaveMetadata = {
            hash: hasedData,
            game: {
                title: this.gameRef.config.name.title,
                id: this.gameRef.config.name.id,
                version: this.gameRef.config.name.version,
            },
            emath: {
                version,
            },
        };
        // console.log("Compiled data: ", saveMetadata, gameDataString);
        return [saveMetadata, gameDataString];
    }

    /**
     * Compresses the given game data to a base64-encoded using lz-string.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns The compressed game data and a hash as a base64-encoded string to use for saving.
     */
    public compileData (data = this.data): string {
        const dataRawString = JSON.stringify(this.compileDataRaw(data));
        return compressToBase64(dataRawString);
    }

    /**
     * Decompiles the data stored in localStorage and returns the corresponding object.
     * @param data - The data to decompile. If not provided, it will be fetched from localStorage using the key `${game.config.name.id}-data`.
     * @returns The decompiled object, or null if the data is empty or invalid.
     */
    public decompileData (data: string | null = localStorage.getItem(`${this.gameRef.config.name.id}-data`)): [SaveMetadata, UnknownObject] | null {
        if (!data) return null;
        let parsedData: [SaveMetadata, UnknownObject];
        try {
            parsedData = JSON.parse(decompressFromBase64(data));
            return parsedData;
        } catch (error) {
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
    public validateData (data: [SaveMetadata, object]): boolean {
        const [saveMetadata, gameDataToValidate] = data;
        // Backwards compatibility: In versions before 8.x.x, data was of type [hash: string, data: object]. Now it's of type [SaveMetadata, data: object].
        if (typeof saveMetadata === "string") {
            return md5(`${this.gameRef.config.name.id}/${JSON.stringify(gameDataToValidate)}`) === saveMetadata;
        }
        const hashSave = saveMetadata.hash;
        // Current hash
        const hashCheck = md5(`${this.gameRef.config.name.id}/${JSON.stringify(gameDataToValidate)}`);
        // console.log("Hashes: ", hashSave, hashCheck);
        return hashSave === hashCheck;
    }

    /**
     * Resets the game data to its initial state and saves it.
     * @param reload - Whether to reload the page after resetting the data. Defaults to `false`.
     */
    public resetData (reload = false): void {
        if (!this.normalData) throw new Error("dataManager.resetData(): You must call init() before writing to data.");
        this.data = this.normalData;
        this.saveData();
        if (reload) window.location.reload();
    };

    /**
     * Saves the game data to local storage under the key `${game.config.name.id}-data`.
     * If you dont want to save to local storage, use {@link compileData} instead.
     * @param dataToSave - The data to save. If not provided, it will be fetched from localStorage using {@link compileData}.
     */
    public saveData (dataToSave = this.compileData()): void {
        localStorage.setItem(`${this.gameRef.config.name.id}-data`, dataToSave);
    };

    /**
     * Compiles the game data and prompts the user to download it as a text file using {@link window.prompt}.
     * If you want to implement a custom data export, use {@link compileData} instead.
     */
    public exportData (): void {
        // Step 1: Create the content
        const content = this.compileData();

        // console.log(content);

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
    };

    /**
     * Loads game data and processes it.
     * @param dataToParse - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
     * @param mergeData - Whether to merge the loaded data with the normal data. Defaults to `true`.
     * Warning: If set to `false`, the loaded data may have missing properties and may cause errors.
     * @returns The loaded data.
     */
    public parseData (dataToParse = this.decompileData(), mergeData = true): UnknownObject | null {
        if (mergeData && (!this.normalData || !this.normalDataPlain)) throw new Error("dataManager.parseData(): You must call init() before writing to data.");
        if (!dataToParse) return null;
        const [, loadedData] = dataToParse;
        // console.log(loadedData);

        /**
         * Checks if the given object is a plain object.
         * @param obj - The object to check.
         * @returns Whether the object is a plain object.
         */
        function isPlainObject (obj: unknown): boolean {
            return typeof obj === "object" && obj?.constructor === Object;
        }

        const objectHasOwnProperty = (obj: UnknownObject, key: string): boolean => Object.prototype.hasOwnProperty.call(obj, key);

        /**
         * Merge properties from the normal data to the loaded data. This is to ensure that new properties are added to the loaded data.
         * @deprecated use Object.assign instead
         * @param sourcePlain - The plain source object to reference if the property is missing from the target.
         * @param source - The source object to merge from.
         * @param target - The target object.
         * @returns The merged object.
         */
        function deepMerge (sourcePlain: UnknownObject, source: UnknownObject, target: UnknownObject): UnknownObject {
            const out = target;
            for (const key in sourcePlain) {
                if (objectHasOwnProperty(sourcePlain, key) && !objectHasOwnProperty(target, key)) {
                    // If the property is missing from the target, add it
                    out[key] = sourcePlain[key];
                }
                // Special case for currency.upgrades
                if (source[key] instanceof Currency) {
                    // console.log("Merging currency: ", sourcePlain[key], target[key]);
                    // interface currencyPlainType {
                    //     upgrades: {
                    //         id: string;
                    //         level: unknown; // irrelevant so unknown
                    //     }[]
                    // }
                    const sourceCurrency = sourcePlain[key] as Currency;
                    const targetCurrency = target[key] as Currency;
                    // for (const upgrade of sourceCurrency.upgrades) {
                    //     if (!targetCurrency.upgrades.find((upgrade2) => upgrade2.id === upgrade.id)) {
                    //         targetCurrency.upgrades.push(instanceToPlain(upgrade) as currencyPlainType["upgrades"][0]);
                    //     }
                    // }

                    // Backwards compatibility: In versions before 8.x.x, upgrades was of type UpgradeData[]. Now it's of type Record<string, UpgradeData>.
                    // Convert the old format to the new format
                    if (Array.isArray(targetCurrency.upgrades)) {
                        const upgrades = targetCurrency.upgrades;
                        // targetCurrency.upgrades = {};
                        targetCurrency.upgrades = {};
                        for (const upgrade of upgrades) {
                            targetCurrency.upgrades[upgrade.id] = upgrade.level;
                        }
                    }

                    // Merge upgrades
                    // console.log("Merging upgrades: ");
                    // console.log({ source: sourceCurrency.upgrades, target: targetCurrency.upgrades, combined: { ...sourceCurrency.upgrades, ...targetCurrency.upgrades }});
                    targetCurrency.upgrades = { ...sourceCurrency.upgrades, ...targetCurrency.upgrades };
                    out[key] = targetCurrency;
                } else if (isPlainObject(sourcePlain[key]) && isPlainObject(target[key])) {
                    // Recursive
                    out[key] = deepMerge((sourcePlain as Record<string, UnknownObject>)[key], (source as Record<string, UnknownObject>)[key], (target as Record<string, UnknownObject>)[key]);
                }
            }
            return out;
        }
        // let loadedDataProcessed = Object.assign({}, this.normalData, loadedData);
        let loadedDataProcessed = !mergeData ? loadedData : deepMerge(this.normalDataPlain!, this.normalData!, loadedData); // TODO: Fix this
        // console.log("Merged data: ", loadedData, this.normalData, loadedDataProcessed);
        interface templateClass {
            name: string;
            // Class constructor is Function
            class: ClassType;
            /** If the value is an array, it's an array of the given type */
            // subclasses?: Record<string, any | [any]>;
            properties: string[];
        }

        // Convert plain object to class instance (recursive)
        // TODO: use class-transformer and metadata
        const templateClasses = (function (templateClassesInit: Omit<templateClass, "properties">[]) {
            const out: templateClass[] = [];
            for (const templateClassConvert of templateClassesInit) {
                out.push({
                    class: templateClassConvert.class,
                    name: templateClassConvert.name,
                    // subclasses: templateClassConvert.subclasses,
                    properties: Object.getOwnPropertyNames(instanceToPlain(new templateClassConvert.class())),
                });
            }
            return out;
        })([
            {
                class: Attribute,
                name: "attribute",
                // subclasses: {
                //     value: Decimal,
                // },
            },
            // {
            //     class: boost,
            //     subclasses: {
            //         baseEffect: Decimal,
            //         boostArray: [boostObject],
            //     },
            // },
            {
                class: Currency,
                name: "currency",
                // subclasses: {
                //     // boost: boost,
                //     upgrades: [upgradeData],
                //     value: Decimal,
                // },
            },
            {
                class: Decimal,
                name: "Decimal",
            },
        ]);

        // console.log("Temp", templateClasses);

        /**
         * Compares two arrays. If they have the same elements, returns true.
         * @param arr1 - The first array.
         * @param arr2 - The second array.
         * @returns Whether the arrays are the same.
         */
        function compareArrays (arr1: unknown[], arr2: unknown[]): boolean {
            return arr1.length === arr2.length && arr1.every((val) => arr2.includes(val));
        }

        /** A queue of objects to call onLoadData on. */
        // const loadDataQueue: any = [];
        const upgradeDataProperties = Object.getOwnPropertyNames(new UpgradeData({ id: "", level: E(0) }));
        /**
         * Converts a plain object to a class instance.
         * @param templateClassToConvert - The template class to convert to.
         * @param plain - The plain object to convert.
         * @returns The converted class instance.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function convertTemplateClass (templateClassToConvert: templateClass, plain: UnknownObject): ClassType {
            // let out: object = plain;
            // Convert the object
            const out = plainToInstance(templateClassToConvert.class, plain);
            if (out instanceof Currency) {
                // console.log("Converted currency: ", out);
                for (const upgradeName in out.upgrades) {
                    const upgrade = out.upgrades[upgradeName];
                    // console.log("Upgrade: ", upgrade);
                    if (!upgrade || !upgradeDataProperties.every((prop) => Object.getOwnPropertyNames(upgrade).includes(prop))) {
                        // console.log("invalid upgrade: ", upgrade);
                        delete out.upgrades[upgradeName];
                        continue;
                    }
                    out.upgrades[upgradeName] = plainToInstance(UpgradeData, upgrade);
                }
            }
            if (!out) throw new Error(`Failed to convert ${templateClassToConvert.name} to class instance.`);
            return out;
        }

        /**
         * Converts a plain object to a class instance.
         * @param plain - The plain object to convert.
         * @returns The converted class instance.
         */
        function plainToInstanceRecursive (plain: UnknownObject): UnknownObject {
            const out = plain;
            for (const key in plain) {
                // console.log(key);
                // If it's not an object, skip it
                if (!(plain[key] instanceof Object && (plain as Record<string, object>)[key].constructor === Object)) continue;
                // If it matches a template class, convert it
                if (((): boolean => {
                    // Iterate through each template class
                    for (const templateClassR of templateClasses) {
                        // If the object has the same properties as the template class, convert it
                        if (compareArrays(Object.getOwnPropertyNames(plain[key]), templateClassR.properties)) {
                            out[key] = convertTemplateClass(templateClassR, (plain as Record<string, UnknownObject>)[key]);

                            // Return false if it matches a template class
                            return false;
                        }
                    }
                    // Return true if it doesn't match a template class
                    return true;
                })()) {
                    // If the object doesn't match a template class, convert it recursively
                    (out as Record<string, object>)[key] = plainToInstanceRecursive((plain as Record<string, UnknownObject>)[key]);
                }
            }
            return out;
        }

        loadedDataProcessed = plainToInstanceRecursive(loadedDataProcessed);
        return loadedDataProcessed;
    }

    /**
     * Loads game data and processes it.
     * @param dataToLoad - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
     * @returns Returns null if the data is empty or invalid, or false if the data is tampered with. Otherwise, returns true.
     */
    public loadData (dataToLoad: [SaveMetadata, UnknownObject] | null | string = this.decompileData()): null | boolean {
        dataToLoad = typeof dataToLoad === "string" ? this.decompileData(dataToLoad) : dataToLoad;
        if (!dataToLoad) return null;
        const isDataValid = this.validateData([dataToLoad[0], instanceToPlain(dataToLoad[1])]); // TODO: dataToLoad somehow plainToInstance??
        // console.log("Loaded data1: ", dataToLoad);
        const parsedData = this.parseData(dataToLoad);
        // console.log("Loaded data2: ", dataToLoad);
        if (!parsedData) return null;

        // console.log("Loaded data: ", [dataToLoad[0], instanceToPlain(dataToLoad[1])]);

        this.data = parsedData;

        // Call onLoadData on all objects
        for (const obj of this.eventsOnLoad) {
            obj();
        }

        return isDataValid;
    };
}

export { DataManager };
export type { UnknownObject, ClassType, SaveMetadata };