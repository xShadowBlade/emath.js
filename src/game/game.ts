// import keys from "./keybinds";
// import pixiGame from "./PIXI/pixiSetup";
// import dataManagement from "./save";

import { E } from "../eMath";
import { boost } from "../classes/boost";
import { currency, currencyStatic } from "../classes/currency";
import { attribute } from "../classes/attribute";
import { keyManager } from "./keyManager";
import { eventManager } from "./main";
import { dataManager } from "./dataManager";

import { configManager, RequiredDeep } from "./configManager";

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
//         chronos: {
//             currency: currencyStatic,
//         }
//     };
// };

/**
 * Represents a game currency.
 */
class GameCurrency {
    public currencyPointer: any;
    public staticPointer: any;

    /**
     * Creates a new instance of the Game class.
     * @param currencyPointer A function that returns the current currency value.
     * @param staticPointer A function that returns the static data for the game.
     */
    constructor (currencyPointer: any, staticPointer: any) {
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
        return this.staticPointer.attributes[name] = new attribute(value);
    }
}

interface GameConfigOptions {
	mode?: "development" | "production";
	name: {
		title?: string;
		id: string;
	}
    settings?: {
        framerate?: number;
    }
}

const GameDefaultConfig: RequiredDeep<GameConfigOptions> = {
    mode: "production",
    name: {
        title: "",
        id: "",
    },
    settings: {
        framerate: 30,
    },
};

/**
 * Represents a game instance.
 */
class Game {
    protected static configManager = new configManager(GameDefaultConfig);

    public functions: any;
    public data: any;
    public static: any;
    public config: typeof Game.configManager.options;

    public dataManager: dataManager;
    public keyManager: keyManager;
    public eventManager: eventManager;

    private tickers: ((dt: number) => void)[];

    /**
     * Creates a new instance of the Game class.
     * @constructor
     * @param config - The configuration object for the game.
     */
    constructor (config?: GameConfigOptions) {
        this.config = Game.configManager.parse(config);
        this.dataManager = new dataManager(this);
        this.keyManager = new keyManager({
            autoAddInterval: true,
            fps: this.config.settings.framerate,
        });
        this.eventManager = new eventManager({
            autoAddInterval: true,
            fps: this.config.settings.framerate,
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

        const classInstance = new GameCurrency(this.data[name], this.static[name]);
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

export { Game, GameCurrency, GameConfigOptions, GameDefaultConfig };