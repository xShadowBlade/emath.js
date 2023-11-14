import type { Game } from "./game";
/**
 * A class that manages game data, including saving, loading, and exporting data.
 */
declare class dataManager {
    private normalData;
    private gameData;
    private gameRef;
    /**
     * Creates a new instance of the Game class.
     * @constructor
     * @param gameRef - A function that returns the Game instance.
     */
    constructor(gameRef: Game);
    private compileData;
    private decompileData;
    /**
     * Resets the game data to its initial state and saves it.
     * @param reload - Whether to reload the page after resetting the data. Defaults to false.
     */
    resetData(reload?: boolean): void;
    /**
     * Saves the game data to local storage.
     */
    saveData(): void;
    /**
     * Compiles the game data and prompts the user to download it as a text file.
     */
    exportData(): void;
    /**
     * Loads game data and processes it.
     */
    loadData(): void;
}
export { dataManager };
