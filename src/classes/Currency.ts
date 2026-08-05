/**
 * @file Declares the currency class and its related classes.
 */
import { Type } from "class-transformer";
import "reflect-metadata"; // Required for class-transformer

import { Decimal, DecimalSource } from "../E/e";
import type { DataManager, StaticClassWithData } from "../game";
import { SubscribableDataEntry } from "../game/managers/DataEntry";
import { Boost } from "./Boost";
import { InvalidDecimalProtections } from "./InvalidDecimalProtections";
import { SkillNode, Upgrade } from "./Upgrade";

interface CurrencyResetOptions {
    resetCurrency: boolean;
    resetUpgradeLevels: boolean;
    runUpgradeEffect: boolean;
}

/**
 * Stores the data for a currency.
 */
class CurrencyData {
    /**
     * A placeholder readonly currency data object that returns a value of 0.
     */
    public static readonly placeholderCurrencyData: CurrencyData = new (class implements CurrencyData {
        public get value(): Decimal {
            return new Decimal(Decimal.dZero);
        }

        public set value(level: Decimal) {
            console.warn(
                "eMath.js: Attempted to set value on placeholder currency data. Possibly Currency dataSupplier has not been set yet.",
            );
        }
    })();

    /**
     * The current value of the currency.
     */
    @Type(() => Decimal)
    public value: Decimal = new Decimal(Decimal.dZero);
}

/**
 * A currency that has a value that can be gained and spent, and can have upgrades that have various effects.
 * @example
 * const currency = new Currency();
 * currency.gain();
 * console.log(currency.value); // 1
 */
class Currency implements StaticClassWithData {
    /**
     * A placeholder currency object that returns a value of 0.
     * Note: This is used for upgrades that are created before the currency is added to the data manager.
     */
    public static readonly placeholderCurrency = ((): Currency => {
        const out = new Currency("placeholderCurrency");
        out.dataSupplier = (): CurrencyData => CurrencyData.placeholderCurrencyData;
        return out;
    })();

    /**
     * The id of the currency.
     * Used to retrieve the currency when its data is stored in the data manager.
     */
    public readonly id: string;

    /**
     * Stores a list of each of this currency's upgrades and their corresponding data.
     * To get an upgrade, either store a reference to the upgrade when it is created (recommended), or use {@link getUpgrade} to retrieve it by id.
     */
    public readonly upgrades: Upgrade[] = [];

    /**
     * @returns A reference to the data.
     */
    protected dataSupplier: () => CurrencyData = () => {
        // Warn here and not in Upgrade.dataSupplier because Upgrade.dataSupplier can be called in Upgrade.runEffectOnAdd before dataSupplier is set, which is expected behavior
        // However, Currency.dataSupplier should be set before any upgrades are added to the currency.
        console.warn("emath.js: Currency dataSupplier has not set. Returning placeholder data.");
        return CurrencyData.placeholderCurrencyData;
    };

    /**
     * @returns The pointer of the data.
     */
    protected get data(): CurrencyData {
        return this.dataSupplier();
    }

    /**
     * A boost that affects the currency gain in {@link gain}.
     * @see {@link Boost}
     */
    public readonly boost: Boost = new Boost();

    /**
     * The default value of the currency when it is {@link reset}.
     * Note: This is not the same as the default value of the currency when it is created, which is always `0`.
     * @see {@link reset}
     */
    public readonly defaultValue: Decimal = Decimal.dZero;

    /**
     * The protections for {@link value}.
     * See {@link InvalidDecimalProtections}.
     */
    public readonly valueProtections = new InvalidDecimalProtections({
        allowNaN: false,
        allowInfinite: false,
    });

    /**
     * The current value of the currency.
     * To add value to the currency based on its boost, use {@link gain} instead.
     * @returns The current value of the currency.
     */
    get value(): Decimal {
        return this.data.value;
    }
    set value(value: DecimalSource) {
        this.data.value = this.valueProtections.validateValueOrElse(
            value,
            this.data.value,
            `Currency "${this.id}" value`,
            this,
        );

        this.valueDataEntry.notifyListeners();
    }

    /**
     * A {@link SubscribableDataEntry} for the {@link value} of this currency.
     * @see {@link SubscribableDataEntry}
     */
    public readonly valueDataEntry = SubscribableDataEntry.fromGetterSetter(
        () => this.value,
        (newValue) => {
            this.value = newValue;
        },
        false,
    );

    /**
     * A reference to the {@link DataManager} that this currency is added to and where its data is stored.
     * Set when {@link onAddToDataManager} is called.
     */
    protected dataManagerReference: DataManager | null = null;

    /**
     * Creates a new currency with the given id.
     * @param id - The {@link id} of the currency.
     */
    constructor(id: string) {
        this.id = id;
    }

    public onLoadData(): void {
        // Run setter method to run protections and other side effects of setting the value.
        this.value = this.data.value;

        // Call the effect function for each upgrade
        for (const upgrade of this.upgrades) {
            upgrade.runEffect();
        }
    }

    public onAddToDataManager(dataManager: DataManager): void {
        this.dataManagerReference = dataManager;

        this.dataSupplier = dataManager.setData(this.id, new CurrencyData());

        // Add existing upgrades to the data manager
        for (const upgrade of this.upgrades) {
            upgrade.onAddToDataManager(dataManager, this.id);
        }
    }

    /**
     * Resets the currency and upgrade levels.
     * @param resetCurrency - Whether to reset the currency value. Default is `true`.
     * @param resetUpgradeLevels - Whether to reset the upgrade levels. Default is `true`.
     * @param runUpgradeEffect - Whether to run the upgrade effect. Default is `true`.
     * @example
     * currency.reset();
     * console.log(currency.value); // 0, or the default value
     */
    public reset(resetCurrency?: boolean, resetUpgradeLevels?: boolean, runUpgradeEffect?: boolean): void;
    /**
     * Resets the currency and upgrade levels with the given options.
     * @param reset - An object containing the reset options.
     * @see {@link CurrencyResetOptions}
     */
    public reset(reset?: Partial<CurrencyResetOptions>): void;
    public reset(
        resetCurrencyOrResetObj?: boolean | Partial<CurrencyResetOptions>,
        resetUpgradeLevels?: boolean,
        runUpgradeEffect?: boolean,
    ): void {
        const resetObj: CurrencyResetOptions = {
            resetCurrency: true,
            resetUpgradeLevels: true,
            runUpgradeEffect: true,
        };
        // Parse the arguments
        if (typeof resetCurrencyOrResetObj === "object") {
            Object.assign(resetObj, resetCurrencyOrResetObj);
        } else {
            Object.assign(resetObj, {
                resetCurrency: resetCurrencyOrResetObj,
                resetUpgradeLevels: resetUpgradeLevels,
                runUpgradeEffect: runUpgradeEffect,
            });
        }

        // Reset the value
        if (resetObj.resetCurrency) this.value = this.defaultValue;

        // Reset the upgrades
        if (resetObj.resetUpgradeLevels) {
            for (const upgrade of Object.values<Upgrade>(this.upgrades)) {
                // Reset the level to the default level
                upgrade.level = new Decimal(upgrade.defaultLevel);

                // Call the effect function for each upgrade
                if (resetObj.runUpgradeEffect) upgrade.runEffect();
            }
        }
    }

    /**
     * Adds to the currency value based on the {@link boost}'s {@link Boost.calculate}d value.
     * @param dtMultiplier - Delta time / multiplier, assuming you gain once every second. Ex. 0.5 = half gain.
     * @returns What was gained, NOT the new value.
     * @example
     * // Gain a random number between 1 and 10, and return the amount gained.
     * currency.gain(Math.random() * 10);
     */
    public gain(dtMultiplier?: DecimalSource): Decimal {
        let toAdd = this.boost.calculate();
        if (dtMultiplier !== undefined) {
            toAdd = toAdd.mul(dtMultiplier);
        }

        this.value = this.value.add(toAdd);
        return toAdd;
    }

    /**
     * Retrieves an upgrade object based on the provided id.
     * It is recommended to store a reference to the upgrade when it is created instead of using this method.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     * @example
     * const upgrade = currency.getUpgrade("healthBoost");
     * console.log(upgrade); // upgrade object
     */
    public getUpgrade(id: string): Upgrade | null {
        return this.upgrades.find((upgrade) => upgrade.id === id) ?? null;
    }

    /**
     * Retrieves an upgrade object as a {@link SkillNode} based on the provided id.
     * If the upgrade is not a {@link SkillNode}, it will return null.
     * It is recommended to store a reference to the skill node when it is created instead of using this method.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object as a {@link SkillNode} if found and is a {@link SkillNode}, otherwise null.
     */
    public getUpgradeAsSkillNode(id: string): SkillNode | null {
        const upgrade = this.getUpgrade(id);

        if (!upgrade) {
            return null;
        }

        if (upgrade instanceof SkillNode) {
            return upgrade;
        }

        return null;
    }

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
    public addUpgrade<TUpgradeEffectReturnType>(
        upgrade: Upgrade<TUpgradeEffectReturnType>,
        runEffectInstantly = true,
    ): Upgrade<TUpgradeEffectReturnType> {
        // Run the effect instantly if needed
        if (runEffectInstantly) upgrade.runEffect();
        upgrade.runEffectOnAdd();

        upgrade.withCurrencySupplier(() => this);

        // Add the upgrade to this.upgrades
        this.upgrades.push(upgrade as Upgrade<unknown>);

        // If the data manager reference exists, add the upgrade to the data manager
        if (this.dataManagerReference) {
            upgrade.onAddToDataManager(this.dataManagerReference, this.id);
        }

        return upgrade;
    }
    /**
     * Adds multiple upgrades to the currency and runs their effects if specified.
     * @param upgrades - The upgrades to add.
     * @param runEffectInstantly - Whether to run the effects immediately. Defaults to `true`.
     * @returns The added upgrades.
     * @see {@link addUpgrade}
     */
    public addUpgrades<TUpgradeEffectReturnType>(
        upgrades: Upgrade<TUpgradeEffectReturnType>[],
        runEffectInstantly = true,
    ): Upgrade<TUpgradeEffectReturnType>[] {
        for (const upgrade of upgrades) {
            this.addUpgrade(upgrade, runEffectInstantly);
        }

        return upgrades;
    }

    // Setters
    /**
     * Changes the {@link valueProtections} options for this currency.
     * Equivalent to calling {@link InvalidDecimalProtections.setProtections} on the {@link valueProtections} object.
     * @param newValueProtections - The new value protections to set.
     * @returns this
     */
    public withValueProtectionOptions(
        newValueProtections: Parameters<InvalidDecimalProtections["setProtections"]>[0],
    ): this {
        this.valueProtections.setProtections(newValueProtections);
        return this;
    }
}

export { Currency, CurrencyData };
export type { CurrencyResetOptions };
