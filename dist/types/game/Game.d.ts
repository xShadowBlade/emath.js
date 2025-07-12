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
import { SkillInit } from "../classes/SkillTree";
import { GameSkillTree } from "./GameSkillTree";
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
declare const gameDefaultConfig: {
    readonly mode: "production";
    readonly name: {
        readonly title: "";
        readonly id: "";
        readonly version: "0.0.0";
    };
    readonly settings: {
        readonly framerate: 30;
    };
    readonly initIntervalBasedManagers: true;
    readonly localStorage: Storage | undefined;
};
/**
 * A game instance.
 */
declare class Game {
    /** The static config manager for the game. */
    protected static readonly configManager: ConfigManager<GameConfigOptionsRequired>;
    /** The config object */
    readonly config: typeof Game.configManager.options;
    /**
     * The data manager for the game.
     * As of v5.0.0, all data is stored here.
     */
    readonly dataManager: DataManager;
    /** The key manager for the game. */
    readonly keyManager: KeyManager;
    /** The event manager for the game. */
    readonly eventManager: EventManager;
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
     * @template TCurrencyName - The name
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
    addCurrency<TCurrencyName extends string = string, TUpgradeIds extends string = string, TItemIds extends string = string>(name: TCurrencyName, upgrades?: UpgradeInit<TUpgradeIds>[], items?: ItemInit<TItemIds>[]): GameCurrency<TCurrencyName, TUpgradeIds, TItemIds>;
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
    addAttribute<TEnableBoost extends boolean = true>(name: string, useBoost?: TEnableBoost, initial?: DecimalSource): GameAttribute<TEnableBoost>;
    /**
     * Creates a new game reset object with the specified currencies to reset.
     * @deprecated Use the class {@link GameReset} instead.
     * This method is a wrapper for the class and does not provide any additional functionality.
     * @param args - The arguments for the game reset. See {@link GameReset} for more information.
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
    /**
     * Adds a new skill tree to the game.
     * This method automatically adds the skill tree and skillTreeStatic objects to the data and static objects for saving and loading.
     * @template TSkillNames - The names of the skills in the skill tree.
     * @param name - The name of the skill tree. This is also the name of the data and static objects, so it must be unique.
     * @param skills - The skills to add to the skill tree. These are the skills that can be unlocked in the skill tree.
     * @returns A new instance of the game skill tree class.
     */
    addSkillTree<TSkillNames extends string = string>(name: string, skills: SkillInit<TSkillNames>[]): GameSkillTree<TSkillNames>;
}
export type { GameConfigOptions };
export { Game, gameDefaultConfig };
