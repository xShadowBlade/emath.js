/**
 * @file Declares the main game class.
 */

import { ESource } from "../E/eMain";
// import { boost } from "../classes/boost";
import { currency, currencyStatic } from "../classes/currency";
import { Attribute, AttributeStatic } from "../classes/attribute";
import { KeyManager } from "./managers/keyManager";
import { EventManager } from "./managers/eventManager";
import { DataManager } from "./managers/dataManager";
import { GameCurrency } from "./gameCurrency";
import { GameAttribute } from "./gameAttribute";
import { GameReset } from "./resetLayer";

import { ConfigManager, RequiredDeep } from "./managers/configManager";

/**
 * A pointer to a value or a function that returns a value by reference.
 */
type Pointer<T> = (() => T) | T;

/**
 * The game configuration interface. Some options are not used internally, but you can access them by using `game.config`.
 */
interface GameConfigOptions {
    /** The mode to run the game in. Not used internally. */
	mode?: "development" | "production";
    /** The name of the game. Not used internally. */
	name: {
        /** The title of the game.  */
		title?: string;
        /** The ID of the game. Used for naming saves. */
		id: string;
        /** The version of the game. Not used internally. */
        version?: string;
	}
    /** The settings for the game. */
    settings?: {
        /** The framerate to use for the game and various managers. Defaults to `30` */
        framerate?: number;
    }
    /**
     * Whether or not to automatically initialize the interval-based managers.
     * Warning: If you set this to `false`, you will need to manually call `keyManager.init()` and `eventManager.init()` to initialize them.
     */
    initIntervalBasedManagers?: boolean;
}

const gameDefaultConfig: RequiredDeep<GameConfigOptions> = {
    mode: "production",
    name: {
        title: "",
        id: "",
        version: "0.0.0",
    },
    settings: {
        framerate: 30,
    },
    initIntervalBasedManagers: true,
};

/**
 * Represents a game instance.
 */
class Game {
    protected static configManager = new ConfigManager(gameDefaultConfig);
    /** The config object */
    public config: typeof Game.configManager.options;

    // public data: gameData;
    // public static: gameStatic;

    /**
     * The data manager for the game.
     * As of v5.0.0, all data is stored here.
     */
    public dataManager: DataManager;

    /** The key manager for the game. */
    public keyManager: KeyManager;

    /** The event manager for the game. */
    public eventManager: EventManager;

    protected tickers: ((dt: number) => void)[];

    /**
     * Creates a new instance of the game class.
     * @param config - The configuration object for the game.
     * @example
     * const myGame = new game({
     *     name: {
     *         title: "My Game",
     *         id: "my-game",
     *     },
     *     // Additional options here
     * });
     */
    constructor (config?: GameConfigOptions) {
        this.config = Game.configManager.parse(config);
        // this.data = new gameData();
        // this.static = new gameStatic();
        this.dataManager = new DataManager(this); // Init separately
        this.keyManager = new KeyManager({
            autoAddInterval: this.config.initIntervalBasedManagers,
            fps: this.config.settings.framerate,
        });
        this.eventManager = new EventManager({
            autoAddInterval: this.config.initIntervalBasedManagers,
            fps: this.config.settings.framerate,
        });
        this.tickers = [];
    }

    /** Initializes the game. Also initializes the data manager. */
    public init (): void {
        this.dataManager.init();
    }

    /**
     * Changes the framerate of the game.
     * @param fps - The new framerate to use.
     */
    public changeFps (fps: number): void {
        this.keyManager.changeFps(fps);
        this.eventManager.changeFps(fps);
    }

    /**
     * Adds a new currency section to the game. {@link GameCurrency} is the class.
     * It automatically adds the currency and currencyStatic objects to the data and static objects for saving and loading.
     * @param name - The name of the currency section. This is also the name of the data and static objects, so it must be unique.
     * @returns A new instance of the gameCurrency class.
     * @example
     * const currency = game.addCurrency("currency");
     * currency.static.gain();
     * console.log(currency.value); // E(1)
     */
    public addCurrency<Name extends string> (name: Name): GameCurrency<Name> {
        this.dataManager.setData(name, {
            currency: new currency(),
        });
        this.dataManager.setStatic(name, {
            // @ts-expect-error - fix this
            currency: new currencyStatic(() => this.dataManager.getData(name).currency),
            // attributes: {},
        });

        // @ts-expect-error - fix this
        const classInstance = new GameCurrency(() => this.dataManager.getData(name).currency, () => this.dataManager.getStatic(name).currency, this, name);


        // const dataRef = this.dataManager.setData(name, {
        //     currency: new currency(),
        // });
        // const staticRef = this.dataManager.setStatic(name, {
        //     currency: new currencyStatic(dataRef.value.currency),
        // });
        // const classInstance = new gameCurrency(() => dataRef.value.currency, () => staticRef.currency as currencyStatic, this, name);
        return classInstance;
    }

    // /**
    //  * Adds a new currency group to the game.
    //  * @deprecated Use {@link addCurrency} instead. This method is buggy and will be removed in a future version.
    //  * @param name - The name of the currency group.
    //  * @param currencies - An array of currency names to add to the group.
    //  * @returns An array of gameCurrency objects, in the same order as the input array.
    //  */
    // public addCurrencyGroup (name: string, currencies: string[]): gameCurrency<string>[] {
    //     throw new Error("addCurrencyGroup is deprecated. Use addCurrency instead.");
    //     // this.dataManager.setData(name, {});
    //     // this.dataManager.setStatic(name, {
    //     //     attributes: {},
    //     // });

    //     // // const classInstance = new gameCurrency(() => this.data[name], () => this.static[name]);
    //     // const outCurrencies: gameCurrency[] = [];
    //     // // currencies.forEach((currencyName) => {
    //     // //     this.dataManager.getData(name)[currencyName] = new currency();
    //     // //     this.dataManager.getStatic(name)[currencyName] = new currencyStatic(this.dataManager.getData(name)[currencyName]);
    //     // //     outCurrencies.push(new gameCurrency(() => this.dataManager.getData(name)[currencyName], () => this.dataManager.getStatic(name)[currencyName], this, currencyName));
    //     // // });
    //     // currencies.forEach((currencyName) => {
    //     //     const dataRef = this.dataManager.setData(currencyName, new currency());
    //     //     const staticRef = this.dataManager.setStatic(currencyName, new currencyStatic(dataRef));
    //     //     outCurrencies.push(new gameCurrency(dataRef as currency, staticRef as currencyStatic, this, currencyName));
    //     // });
    //     // return outCurrencies;
    // }

    /**
     * Adds a new attribute to the game. {@link GameAttribute} is the class.
     * It automatically adds the attribute and attributeStatic objects to the data and static objects for saving and loading.
     * @param name - The name of the attribute.
     * @param useBoost - Indicates whether to use boost for the attribute.
     * @param initial - The initial value of the attribute.
     * @returns The newly created attribute.
     * @example
     * const myAttribute = game.addAttribute("myAttribute");
     */
    public addAttribute (name: string, useBoost: boolean = true, initial: ESource = 0): GameAttribute {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dataRef = this.dataManager.setData(name, new Attribute(initial));
        // @ts-expect-error - fix this
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const staticRef = this.dataManager.setStatic(name, new AttributeStatic(this.dataManager.getData(name), useBoost, initial));
        // const staticRef = this.dataManager.setStatic(name, new attributeStatic(dataRef, useBoost, initial));

        // @ts-expect-error - fix this
        const classInstance = new GameAttribute(this.dataManager.getData(name), this.dataManager.getStatic(name), this);
        // const classInstance = new gameAttribute(() => dataRef as attribute, () => staticRef as attributeStatic, this);
        return classInstance;
    }

    /**
     * Creates a new game reset object with the specified currencies to reset.
     * @param currenciesToReset - The currencies to reset.
     * @param extender - An optional object to extend the game reset object with.
     * @returns The newly created game reset object.
     */
    public addReset (currenciesToReset: GameCurrency<string> | GameCurrency<string>[], extender?: GameReset): GameReset {
        const reset = new GameReset(currenciesToReset, extender);
        return reset;
    }
}

// export { Game as Game, gameCurrency, gameAttribute, GameConfigOptions as gameConfigOptions, gameDefaultConfig, Pointer };
export { Game, GameConfigOptions, gameDefaultConfig, Pointer };