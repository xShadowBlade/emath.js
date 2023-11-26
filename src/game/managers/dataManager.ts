import { game, gameData } from "../game";
import LZString from "lz-string";
import { E } from "../../eMath";

// Saver
import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";


/**
 * A class that manages game data, including saving, loading, and exporting data.
 */
class dataManager {
    private normalData: any;
    private gameData: gameData;
    private gameRef: game;

    /**
     * Creates a new instance of the game class.
     * @constructor
     * @param gameRef - A function that returns the game instance.
     */
    constructor (gameRef: game) {
        if (typeof window === "undefined") { // Don't run on serverside
            throw new Error("dataManager cannot be run on serverside");
        }
        this.gameRef = gameRef;
        this.normalData = gameRef.data;
        this.gameData = gameRef.data;
    }

    private compileData (data: gameData = this.gameData): string {
        return LZString.compressToBase64(JSON.stringify(instanceToPlain(data)));
    }

    private decompileData (data: string | null = localStorage.getItem(`${this.gameRef.config.name.id}-data`)): object | null {
        return data ? plainToInstance(gameData, JSON.parse(LZString.decompressFromBase64(data))) : null;
    }

    /**
     * Resets the game data to its initial state and saves it.
     * @param reload - Whether to reload the page after resetting the data. Defaults to false.
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
         * IMPORTANT: FIX LATER
        */
        // this.gameData.playtime.timeLastPlayed = E(Date.now());
        localStorage.setItem(`${this.gameRef.config.name.id}-data`, this.compileData());
    };

    /**
     * Compiles the game data and prompts the user to download it as a text file.
     */
    public exportData (): void {
        // Step 1: Create the content
        const content = this.compileData();

        // console.log(content);

        // Ask if user wants to download

        if (prompt("Download save data?:", content) != null) {
            // Step 2: Create a Blob
            const blob = new Blob([content], { type: "text/plain" });

            // Step 3: Create an anchor element
            const downloadLink = document.createElement("a");

            // Step 4: Set attributes
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `${this.gameRef.config.name.id}-data.txt`; // Specify the file name
            downloadLink.textContent = `Download ${this.gameRef.config.name.id}-data.txt file`; // Text shown on the link

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

        // if (localStorage.getItem(`${game.meta.name.id}-data`)) console.log(decompileData(localStorage.getItem(`${game.meta.name.id}-data`)));

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
 * Function to convert a class or and object to a string that can be used to recreate the class when loaded.
 * @param class - The class to convert to a string.
 * Classes are converted to strings using the following format:
 * ```<EMATHJSONCLASS>${class.name}/${// All nonstatic properties of the class in an object}```
 * @deprecated I should stop trying to reinvent the wheel.
 * @example
class myClass {
    static af: number = 23;
    static ab () { return 232 };

    asd: number;
    constructor (asd) {
        this.asd = asd;
    }
}

const a = new myClass(232);

classToJsonString(a); // `a/{"asd": 232}`
 */
// function classToJsonString (obj: any): string {
//     const properties = Object.getOwnPropertyNames(obj);
//     const serializedProperties = properties.map((property) => {
//         const value = obj[property];
//         if (Object.getOwnPropertyNames(class {}).includes(property)) return ""; // Ignore default properties (they are already defined in the class)
//         if (typeof value === "object" && value !== null) {
//             if (value instanceof Date) {
//                 return `"${property}": "${value.toISOString()}"`;
//             } else if (Array.isArray(value)) {
//                 const serializedArray = value.map((item) =>
//                     typeof item === "object" ? classToJsonString(item) : JSON.stringify(item),
//                 );
//                 return `"${property}": [${serializedArray.join(",")}]`;
//             } else {
//                 return `"${property}": ${classToJsonString(value)}`;
//             }
//         } else {
//             return `"${property}": ${JSON.stringify(value)}`;
//         }
//     });
//     serializedProperties.filter((property) => property !== "");
//     return `<EMATHJSONCLASS>${obj.constructor.toString()}</EMATHJSONCLASS>{${serializedProperties.join(",")}}`;
// }

/**
 * Function to convert a string created by classToJsonString() back into a class.
 * @param string - The string to convert to a class.
 * @deprecated I should stop trying to reinvent the wheel.
 */
// function jsonStringToClass (string: string): any {
//     const classToCall = Function(`return ${string.match(/(?=<EMATHJSONCLASS>)(.*)(?=<\/EMATHJSONCLASS>)/)?.toString().replace("<EMATHJSONCLASS>", "")}`)();
//     console.log("class", classToCall);
//     const objectToReturn = new (classToCall)();
//     const properties = JSON.parse(string.replace(/(?<=<EMATHJSONCLASS>)(.*)(?=<\/EMATHJSONCLASS>)/, ""));
//     console.log(objectToReturn, properties);

//     return Object.assign(objectToReturn, properties);
// }

export { dataManager };