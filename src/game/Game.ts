/**
 * @file Declares the main game class.
 */

import type { DecimalSource } from "../E/e";
import { Currency, CurrencyStatic } from "../classes/Currency";
import { Attribute, AttributeStatic } from "../classes/Attribute";
import { KeyManager } from "./managers/KeyManager";
import { EventManager } from "./managers/EventManager";
import { DataManager } from "./managers/DataManager";
import { GameCurrency } from "./GameCurrency";
import { GameAttribute } from "./GameAttribute";
import { GameReset } from "./ResetLayer";

import type { RequiredDeep } from "./managers/ConfigManager";
import { ConfigManager } from "./managers/ConfigManager";
import type { UpgradeInit } from "../classes/Upgrade";

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
	};
    /** The settings for the game. */
    settings?: {
        /** The framerate to use for the game and various managers. Defaults to `30` */
        framerate?: number;
    };
    /**
     * Whether or not to automatically initialize the interval-based managers.
     * Warning: If you set this to `false`, you will need to manually call `keyManager.init()` and `eventManager.init()` to initialize them.
     */
    initIntervalBasedManagers?: boolean;
}

/** The default configuration for the game. */
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
    /** The static config manager for the game. */
    protected static readonly configManager = new ConfigManager(gameDefaultConfig);

    /** The config object */
    public readonly config: typeof Game.configManager.options;

    /**
     * The data manager for the game.
     * As of v5.0.0, all data is stored here.
     */
    public readonly dataManager: DataManager;

    /** The key manager for the game. */
    public keyManager: KeyManager;

    /** The event manager for the game. */
    public eventManager: EventManager;

    /** The tickers for the game. */
    protected readonly tickers: ((dt: number) => void)[];

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
        // Parse the config
        this.config = Game.configManager.parse(config);

        // Init managers
        // Init separately to allow for manual initialization
        this.dataManager = new DataManager(this);

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

    /**
     * Initializes the game. Also initializes the data manager.
     * See {@link DataManager.init} for more information.
     */
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
     * @template N - The name
     * @template U - The upgrade names for the currency. See {@link CurrencyStatic} for more information.
     * @param name - The name of the currency section. This is also the name of the data and static objects, so it must be unique.
     * @param upgrades - The upgrades for the currency.
     * @returns A new instance of the gameCurrency class.
     * @example
     * const currency = game.addCurrency("currency");
     * currency.static.gain();
     * console.log(currency.value); // Decimal.dOne
     */
    public addCurrency<N extends string, U extends UpgradeInit[] = []> (name: N, upgrades: U = [] as unknown as U): GameCurrency<N, U> {
        // Set the data and static objects
        this.dataManager.setData(name, {
            currency: new Currency(),
        });
        this.dataManager.setStatic(name, {
            currency: new CurrencyStatic(() => (this.dataManager.getData(name) as { currency: Currency }).currency, upgrades),
        });

        // Create the class instance
        const classInstance = new GameCurrency(
            () => (this.dataManager.getData(name) as { currency: Currency }).currency,
            () => (this.dataManager.getStatic(name) as { currency: CurrencyStatic<U> }).currency,
            this,
            name,
        );

        return classInstance;
    }

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
    public addAttribute<B extends boolean = true> (name: string, useBoost: B = true as B, initial: DecimalSource = 0): GameAttribute<B> {
        this.dataManager.setData(name, new Attribute(initial));
        this.dataManager.setStatic(name, new AttributeStatic(this.dataManager.getData(name) as Attribute, useBoost, initial));

        const classInstance = new GameAttribute(this.dataManager.getData(name) as Attribute, this.dataManager.getStatic(name) as AttributeStatic<B>, this);
        return classInstance;
    }

    /**
     * Creates a new game reset object with the specified currencies to reset.
     * @param args - The arguments for the game reset. See {@link GameReset} for more information.
     * @param currenciesToReset The currencies to reset.
     * @param extender The extender for the game reset.
     * @param onReset Function to run during reset.
     * @param condition A condition that must be met for the reset to occur.
     * @returns The newly created game reset object.
     */
    // public addReset (currenciesToReset: GameCurrency | GameCurrency[], extender?: GameReset): GameReset {
    public addReset (...args: ConstructorParameters<typeof GameReset>): GameReset {
        const reset = new GameReset(...args);
        return reset;
    }

    /**
     * Creates a new game reset object from an object. See {@link GameReset.fromObject} for more information.
     * @param object - The object to create the game reset from.
     * @returns The newly created game reset object.
     */
    public addResetFromObject (object: Parameters<typeof GameReset.fromObject>[0]): GameReset {
        return GameReset.fromObject(object);
    }
}
// test
// const myGame = new Game();
// const currency = myGame.addCurrency("curr", [
//     {
//         id: "upgId1",
//         cost: (level) => level.mul(10),
//     },
//     {
//         id: "upgId2",
//         cost: (level) => level.mul(20),
//     },
// ] as const satisfies UpgradeInit[]);

// const upgrade1 = currency.static.getUpgrade("upgId1");

export type { GameConfigOptions };
export { Game, gameDefaultConfig };
