/**
 * @file Declares the auto buyer preset.
 */
import type { Game } from "../game/Game";
import type { UpgradeStatic } from "../classes/Upgrade";
import type { CurrencyStatic } from "../classes/Currency";
import type { Decimal } from "../E/e";
interface AutoBuyerConfig {
    /**
     * Which upgrades to auto buy.
     */
    upgradesToAutoBuy: UpgradeStatic[];
    /**
     * Whether the auto buyer is unlocked / active.
     * @default true
     */
    isUnlocked?: boolean | (() => boolean);
    /**
     * How much currency is available for the auto buyer to use.
     * @example (currency) => currency.value.mul(0.1)
     */
    maxCurrencyAllocated: (currencyContext: CurrencyStatic) => Decimal;
    /**
     * How many milliseconds to wait before buying an upgrade.
     * - See {@link TimerEvent.delay} for more information.
     * - Note that too low of a value may cause performance issues.
     * @default 1000
     */
    delay?: number;
}
/**
 * Buys a set of upgrades every few ticks if there is enough currency.
 */
declare class AutoBuyer {
    /**
     * The static config manager for the auto buyer.
     */
    private static readonly configManager;
    /**
     * The id of the auto buyer.
     * Must be unique.
     */
    readonly id: string;
    /**
     * The game pointer/reference.
     */
    private readonly game;
    /**
     * The auto buyer options.
     */
    private readonly config;
    /**
     * Creates a new auto buyer instance.
     * @param id - The unique ID of the auto buyer.
     * @param game - The game instance.
     * @param config - The auto buyer options.
     */
    constructor(id: string, game: Game, config: AutoBuyerConfig);
    /**
     * Buys the upgrades if there is enough currency.
     */
    buyUpgrades(): void;
}
export { AutoBuyer };
export type { AutoBuyerConfig as AutoBuyerOptions };
