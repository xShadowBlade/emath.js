/**
 * @file Declares the main game class.
 */
import type { DecimalSource } from "../E/e";
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
declare const gameDefaultConfig: RequiredDeep<GameConfigOptions>;
/**
 * Represents a game instance.
 */
declare class Game {
    /** The static config manager for the game. */
    protected static readonly configManager: ConfigManager<RequiredDeep<GameConfigOptions>>;
    /** The config object */
    readonly config: typeof Game.configManager.options;
    /**
     * The data manager for the game.
     * As of v5.0.0, all data is stored here.
     */
    readonly dataManager: DataManager;
    /** The key manager for the game. */
    keyManager: KeyManager;
    /** The event manager for the game. */
    eventManager: EventManager;
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
    constructor(config?: GameConfigOptions);
    /**
     * Initializes the game. Also initializes the data manager.
     * See {@link DataManager.init} for more information.
     */
    init(): void;
    /**
     * Changes the framerate of the game.
     * @param fps - The new framerate to use.
     */
    changeFps(fps: number): void;
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
    addCurrency<N extends string, U extends Readonly<UpgradeInit>[] = [], I extends Readonly<ItemInit>[] = []>(name: N, upgrades?: U, items?: I): GameCurrency<N, U, I>;
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
    addAttribute<B extends boolean = true>(name: string, useBoost?: B, initial?: DecimalSource): GameAttribute<B>;
    /**
     * Creates a new game reset object with the specified currencies to reset.
     * @deprecated Use the class {@link GameReset} instead.
     * This method is a wrapper for the class and does not provide any additional functionality.
     * @param args - The arguments for the game reset. See {@link GameReset} for more information.
     * @param currenciesToReset The currencies to reset.
     * @param extender The extender for the game reset.
     * @param onReset Function to run during reset.
     * @param condition A condition that must be met for the reset to occur.
     * @returns The newly created game reset object.
     */
    addReset(...args: ConstructorParameters<typeof GameReset>): GameReset;
    /**
     * Creates a new game reset object from an object.
     * @deprecated Use the static method {@link GameReset.fromObject} instead.
     * This method is a wrapper for the static method and does not provide any additional functionality.
     * @param object - The object to create the game reset from.
     * @returns The newly created game reset object.
     */
    addResetFromObject(object: Parameters<typeof GameReset.fromObject>[0]): GameReset;
}
export type { GameConfigOptions };
export { Game, gameDefaultConfig };
