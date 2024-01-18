/**
 * @file Declares the main game class.
 */

import { E, ESource } from "../E/eMain";
import { boost } from "../classes/boost";
import { currency, currencyStatic } from "../classes/currency";
import { attribute, attributeStatic } from "../classes/attribute";
import { keyManager } from "./managers/keyManager";
import { eventManager } from "./managers/eventManager";
import { dataManager } from "./managers/dataManager";
import { gameCurrency } from "./gameCurrency";
import { gameAttribute } from "./gameAttribute";
import { gameReset } from "./resetLayer";

import { configManager, RequiredDeep } from "./managers/configManager";

interface gameConfigOptions {
	mode?: "development" | "production";
	name: {
		title?: string;
		id: string;
	}
    settings?: {
        framerate?: number;
    }
    initIntervalBasedManagers?: boolean;
}

const gameDefaultConfig: RequiredDeep<gameConfigOptions> = {
    mode: "production",
    name: {
        title: "",
        id: "",
    },
    settings: {
        framerate: 30,
    },
    initIntervalBasedManagers: true,
};

// class gameStatic {
//     public staticData: {
//         [key: string]: any;
//     };

//     constructor (staticData?: any) {
//         this.staticData = staticData ? staticData : {};
//     }

//     public set (name: string, value: any): void {
//         this.staticData[name] = value;
//     }

//     public get (name: string): any {
//         return this.staticData[name];
//     }
// }

// class gameData {
//     public data: {
//         [key: string]: any;
//     };

//     constructor (data?: any) {
//         this.data = data ? data : {};
//     }

//     public set (name: string, value: any): void {
//         this.data[name] = value;
//     }

//     public get (name: string): any {
//         return this.data[name];
//     }
// }

/**
 * Represents a game instance.
 */
class game {
    protected static configManager = new configManager(gameDefaultConfig);
    public config: typeof game.configManager.options;

    // public data: gameData;
    // public static: gameStatic;

    /**
     * The data manager for the game.
     * As of v5.0.0, all data is stored here.
     */
    public dataManager: dataManager;

    /**
     * The key manager for the game.
     */
    public keyManager: keyManager;

    /**
     * The event manager for the game.
     */
    public eventManager: eventManager;

    protected tickers: ((dt: number) => void)[];

    /**
     * Creates a new instance of the game class.
     * @param config - The configuration object for the game.
     */
    constructor (config?: gameConfigOptions) {
        this.config = game.configManager.parse(config);
        // this.data = new gameData();
        // this.static = new gameStatic();
        this.dataManager = new dataManager(this); // Init separately
        this.keyManager = new keyManager({
            autoAddInterval: this.config.initIntervalBasedManagers,
            fps: this.config.settings.framerate,
        });
        this.eventManager = new eventManager({
            autoAddInterval: this.config.initIntervalBasedManagers,
            fps: this.config.settings.framerate,
        });
        this.tickers = [];
    }

    /**
     * Initializes the game. Also initializes the data manager.
     */
    public init (): void {
        this.dataManager.init();
    }

    /**
     * Adds a new currency section to the game. {@link gameCurrency}
     * @param name - The name of the currency section.
     * @returns A new instance of the gameCurrency class.
     */
    public addCurrency (name: string): gameCurrency {
        this.dataManager.setData(name, {
            currency: new currency(),
        });
        this.dataManager.setStatic(name, {
            currency: new currencyStatic(this.dataManager.getData(name).currency),
            // attributes: {},
        });

        const classInstance = new gameCurrency(this.dataManager.getData(name).currency, this.dataManager.getStatic(name).currency, this);
        return classInstance;
    }

    /**
     * Adds a new currency group to the game.
     * @param name - The name of the currency group.
     * @param currencies - An array of currency names to add to the group.
     */
    public addCurrencyGroup (name: string, currencies: string[]): void {
        this.dataManager.setData(name, {});
        this.dataManager.setStatic(name, {
            attributes: {},
        });

        // const classInstance = new gameCurrency(() => this.data[name], () => this.static[name]);
        currencies.forEach((currencyName) => {
            this.dataManager.getData(name)[currencyName] = new currency();
            this.dataManager.getStatic(name)[currencyName] = new currencyStatic(this.dataManager.getData(name)[currencyName]);
        });
    }

    /**
     * Adds a new attribute to the game. {@link gameAttribute} is the class.
     * @param name - The name of the attribute.
     * @param useBoost - Indicates whether to use boost for the attribute.
     * @param initial - The initial value of the attribute.
     * @returns The newly created attribute.
     */
    public addAttribute (name: string, useBoost: boolean = true, initial: ESource = 0): gameAttribute {
        this.dataManager.setData(name, new attribute(initial));
        this.dataManager.setStatic(name, new attributeStatic(this.dataManager.getData(name), useBoost, initial));

        const classInstance = new gameAttribute(this.dataManager.getData(name), this.dataManager.getStatic(name), this);
        return classInstance;
    }

    /**
     * Creates a new game reset object with the specified currencies to reset.
     * @param currenciesToReset - The currencies to reset.
     * @param extender - An optional object to extend the game reset object with.
     * @returns The newly created game reset object.
     */
    public addReset (currenciesToReset: gameCurrency | gameCurrency[], extender?: gameReset): gameReset {
        const reset = new gameReset(currenciesToReset, extender);
        return reset;
    }
}

export { game, gameCurrency, gameAttribute, gameConfigOptions, gameDefaultConfig };