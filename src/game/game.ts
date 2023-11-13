// import keys from "./keybinds";
// import pixiGame from "./PIXI/pixiSetup";
// import dataManagement from "./save";

import { E } from "../eMath";
import { boost } from "../classes/boost";
import { currency, currencyStatic } from "../classes/currency";
import { attribute } from "../classes/attribute";
import LZString from "lz-string";
import { keyManager } from "./keybinds";
import { eventManager } from "./main";

// type GameType = {
//     data: {
//         playtime: { // in milliseconds
//             tActive: currency,
//             tPassive: currency,
//             timewarp: E,
//             active: currency,
//             passive: currency,
//             points: currency,
//             timeLastPlayed: E,
//         };
//         chronos: {
//             currency: currency,
//             lastReward: E,
//         }
//     };
//     static: {
//         },
//         chronos: {
//             currency: currencyStatic,
//         }
//     };
// };

/**
 * Configuration object for the game.
 */
interface GameConfig {
	mode: "development" | "production";
	name: {
		title: string;
		id: string;
	}
    settings: {
        framerate: number;
    }
}

/**
 * Represents a game currency.
 */
class GameCurrency {
    public currencyPointer: () => any;
    public staticPointer: () => any;

    /**
     * Creates a new instance of the Game class.
     * @param currencyPointer A function that returns the current currency value.
     * @param staticPointer A function that returns the static data for the game.
     */
    constructor (currencyPointer: () => any, staticPointer: () => any) {
        this.currencyPointer = currencyPointer;
        this.staticPointer = staticPointer;
    }

    /**
     * Adds an attribute with the given name and value to the game's static pointer.
     * @param name - The name of the attribute to add.
     * @param value - The value of the attribute to add.
     * @returns The newly created attribute.
     */
    addAttribute (name: string, value: E): attribute {
        return this.staticPointer().attributes[name] = new attribute(value);
    }
}

/**
 * A class that manages game data, including saving, loading, and exporting data.
 */
class dataManager {
    private normalData: any;
    private gameData: any;
    private gameRef: () => Game;

    /**
     * Creates a new instance of the Game class.
     * @constructor
     * @param gameRef - A function that returns the Game instance.
     */
    constructor (gameRef: () => Game) {
        if (typeof window === "undefined") { // Don't run on serverside
            throw new Error("dataManager cannot be run on serverside");
        }
        this.gameRef = gameRef;
        this.normalData = gameRef().data;
    }

    private compileData (data: object = this.gameData): string {
        return LZString.compressToBase64(JSON.stringify(data));
    }

    private decompileData (data: string | null = localStorage.getItem(`${this.gameRef().meta.name.id}-data`)): object | null {
        return data ? JSON.parse(LZString.decompressFromBase64(data)) : null;
    }

    /**
     * Resets the game data to its initial state and saves it.
     * @param reload - Whether to reload the page after resetting the data. Defaults to false.
     */
    public resetData (reload = false): void {
        this.gameRef().data = this.normalData;
        this.saveData();
        if (reload) window.location.reload();
    };

    /**
     * Saves the game data to local storage.
     */
    public saveData (): void {
        if (!this.gameData) {
            return;
        } // check if data exists
        this.gameData.playtime.timeLastPlayed = E(Date.now());
        localStorage.setItem(`${this.gameRef().meta.name.id}-data`, this.compileData());
    };

    /**
     * Compiles the game data and prompts the user to download it as a text file.
     */
    public exportData (): void {
        // Step 1: Create the content
        const content = this.compileData();

        console.log(content);

        // Ask if user wants to download

        if (prompt("Download save data?:", content) != null) {
            // Step 2: Create a Blob
            const blob = new Blob([content], { type: "text/plain" });

            // Step 3: Create an anchor element
            const downloadLink = document.createElement("a");

            // Step 4: Set attributes
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `${this.gameRef().meta.name.id}-data.txt`; // Specify the file name
            downloadLink.textContent = `Download ${this.gameRef().meta.name.id}-data.txt file`; // Text shown on the link

            // Step 5: Append to the DOM
            document.body.appendChild(downloadLink);

            // Step 6: Programmatically trigger click event
            downloadLink.click();

            // Clean up: Remove the link from the DOM after the download
            document.body.removeChild(downloadLink);
        }
    };

    /**
     * Loads game data and processes it.
     */
    public loadData (): void {
        if (!this.gameData) {
            return;
        } // check if data exists
        // if (this.gameData.playtime.timeLastPlayed != 0) {this.gameData.playtime.passive += Date.now() - this.gameData.playtime.timeLastPlayed;}

        // let loadedData = this.decompileData();

        // if (localStorage.getItem(`${Game.meta.name.id}-data`)) console.log(decompileData(localStorage.getItem(`${Game.meta.name.id}-data`)));

        // Sample function E()
        // function E(value) {
        //     // Replace this with your implementation of function E()
        //     return `Processed: ${value}`;
        // }

        // Recursive function to process object properties
        function processObject (obj: any) {
            for (const prop in obj) {
                if (typeof obj[prop] === "string") {
                    try {
                        const processedValue = E(obj[prop]);
                        obj[prop] = processedValue;
                    } catch (error) {
                        // Handle any errors from function E()
                        console.error(`Error processing value: ${obj[prop]}`);
                    }
                } else if (typeof obj[prop] === "object" && obj[prop] !== null) {
                    processObject(obj[prop]); // Recurse into nested objects
                }
            }
            return obj;
        }

        // Example object

        // Process the object
        let loadedData = this.decompileData();
        console.log(loadedData);
        console.log((loadedData = processObject(loadedData)));

        // Add new / updated properties
        function deepMerge (source: any, target: any) {
            for (const key in source) {
                // eslint-disable-next-line no-prototype-builtins
                if (source.hasOwnProperty(key)) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (!target.hasOwnProperty(key)) {
                        target[key] = source[key];
                    } else if (
                        typeof source[key] === "object" &&
                            typeof target[key] === "object"
                    ) {
                        deepMerge(source[key], target[key]);
                    }
                }
            }
        }
        console.log(deepMerge(this.normalData, loadedData));
    };
}

/**
 * Represents a game instance.
 */
class Game {
    public functions: any;
    public data: any;
    public static: any;
    public meta: GameConfig;

    public dataManager: dataManager;
    public keyManager: keyManager;
    public eventManager: eventManager

    private tickers: ((dt: number) => void)[];

    /**
     * Creates a new instance of the Game class.
     * @constructor
     * @param config - The configuration object for the game.
     */
    constructor (config: GameConfig) {
        this.meta = config;
        this.dataManager = new dataManager(() => this);
        this.keyManager = new keyManager({
            autoAddInterval: true,
            fps: config.settings.framerate,
        });
        this.eventManager = new eventManager({
            autoAddInterval: true,
            fps: config.settings.framerate,
        });
        this.tickers = [];
        this.addCurrencyGroup("playtime", ["tActive", "tPassive", "active", "passive", "points"]);
    }

    /**
     * Adds a new currency section to the game.
     * @param name - The name of the currency section.
     * @returns A new instance of the GameCurrency class.
     */
    public addCurrency (name: string): GameCurrency {
        this.data[name] = {
            currency: new currency(),
        };
        this.static[name] = {
            currency: new currencyStatic(() => this.data[name]),
            attributes: {},
        };

        const classInstance = new GameCurrency(() => this.data[name], () => this.static[name]);
        return classInstance;
    }

    /**
     * Adds a new currency group to the game.
     * @param name - The name of the currency group.
     * @param currencies - An array of currency names to add to the group.
     */
    public addCurrencyGroup (name: string, currencies: string[]): void {
        this.data[name] = {};
        this.static[name] = {
            attributes: {},
        };

        // const classInstance = new GameCurrency(() => this.data[name], () => this.static[name]);
        currencies.forEach((currencyName) => {
            this.data[name][currencyName] = new currency();
            this.static[name][currencyName] = new currencyStatic(() => this.data[name][currencyName]);
        });
    }
}

export { Game, GameConfig, GameCurrency };