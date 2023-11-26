// import keys from "./keybinds";
// import pixigame from "./PIXI/pixiSetup";
// import dataManagement from "./save";

import { E } from "../eMath";
import { boost } from "../classes/boost";
import { currency, currencyStatic } from "../classes/currency";
import { attribute } from "../classes/attribute";
import { keyManager } from "./managers/keyManager";
import { eventManager } from "./managers/eventManager";
import { dataManager } from "./managers/dataManager";
import { gameCurrency } from "./gameCurrency";
import { gameReset } from "./resetLayer";

import { configManager, RequiredDeep } from "./managers/configManager";

// type gameType = {
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

interface gameConfigOptions {
	mode?: "development" | "production";
	name: {
		title?: string;
		id: string;
	}
    settings?: {
        framerate?: number;
    }
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
};

class gameStatic {
    public staticData: any;

    constructor (staticData?: any) {
        this.staticData = staticData ? staticData : {};
    }

    public set (name: string, value: any): void {
        this.staticData[name] = value;
    }

    public get (name: string): any {
        return this.staticData[name];
    }
}

class gameData {
    public data: any;

    constructor (data?: any) {
        this.data = data ? data : {};
    }

    public set (name: string, value: any): void {
        this.data[name] = value;
    }

    public get (name: string): any {
        return this.data[name];
    }

}

/**
 * Represents a game instance.
 */
class game {
    protected static configManager = new configManager(gameDefaultConfig);
    public config: typeof game.configManager.options;

    public data: gameData;
    public static: gameStatic;

    /**
     * The data manager for the game.
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
     * @constructor
     * @param config - The configuration object for the game.
     */
    constructor (config?: gameConfigOptions) {
        this.config = game.configManager.parse(config);
        this.data = new gameData();
        this.static = new gameStatic();
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
     * @returns A new instance of the gameCurrency class.
     */
    public addCurrency (name: string): gameCurrency {
        this.data.set(name, {
            currency: new currency(),
        });
        this.static.set(name, {
            currency: new currencyStatic(() => this.data.get(name)),
            attributes: {},
        });

        const classInstance = new gameCurrency(this.data.get(name), this.static.get(name), this);
        return classInstance;
    }

    /**
     * Adds a new currency group to the game.
     * @param name - The name of the currency group.
     * @param currencies - An array of currency names to add to the group.
     */
    public addCurrencyGroup (name: string, currencies: string[]): void {
        this.data.set(name, {});
        this.static.set(name, {
            attributes: {},
        });

        // const classInstance = new gameCurrency(() => this.data[name], () => this.static[name]);
        currencies.forEach((currencyName) => {
            this.data.get(name)[currencyName] = new currency();
            this.static.get(name)[currencyName] = new currencyStatic(() => this.data.get(name)[currencyName]);
        });
    }

    /**
     * Creates a new game reset object with the specified currencies to reset.
     * @param currenciesToReset - The currencies to reset.
     * @returns The newly created game reset object.
     */
    public addReset (currenciesToReset: gameCurrency[], extender?: gameReset): gameReset {
        const reset = new gameReset(currenciesToReset, extender);
        return reset;
    }
}

export { game, gameCurrency, gameStatic, gameData, gameConfigOptions, gameDefaultConfig };