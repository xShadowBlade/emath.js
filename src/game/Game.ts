/**
 * @file Declares the main game class.
 */

import type { DecimalSource } from "../E/e";
import type { CurrencyStatic } from "../classes/Currency";
import { Currency } from "../classes/Currency";
import type { AttributeStatic } from "../classes/Attribute";
import { Attribute } from "../classes/Attribute";
import { KeyManager } from "./managers/KeyManager";
import { EventManager } from "./managers/EventManager";
import { DataManager } from "./managers/DataManager";
import { GameCurrency } from "./GameCurrency";
import { GameAttribute } from "./GameAttribute";
import { GameReset } from "./GameReset";

import type { RequiredDeep } from "./managers/ConfigManager";
import { ConfigManager } from "./managers/ConfigManager";
import type { UpgradeInit } from "../classes/Upgrade";
import type { ItemInit } from "../classes/Item";

/**
 * The game configuration interface. Some options are not used internally, but you can access them by using `game.config`.
 * See {@link gameDefaultConfig} for the default configuration.
 */
interface GameConfigOptions {
    /**
     * The mode to run the game in. Not used internally.
     */
    mode?: "development" | "production";

    /**
     * The name of the game. Not used internally.
     */
    name: {
        /**
         * The title of the game.
         */
        title?: string;

        /**
         * The ID of the game. Used for naming saves.
         */
        id: string;

        /**
         * The version of the game. Not used internally.
         */
        version?: string;
    };

    /**
     * The settings for the game.
     */
    settings?: {
        /** The framerate to use for the game and various managers. Defaults to `30` */
        framerate?: number;
    };

    /**
     * Whether or not to automatically initialize the interval-based managers.
     * Warning: If you set this to `false`, you will need to manually call `keyManager.init()` and `eventManager.init()` to initialize them.
     */
    initIntervalBasedManagers?: boolean;

    /**
     * The storage to use for the game.
     * If you want to use a different storage, you can specify it here.
     * @default window.localStorage
     */
    localStorage?: Storage | undefined;
}

type GameConfigOptionsRequired = RequiredDeep<Omit<GameConfigOptions, "localStorage">> & {
    localStorage: Storage | undefined;
};

/**
 * The default configuration for the game
 */
const gameDefaultConfig = {
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
    localStorage: undefined as Storage | undefined,
} as const satisfies GameConfigOptionsRequired;

/**
 * A game instance.
 */
class Game {
    /** The static config manager for the game. */
    protected static readonly configManager = new ConfigManager<GameConfigOptionsRequired>(gameDefaultConfig);

    /** The config object */
    public readonly config: typeof Game.configManager.options;

    /**
     * The data manager for the game.
     * As of v5.0.0, all data is stored here.
     */
    public readonly dataManager: DataManager;

    /** The key manager for the game. */
    public readonly keyManager: KeyManager;

    /** The event manager for the game. */
    public readonly eventManager: EventManager;

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
    constructor(config?: GameConfigOptions) {
        // Parse the config
        this.config = Game.configManager.parse(config);

        // Init managers
        // Init separately to allow for manual initialization
        this.dataManager = new DataManager(this, this.config.localStorage as Storage | undefined);

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
    public init(): void {
        this.dataManager.init();
    }

    /**
     * Changes the framerate of the game.
     * @param fps - The new framerate to use.
     */
    public changeFps(fps: number): void {
        this.keyManager.changeFps(fps);
        this.eventManager.changeFps(fps);
    }

    // TODO: Implement clearTickers
    // public clearTickers(): void {

    // }

    /**
     * Adds a new currency section to the game. {@link GameCurrency} is the class.
     * It automatically adds the currency and currencyStatic objects to the data and static objects for saving and loading.
     * @template N - The name
     * @template U - The upgrade names for the currency. See {@link CurrencyStatic} for more information.
     * @template I - The item names for the currency. See {@link CurrencyStatic} for more information.
     * @param name - The name of the currency section. This is also the name of the data and static objects, so it must be unique.
     * @param upgrades - The upgrades for the currency.
     * @param items - The items for the currency.
     * @returns A new instance of the gameCurrency class.
     * @example
     * const currency = game.addCurrency("currency");
     * currency.static.gain();
     * console.log(currency.value); // Decimal.dOne
     */
    public addCurrency<N extends string, U extends Readonly<UpgradeInit>[] = [], I extends Readonly<ItemInit>[] = []>(
        name: N,
        upgrades: U = [] as unknown as U,
        items: I = [] as unknown as I,
    ): GameCurrency<N, U, I> {
        // Set the data and static objects
        this.dataManager.setData(name, {
            currency: new Currency(),
        });

        // Create the class instance
        const classInstance = new GameCurrency(
            [
                (): Currency => (this.dataManager.getData(name) as { currency: Currency }).currency,
                upgrades,
                items,
            ] as ConstructorParameters<typeof CurrencyStatic>,
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
    public addAttribute<B extends boolean = true>(
        name: string,
        useBoost: B = true as B,
        initial: DecimalSource = 0,
    ): GameAttribute<B> {
        this.dataManager.setData(name, new Attribute(initial));

        const classInstance = new GameAttribute(
            [this.dataManager.getData(name) as Attribute, useBoost, initial] as ConstructorParameters<
                typeof AttributeStatic
            >,
            this,
        );
        return classInstance;
    }

    /**
     * Creates a new game reset object with the specified currencies to reset.
     * @deprecated Use the class {@link GameReset} instead.
     * This method is a wrapper for the class and does not provide any additional functionality.
     * @param args - The arguments for the game reset. See {@link GameReset} for more information.
     * @returns The newly created game reset object.
     */
    // public addReset (currenciesToReset: GameCurrency | GameCurrency[], extender?: GameReset): GameReset {
    public addReset(...args: ConstructorParameters<typeof GameReset>): GameReset {
        console.warn("eMath.js: Game.addReset is deprecated. Use the GameReset class instead.");

        const reset = new GameReset(...args);
        return reset;
    }

    /**
     * Creates a new game reset object from an object.
     * @deprecated Use the static method {@link GameReset.fromObject} instead.
     * This method is a wrapper for the static method and does not provide any additional functionality.
     * @param object - The object to create the game reset from.
     * @returns The newly created game reset object.
     */
    public addResetFromObject(object: Parameters<typeof GameReset.fromObject>[0]): GameReset {
        console.warn(
            "eMath.js: Game.addResetFromObject is deprecated. Use the GameReset.fromObject static method instead.",
        );

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
