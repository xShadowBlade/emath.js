/**
 * @file
 */
import { BoostObject, OperationBoostOrder } from "../classes/Boost";
import { approximateDerivative } from "../classes/numericalAnalysis/numericalAnalysis";
import { Upgrade } from "../classes/Upgrade";
import { Decimal, DecimalSource } from "../E/e";
import { GameFormatClass } from "./GameFormats";

class TableProperty {
    constructor(
        public readonly displayName: string,
        public readonly defaultEnabled: boolean,
        public readonly compute: (upgrade: Upgrade, effect: BoostObject, level: Decimal) => Decimal,
    ) {}
}

type TablePropertyKey = keyof typeof UpgradeTable.tabulableProperties;

type TablePropertyConfig = Record<TablePropertyKey, boolean>;

/**
 * Tables costs and effects of upgrades.
 */
class UpgradeTable {
    /**
     * Contains functions to generate levels for the upgrade table.
     */
    public static levelGenerators = {
        /**
         * Generates levels linearly from `start` to `end` with a given `step`.
         * @param start - The starting level. Defaults to `1`.
         * @param end - The ending level. Defaults to `1000`.
         * @param step - The step size between levels. Defaults to `1`.
         * @returns An array of Decimal levels from `start` to `end` with the specified `step`.
         */
        linear: (
            start: DecimalSource = 1,
            end: DecimalSource = 1000,
            step: DecimalSource = Decimal.dOne,
        ): Decimal[] => {
            start = Decimal.fromValue_noAlloc(start);
            end = Decimal.fromValue_noAlloc(end);
            step = Decimal.fromValue_noAlloc(step);

            const levels: Decimal[] = [];
            for (let level = start; level.lte(end); level = level.plus(step)) {
                levels.push(level);
            }
            return levels;
        },

        /**
         * Generates levels based on specified increments with {@link incrementStop} repetitions of each increment.
         * @param increments - An array of increments to use for generating levels. Defaults to `[1, 5, 10, 25, 50, 100, 250, 500, 1000]`.
         * @param incrementStop - The level at which to stop repeating each increment. Defaults to `10`.
         * @returns An array of Decimal levels generated based on the specified increments and increment stop.
         * @example
         * selectedIncrements([1, 5], 5) // [1, 2, 3, 4, 5, 10, 15, 20, 25]
         */
        selectedIncrements: (
            increments: DecimalSource[] = [1, 5, 10, 25, 50, 100, 250, 500, 1000],
            incrementStop: DecimalSource = Decimal.dTen,
        ): Decimal[] => {
            increments = increments.map((inc) => Decimal.fromValue_noAlloc(inc));
            incrementStop = Decimal.fromValue_noAlloc(incrementStop);

            const levels: Decimal[] = [];

            let currentLevel = new Decimal(1);

            for (const increment of increments) {
                while (currentLevel.lt(incrementStop.times(increment))) {
                    levels.push(currentLevel);
                    currentLevel = currentLevel.plus(increment);
                }
            }

            levels.push(currentLevel);

            return levels;
        },
    } as const satisfies Record<string, () => Decimal[]>;

    protected static getEffectValueWithAlternateLevel(
        upgrade: Upgrade,
        effect: BoostObject,
        levelOverride: Decimal,
    ): Decimal {
        return upgrade.getFieldWithAlternateLevel(levelOverride, () => GameFormatClass.getBoostObjectValue(effect));
    }

    public static readonly tabulableProperties = {
        /**
         * Cost of the upgrade at the given level.
         * @default true
         */
        cost: new TableProperty("Cost", true, (upgrade, effect, level) => upgrade.cost(level)),

        /**
         * First derivative of the cost function at the given level.
         * @default true
         */
        costFirstDerivative: new TableProperty("Cost'", true, (upgrade, effect, level) =>
            approximateDerivative(upgrade.cost.bind(upgrade), level),
        ),

        /**
         * Second derivative of the cost function at the given level.
         * @default false
         */
        costSecondDerivative: new TableProperty("Cost''", false, (upgrade, effect, level) =>
            approximateDerivative((x) => approximateDerivative(upgrade.cost.bind(upgrade), x), level),
        ),

        /**
         * Successive quotient of the cost function at the given level.
         * = `cost(level + 1) / cost(level)`
         * @default true
         */
        costSuccessiveQuotient: new TableProperty("Cost Successive Quotient", true, (upgrade, effect, level) =>
            upgrade.cost(level.plus(Decimal.dOne)).div(upgrade.cost(level)),
        ),

        /**
         * The effect of the upgrade at the given level.
         * @default true
         */
        effect: new TableProperty("Effect", true, (upgrade, effect, level) =>
            UpgradeTable.getEffectValueWithAlternateLevel(upgrade, effect, level),
        ),

        /**
         * Cost per effect at the given level.
         * = `cost(level) / effect(level)`
         * @default true
         */
        costPerEffect: new TableProperty("Cost per Effect", true, (upgrade, effect, level) =>
            upgrade.cost(level).div(UpgradeTable.getEffectValueWithAlternateLevel(upgrade, effect, level)),
        ),
    } as const satisfies Record<string, TableProperty>;

    public static readonly defaultTableProperties = Object.fromEntries(
        Object.entries(UpgradeTable.tabulableProperties).map(([key, prop]) => [key, prop.defaultEnabled]),
    ) as TablePropertyConfig;

    public readonly upgrade: Upgrade;
    public readonly upgradeEffect: BoostObject;

    constructor(upgrade: Upgrade, upgradeEffect?: BoostObject) {
        this.upgrade = upgrade;
        this.upgradeEffect =
            upgradeEffect ??
            (() => {
                const effect = upgrade.latestEffectResult;

                if (effect instanceof BoostObject) {
                    return effect;
                } else {
                    return new BoostObject("defaultEffect")
                        .withOrder(OperationBoostOrder.set)
                        .withValue((input) => input);
                }
            })();
    }

    /**
     * Generates a table of upgrade properties for the specified levels and configuration.
     * @param levels - An array of Decimal levels for which to generate the table.
     * @param config - A partial configuration object specifying which properties to include in the table. Defaults to all properties enabled.
     * @returns An array of records, where each record represents a row in the table with property names as keys and their corresponding values as strings.
     * Can be used with {@link console.table} to display the table in the console.
     */
    public generateTable(levels: Decimal[], config: Partial<TablePropertyConfig> = {}): Record<string, string>[] {
        const finalConfig: TablePropertyConfig = { ...UpgradeTable.defaultTableProperties, ...config };

        return levels.map((level) => {
            const row: Record<string, string> = { level: level.format() };

            for (const [key, prop] of Object.entries(UpgradeTable.tabulableProperties)) {
                if (finalConfig[key as TablePropertyKey]) {
                    row[prop.displayName] = prop.compute(this.upgrade, this.upgradeEffect, level).format();
                }
            }

            return row;
        });
    }
}

export { TableProperty, UpgradeTable };
export type { TablePropertyConfig, TablePropertyKey };
