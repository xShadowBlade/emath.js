/**
 * @file Declares classes and functions for managing game data.
 * Ex. Saving, loading, exporting, etc.
 */
import type { game } from "../game";
// import { gameData } from "../game";
import LZString from "lz-string";

// Saver
import { instanceToPlain, plainToInstance } from "class-transformer";

// Recursive plain to class
import { currency, upgradeData } from "../../classes/currency";
import { boost, boostObject } from "../../classes/boost";
// import { E } from "index";
import Decimal from "E/e";


// Save validation
/**
 * MD5 implementation. (c) Paul Johnston & Greg Holt.
 * @param _ - String to hash
 * @returns The hashed string.
 */
/* eslint-disable */
// @ts-ignore
function md5(_:string):string{var $="0123456789abcdef";function n(_){var n,r="";for(n=0;n<=3;n++)r+=$.charAt(_>>8*n+4&15)+$.charAt(_>>8*n&15);return r}function r(_,$){var n=(65535&_)+(65535&$);return(_>>16)+($>>16)+(n>>16)<<16|65535&n}function t(_,$,n,t,u,e){var f,o;return r((f=r(r($,_),r(t,e)),f<<(o=u)|f>>>32-o),n)}function u(_,$,n,r,u,e,f){return t($&n|~$&r,_,$,u,e,f)}function e(_,$,n,r,u,e,f){return t($&r|n&~r,_,$,u,e,f)}function f(_,$,n,r,u,e,f){return t($^n^r,_,$,u,e,f)}function o(_,$,n,r,u,e,f){return t(n^($|~r),_,$,u,e,f)}var F,c,a,i,h,v=function _($){var n,r=($.length+8>>6)+1,t=Array(16*r);for(n=0;n<16*r;n++)t[n]=0;for(n=0;n<$.length;n++)t[n>>2]|=$.charCodeAt(n)<<n%4*8;return t[n>>2]|=128<<n%4*8,t[16*r-2]=8*$.length,t}(""+_),x=1732584193,g=-271733879,l=-1732584194,d=271733878;for(F=0;F<v.length;F+=16)c=x,a=g,i=l,h=d,x=u(x,g,l,d,v[F+0],7,-680876936),d=u(d,x,g,l,v[F+1],12,-389564586),l=u(l,d,x,g,v[F+2],17,606105819),g=u(g,l,d,x,v[F+3],22,-1044525330),x=u(x,g,l,d,v[F+4],7,-176418897),d=u(d,x,g,l,v[F+5],12,1200080426),l=u(l,d,x,g,v[F+6],17,-1473231341),g=u(g,l,d,x,v[F+7],22,-45705983),x=u(x,g,l,d,v[F+8],7,1770035416),d=u(d,x,g,l,v[F+9],12,-1958414417),l=u(l,d,x,g,v[F+10],17,-42063),g=u(g,l,d,x,v[F+11],22,-1990404162),x=u(x,g,l,d,v[F+12],7,1804603682),d=u(d,x,g,l,v[F+13],12,-40341101),l=u(l,d,x,g,v[F+14],17,-1502002290),g=u(g,l,d,x,v[F+15],22,1236535329),x=e(x,g,l,d,v[F+1],5,-165796510),d=e(d,x,g,l,v[F+6],9,-1069501632),l=e(l,d,x,g,v[F+11],14,643717713),g=e(g,l,d,x,v[F+0],20,-373897302),x=e(x,g,l,d,v[F+5],5,-701558691),d=e(d,x,g,l,v[F+10],9,38016083),l=e(l,d,x,g,v[F+15],14,-660478335),g=e(g,l,d,x,v[F+4],20,-405537848),x=e(x,g,l,d,v[F+9],5,568446438),d=e(d,x,g,l,v[F+14],9,-1019803690),l=e(l,d,x,g,v[F+3],14,-187363961),g=e(g,l,d,x,v[F+8],20,1163531501),x=e(x,g,l,d,v[F+13],5,-1444681467),d=e(d,x,g,l,v[F+2],9,-51403784),l=e(l,d,x,g,v[F+7],14,1735328473),g=e(g,l,d,x,v[F+12],20,-1926607734),x=f(x,g,l,d,v[F+5],4,-378558),d=f(d,x,g,l,v[F+8],11,-2022574463),l=f(l,d,x,g,v[F+11],16,1839030562),g=f(g,l,d,x,v[F+14],23,-35309556),x=f(x,g,l,d,v[F+1],4,-1530992060),d=f(d,x,g,l,v[F+4],11,1272893353),l=f(l,d,x,g,v[F+7],16,-155497632),g=f(g,l,d,x,v[F+10],23,-1094730640),x=f(x,g,l,d,v[F+13],4,681279174),d=f(d,x,g,l,v[F+0],11,-358537222),l=f(l,d,x,g,v[F+3],16,-722521979),g=f(g,l,d,x,v[F+6],23,76029189),x=f(x,g,l,d,v[F+9],4,-640364487),d=f(d,x,g,l,v[F+12],11,-421815835),l=f(l,d,x,g,v[F+15],16,530742520),g=f(g,l,d,x,v[F+2],23,-995338651),x=o(x,g,l,d,v[F+0],6,-198630844),d=o(d,x,g,l,v[F+7],10,1126891415),l=o(l,d,x,g,v[F+14],15,-1416354905),g=o(g,l,d,x,v[F+5],21,-57434055),x=o(x,g,l,d,v[F+12],6,1700485571),d=o(d,x,g,l,v[F+3],10,-1894986606),l=o(l,d,x,g,v[F+10],15,-1051523),g=o(g,l,d,x,v[F+1],21,-2054922799),x=o(x,g,l,d,v[F+8],6,1873313359),d=o(d,x,g,l,v[F+15],10,-30611744),l=o(l,d,x,g,v[F+6],15,-1560198380),g=o(g,l,d,x,v[F+13],21,1309151649),x=o(x,g,l,d,v[F+4],6,-145523070),d=o(d,x,g,l,v[F+11],10,-1120210379),l=o(l,d,x,g,v[F+2],15,718787259),g=o(g,l,d,x,v[F+9],21,-343485551),x=r(x,c),g=r(g,a),l=r(l,i),d=r(d,h);return n(x)+n(g)+n(l)+n(d)}
/* eslint-enable */

/**
 * A class that manages game data, including saving, loading, and exporting data.
 */
class dataManager {
    /**
     * Game data in its initial state.
     */
    private normalData?: Record<string, any>;
    /**
     * The current game data.
     */
    private data: Record<string, any>;
    /**
     * The static game data.
     */
    private static: Record<string, any>;
    /**
     * A reference to the game instance.
     */
    private gameRef: game;

    /**
     * Creates a new instance of the game class.
     * @param gameRef - A function that returns the game instance.
     * @param saveOnExit - Whether to save the game when the user exits the page. Defaults to `true`.
     */
    constructor (gameRef: game, saveOnExit = true) {
        // if (typeof window === "undefined") { // Don't run on serverside
        //     throw new Error("dataManager cannot be run on serverside");
        // }
        this.gameRef = gameRef;
        // this.normalDataRecord = instanceToPlain(gameRef.data);
        // this.normalData = gameRef.data;
        // this.data = gameRef.data;

        this.data = {};
        this.static = {};
        if (saveOnExit) {
            const saveDataFn = this.saveData;
            window.addEventListener('beforeunload', function (e) {
                // Your code to run before the page unloads goes here
                // For example, you can save user data to a server.
                // Make sure to return a message to display to the user.
                saveDataFn();
                // e.returnValue = 'Are you sure you want to leave this page?';
            });
        }
        
    }

    /**
     * Sets the data for the given key.
     * @param key - The key to set the data for.
     * @param value - The value to set the data to.
     * @returns - The value that was set.
     */
    public setData<t> (key: string, value: t): t {
        if (typeof this.data[key] === "undefined" && this.normalData) {
            console.warn("After initializing data, you should not add new properties to data.");
        }
        return this.data[key] = value;
    }

    /**
     * Gets the data for the given key.
     * @param key - The key to get the data for.
     * @returns - The data for the given key.
     */
    public getData (key: string): any {
        return this.data[key];
    }

    /**
     * Sets the static data for the given key.
     * @param key - The key to set the static data for.
     * @param value - The value to set the static data to.
     * @returns - The value that was set.
     */
    public setStatic<t> (key: string, value: t): t {
        return this.static[key] = value;
    }

    /**
     * Gets the static data for the given key.
     * @param key - The key to get the static data for.
     * @returns - The static data for the given key.
     */
    public getStatic (key: string): any {
        return this.static[key];
    }

    /**
     * Initializes / sets data that is unmodified by the player.
     * This is used to merge the loaded data with the default data.
     * It should be called before you load data.
     */
    public init (): void {
        this.normalData = this.data;
    }

    /**
     * Compiles the given game data to a tuple containing the compressed game data and a hash.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns [hash, data] - The compressed game data and a hash as a base64-encoded string to use for saving.
     */
    private compileDataRaw (data = this.data): [string, object] {
        const gameDataString = instanceToPlain(data);
        const hasedData = md5(JSON.stringify(gameDataString));
        return [hasedData, gameDataString];
    }

    /**
     * Compresses the given game data to a base64-encoded string.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns The compressed game data and a hash as a base64-encoded string to use for saving.
     */
    public compileData (data = this.data): string {
        return LZString.compressToBase64(JSON.stringify(this.compileDataRaw(data)));
    }

    /**
     * Decompiles the data stored in localStorage and returns the corresponding object.
     * @param data - The data to decompile. If not provided, it will be fetched from localStorage.
     * @returns The decompiled object, or null if the data is empty or invalid.
     */
    public decompileData (data: string | null = localStorage.getItem(`${this.gameRef.config.name.id}-data`)): [string, object] | null {
        if (!data) return null;
        /**
         * Parsed data in a tuple.
         */
        const parsedData: [string, object] = JSON.parse(LZString.decompressFromBase64(data));
        return parsedData;
    }

    /**
     * Validates the given data.
     * @param data - [hash, data] The data to validate.
     * @returns Whether the data is valid / unchanged. False means that the data has been tampered with / save edited.
     */
    public validateData (data: [string, object]): boolean {
        const [hashSave, gameDataToValidate] = data;
        // Current hash
        const hashCheck = md5(JSON.stringify(instanceToPlain(gameDataToValidate)));
        return hashSave === hashCheck;
    }

    /**
     * Resets the game data to its initial state and saves it.
     * @param reload - Whether to reload the page after resetting the data. Defaults to `false`.
     */
    public resetData (reload = false): void {
        if (!this.normalData) {
            throw new Error("dataManager.resetData(): You must call init() before writing to data.");
            return;
        }
        this.data = this.normalData;
        this.saveData();
        if (reload) window.location.reload();
    };

    /**
     * Saves the game data to local storage.
     * If you dont want to save to local storage, use {@link compileData} instead.
     */
    public saveData (): void {
        localStorage.setItem(`${this.gameRef.config.name.id}-data`, this.compileData());
    };

    /**
     * Compiles the game data and prompts the user to download it as a text file. (optional)
     * @param download - Whether to download the file automatically. Defaults to `true`. If set to `false`, this is kinda useless lol use {@link compileData} instead.
     */
    public exportData (download = true): void {
        // Step 1: Create the content
        const content = this.compileData();

        // console.log(content);

        // Ask if user wants to download
        if (download && prompt("Download save data?:", content) != null) {
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

    public parseData (dataToParse = this.decompileData()): object | null {
        if (!this.normalData) {
            throw new Error("dataManager.loadData(): You must call init() before writing to data.");
        }
        if (!dataToParse) {
            return null;
        }
        const [, loadedData] = dataToParse;
        // console.log(loadedData);

        /**
         * Checks if the given object is a plain object.
         * @param obj - The object to check.
         * @returns Whether the object is a plain object.
         */
        function isPlainObject (obj: any): boolean {
            return typeof obj === "object" && obj.constructor === Object;
        }

        /**
         * Add new / updated properties
         * @param source - The source object to reference if a property is missing.
         * @param target - The target object.
         * @returns The merged object.
         */
        function deepMerge (source: object, target: object): object {
            let out: object = target;
            for (const key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key) && !Object.prototype.hasOwnProperty.call(target, key)) {
                    // If the property is missing from the target, add it
                    (out as any)[key] = (source as any)[key];
                } else if (isPlainObject((source as any)[key]) && isPlainObject((target as any)[key])) {
                    // Recursive
                    (out as any)[key] = deepMerge((source as any)[key], (target as any)[key]);
                }
            }
            return out;
        }
        let loadedDataProcessed = deepMerge(this.normalData, loadedData);
        console.log("Merged data: ", loadedData, this.normalData, loadedDataProcessed);

        // Convert plain object to class instance (recursive)
        const templateClasses = [
            {
                class: currency,
                subclasses: {
                    value: Decimal,
                    upgrades: [upgradeData],
                    boost: boost,
                },
            },
            {
                class: boost,
                subclasses: {
                    boostArray: [boostObject],
                    baseEffect: Decimal,
                },
            },
            {
                class: Decimal,
            }
        ] as {
            class: any;
            subclasses?: {
                [key: string]: any;
            }
            properties: string[];
        }[];

        for (const templateClass of templateClasses) {
            templateClass.properties = Object.getOwnPropertyNames(new templateClass.class());
        }

        console.log("Temp", templateClasses);

        /**
         * Compares two arrays in any order. If they have the same elements, returns true.
         * @param arr1 - The first array.
         * @param arr2 - The second array.
         * @returns Whether the arrays are the same.
         */
        function compareArrays (arr1: any[], arr2: any[]): boolean {
            return arr1.length === arr2.length && arr1.every((val) => arr2.includes(val));
        }

        /**
         * Converts a plain object to a class instance.
         * @param plain - The plain object to convert.
         * @returns The converted class instance.
         */
        function plainToInstanceRecursive (plain: object): object {
            const out: object = plain;
            for (const key in plain) {
                // console.log(key);
                // If it's not an object, skip it
                if (!((plain as any)[key] instanceof Object && (plain as any)[key].constructor === Object)) continue;
                // If it matches a template class, convert it
                if (!((): boolean => {
                    for (const templateClass of templateClasses) {
                        if (compareArrays(Object.getOwnPropertyNames((plain as any)[key]), templateClass.properties)) {
                            (out as any)[key] = plainToInstance(templateClass.class, (out as any)[key]);

                            // Convert subclasses
                            if (templateClass.subclasses) {
                                for (const subclassKey in templateClass.subclasses) {
                                    if (Object.prototype.hasOwnProperty.call(templateClass.subclasses, subclassKey)) {
                                        if (Array.isArray(templateClass.subclasses[subclassKey])) {
                                            // Convert array
                                            for (let i = 0; i < (out as any)[key][subclassKey].length; i++) {
                                                (out as any)[key][subclassKey][i] = plainToInstanceRecursive((out as any)[key][subclassKey][i]);
                                            }
                                        } else {
                                            // Convert object
                                            (out as any)[key][subclassKey] = plainToInstanceRecursive((out as any)[key][subclassKey]);
                                        }
                                    }
                                }
                            }

                            // Return true if it matches a template class
                            return true;
                        }
                    }
                    // Return false if it doesn't match a template class
                    return false;
                })()) {
                    (out as any)[key] = plainToInstanceRecursive((plain as any)[key]);
                }
            }
            return out;
        }

        loadedDataProcessed = plainToInstanceRecursive(loadedDataProcessed);
        // console.log("Converted data: ", loadedDataProcessed);
        return loadedDataProcessed;
    }

    /**
     * Loads game data and processes it.
     * @param dataToLoad - The data to load. If not provided, it will be fetched from localStorage.
     */
    public loadData (dataToLoad = this.decompileData()): void {
        const parsedData = this.parseData(dataToLoad);
        if (!parsedData) return;
        this.data = parsedData; // TODO: Fix this
    };
}

export { dataManager };