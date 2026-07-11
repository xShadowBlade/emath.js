import "reflect-metadata";
import { Decimal, DecimalSource } from "../E/e";
import type { DataManager, StaticClassWithData } from "../game";
import { SubscribableDataEntry } from "../game/managers/DataEntry";
import { Boost } from "./Boost";
import { InvalidDecimalProtections } from "./InvalidDecimalProtections";
import { SkillNode, Upgrade } from "./Upgrade";
interface CurrencyResetOptions {
    resetCurrency: boolean;
    resetUpgradeLevels: boolean;
    resetItemAmounts: boolean;
    runUpgradeEffect: boolean;
}
/**
 * Stores the data for a currency.
 */
declare class CurrencyData {
    /**
     * A placeholder readonly currency data object that returns a value of 0.
     */
    static readonly placeholderCurrencyData: CurrencyData;
    /**
     * The current value of the currency.
     */
    value: Decimal;
}
/**
 * A currency that has a value that can be gained and spent, and can have upgrades that have various effects.
 * @example
 * const currency = new Currency();
 * currency.gain();
 * console.log(currency.value); // 1
 */
declare class Currency implements StaticClassWithData {
    /**
     * A placeholder currency object that returns a value of 0.
     * Note: This is used for upgrades that are created before the currency is added to the data manager.
     */
    static readonly placeholderCurrency: Currency;
    /**
     * The id of the currency.
     * Used to retrieve the currency when its data is stored in the data manager.
     */
    readonly id: string;
    /**
     * Stores a list of each of this currency's upgrades and their corresponding data.
     * To get an upgrade, either store a reference to the upgrade when it is created (recommended), or use {@link getUpgrade} to retrieve it by id.
     */
    readonly upgrades: Upgrade[];
    /**
     * @returns A reference to the data.
     */
    protected dataSupplier: () => CurrencyData;
    /**
     * @returns The pointer of the data.
     */
    protected get data(): CurrencyData;
    /**
     * A boost that affects the currency gain in {@link gain}.
     * @see {@link Boost}
     */
    readonly boost: Boost;
    /**
     * The default value of the currency when it is {@link reset}.
     * Note: This is not the same as the default value of the currency when it is created, which is always `0`.
     * @see {@link reset}
     */
    readonly defaultValue: Decimal;
    /**
     * The protections for {@link value}.
     * See {@link InvalidDecimalProtections}.
     */
    readonly valueProtections: InvalidDecimalProtections;
    /**
     * The current value of the currency.
     * To add value to the currency based on its boost, use {@link gain} instead.
     * @returns The current value of the currency.
     */
    get value(): Decimal;
    set value(value: DecimalSource);
    /**
     * A {@link SubscribableDataEntry} for the {@link value} of this currency.
     * @see {@link SubscribableDataEntry}
     */
    readonly valueDataEntry: SubscribableDataEntry<Decimal>;
    /**
     * A reference to the {@link DataManager} that this currency is added to and where its data is stored.
     * Set when {@link onAddToDataManager} is called.
     */
    protected dataManagerReference: DataManager | null;
    /**
     * Creates a new currency with the given id.
     * @param id - The {@link id} of the currency.
     */
    constructor(id: string);
    onLoadData(): void;
    onAddToDataManager(dataManager: DataManager): void;
    /**
     * Resets the currency and upgrade levels.
     * @param resetCurrency - Whether to reset the currency value. Default is `true`.
     * @param resetUpgradeLevels - Whether to reset the upgrade levels. Default is `true`.
     * @param runUpgradeEffect - Whether to run the upgrade effect. Default is `true`.
     * @example
     * currency.reset();
     * console.log(currency.value); // 0, or the default value
     */
    reset(resetCurrency?: boolean, resetUpgradeLevels?: boolean, runUpgradeEffect?: boolean): void;
    /**
     * Resets the currency and upgrade levels with the given options.
     * @param reset - An object containing the reset options.
     * @see {@link CurrencyResetOptions}
     */
    reset(reset?: Partial<CurrencyResetOptions>): void;
    /**
     * Adds to the currency value based on the {@link boost}'s {@link Boost.calculate}d value.
     * @param dtMultiplier - Delta time / multiplier, assuming you gain once every second. Ex. 0.5 = half gain.
     * @returns What was gained, NOT the new value.
     * @example
     * // Gain a random number between 1 and 10, and return the amount gained.
     * currency.gain(Math.random() * 10);
     */
    gain(dtMultiplier?: DecimalSource): Decimal;
    /**
     * Retrieves an upgrade object based on the provided id.
     * It is recommended to store a reference to the upgrade when it is created instead of using this method.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     * @example
     * const upgrade = currency.getUpgrade("healthBoost");
     * console.log(upgrade); // upgrade object
     */
    getUpgrade(id: string): Upgrade | null;
    /**
     * Retrieves an upgrade object as a {@link SkillNode} based on the provided id.
     * If the upgrade is not a {@link SkillNode}, it will return null.
     * It is recommended to store a reference to the skill node when it is created instead of using this method.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object as a {@link SkillNode} if found and is a {@link SkillNode}, otherwise null.
     */
    getUpgradeAsSkillNode(id: string): SkillNode | null;
    /**
     * Adds an upgrade to the currency and runs its effect if specified.
     * @param upgrade - The upgrade to add.
     * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
     * @returns The added upgrades.
     * @example
     * const healthBoostUpgrade = currency.addUpgrade(
     *     new Upgrade("healthBoost")
     *         .withName("Health Boost")
     *         .withDescriptionSupplier((upgradeContext) => `Increases health by ${upgradeContext.level.mul(10).format()}.`)
     *         .withCost((level) => level.mul(10))
     *         .withMaxLevel(10)
     *         .withEffect((level, upgradeContext, currencyContext) => {
     *             // Set / update the boost
     *             // health: Currency
     *             health.boost.setBoost(
     *                 new BoostObject("healthBoost")
     *                     .withName("Health Boost")
     *                     .withDescriptionSupplier(() => `Boosts health by x${Decimal.pow(2, level.sub(1)).format()}.`)
     *                     .withValue((n) => n.mul(Decimal.pow(2, level.sub(1))))
     *                     .withOrder(OperationBoostOrder.multiply)
     *             );
     *         }
     * );
     */
    addUpgrade(upgrade: Upgrade, runEffectInstantly?: boolean): Upgrade;
    /**
     * Adds multiple upgrades to the currency and runs their effects if specified.
     * @param upgrades - The upgrades to add.
     * @param runEffectInstantly - Whether to run the effects immediately. Defaults to `true`.
     * @returns The added upgrades.
     * @see {@link addUpgrade}
     */
    addUpgrades(upgrades: Upgrade[], runEffectInstantly?: boolean): Upgrade[];
    /**
     * Changes the {@link valueProtections} options for this currency.
     * Equivalent to calling {@link InvalidDecimalProtections.setProtections} on the {@link valueProtections} object.
     * @param newValueProtections - The new value protections to set.
     * @returns this
     */
    withValueProtectionOptions(newValueProtections: Parameters<InvalidDecimalProtections["setProtections"]>[0]): this;
}
export { Currency, CurrencyData };
export type { CurrencyResetOptions };
