/**
 * @file Declares the auto buyer preset.
 */
import type { Game } from "../game/Game";
import type { UpgradeStatic } from "../classes/Upgrade";
import type { CurrencyStatic } from "../classes/Currency";
import type { Decimal } from "../E/e";
import { ConfigManager } from "../game/managers/ConfigManager";
import { EventTypes } from "../game/managers/EventManager";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { TimerEvent } from "../game/managers/EventManager";

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

const autoBuyerDefaultConfig: Required<AutoBuyerConfig> = {
    upgradesToAutoBuy: [],
    isUnlocked: true,
    maxCurrencyAllocated: (currency) => currency.value,
    delay: 1000,
};

/**
 * Buys a set of upgrades every few ticks if there is enough currency.
 */
class AutoBuyer {
    /**
     * The static config manager for the auto buyer.
     */
    private static readonly configManager = new ConfigManager(autoBuyerDefaultConfig, false);

    /**
     * The id of the auto buyer.
     * Must be unique.
     */
    public readonly id: string;

    /**
     * The game pointer/reference.
     */
    private readonly game: Game;

    /**
     * The auto buyer options.
     */
    private readonly config: Required<AutoBuyerConfig>;

    /**
     * Creates a new auto buyer instance.
     * @param id - The unique ID of the auto buyer.
     * @param game - The game instance.
     * @param config - The auto buyer options.
     */
    constructor(id: string, game: Game, config: AutoBuyerConfig) {
        this.id = id;
        this.game = game;
        this.config = AutoBuyer.configManager.parse(config);

        // Create the event
        this.game.eventManager.setEvent({
            name: this.id,
            type: EventTypes.interval,
            delay: this.config.delay,
            callback: () => {
                // If the auto buyer is unlocked, buy the upgrades
                if (typeof this.config.isUnlocked === "function" ? this.config.isUnlocked() : this.config.isUnlocked) {
                    this.buyUpgrades();
                }
            },
        });
    }

    /**
     * Buys the upgrades if there is enough currency.
     */
    public buyUpgrades(): void {
        for (const upgrade of this.config.upgradesToAutoBuy) {
            const currency = upgrade.currency;
            const availableCurrency = this.config.maxCurrencyAllocated(currency);

            currency.buyUpgrade(upgrade, undefined, undefined, undefined, availableCurrency);
        }
    }
}

export { AutoBuyer };
export type { AutoBuyerConfig as AutoBuyerOptions };
