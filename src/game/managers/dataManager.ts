/**
 * @file Declares classes and functions for managing game data.
 * Ex. Saving, loading, exporting, etc.
 */
import type { game, gameData } from "../game";
import LZString from "lz-string";

// Saver
import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";

// Save validation
import { createHash } from "crypto";
const hash = createHash("sha256");

/**
 * A class that manages game data, including saving, loading, and exporting data.
 */
class dataManager {
    /**
     * The game data in its initial state, in a plain object.
     */
    private normalDataRecord: Record<string, any>;
    /**
     * Game data in its initial state.
     */
    private normalData: gameData;
    /**
     * A reference to the current game data.
     */
    private gameData: gameData;
    /**
     * A reference to the game instance.
     */
    private gameRef: game;

    /**
     * Creates a new instance of the game class.
     * @param gameRef - A function that returns the game instance.
     */
    constructor (gameRef: game) {
        // if (typeof window === "undefined") { // Don't run on serverside
        //     throw new Error("dataManager cannot be run on serverside");
        // }
        this.gameRef = gameRef;
        this.normalDataRecord = instanceToPlain(gameRef.data);
        this.normalData = gameRef.data;
        this.gameData = gameRef.data;
    }

    /**
     * Compresses the given game data to a base64-encoded string.
     * @param data The game data to be compressed. Defaults to the current game data.
     * @returns The compressed game data and a hash as a base64-encoded string.
     */
    private compileData (data: gameData = this.gameData): string {
        const gameDataString = instanceToPlain(data);
        const hasedData = hash.update(JSON.stringify(gameDataString)).digest("hex");
        return LZString.compressToBase64(JSON.stringify([hasedData, gameDataString]));
    }

    /**
     * Decompiles the data stored in localStorage and returns the corresponding object.
     * @param data - The data to decompile. If not provided, it will be fetched from localStorage.
     * @returns The decompiled object, or null if the data is empty or invalid.
     */
    private decompileData (data: string | null = localStorage.getItem(`${this.gameRef.config.name.id}-data`)): [string, object] | null {
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
    private validateData (data: [string, object]): boolean {
        const [hashSave, gameData] = data;
        const hashCheck = hash.update(JSON.stringify(instanceToPlain(gameData))).digest("hex");
        return hashSave === hashCheck;
        // return hash === hash.update(JSON.stringify(instanceToPlain(gameData))).digest("hex");
    }

    /**
     * Resets the game data to its initial state and saves it.
     * @param reload - Whether to reload the page after resetting the data. Defaults to `false`.
     */
    public resetData (reload = false): void {
        this.gameRef.data = this.normalData;
        this.saveData();
        if (reload) window.location.reload();
    };

    /**
     * Saves the game data to local storage.
     */
    public saveData (): void {
        // if (!this.gameData) {
        //     return;
        // } // check if data exists
        /**
         * !IMPORTANT: FIX LATER
         */
        // this.gameData.playtime.timeLastPlayed = E(Date.now());
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

    /**
     * Loads game data and processes it.
     */
    public loadData (): void {
        if (!this.gameData) {
            return;
        }

        // Process the object
        let loaded = this.decompileData();
        if (!loaded) {
            return;
        }
        let [hash, loadedData] = loaded;
        console.log(loadedData);
        // console.log((loadedData = processObject(loadedData)));
        /**
         * Add new / updated properties
         * @param source
         * @param target
         */
        function deepMerge (source: any, target: any) {
            for (const key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    if (!Object.prototype.hasOwnProperty.call(target, key)) {
                        target[key] = source[key];
                    } else if (typeof source[key] === "object" && typeof target[key] === "object") {
                        deepMerge(source[key], target[key]);
                    }
                }
            }
        }
        console.log(deepMerge(this.normalDataRecord, loadedData));
    };
}

export { dataManager };