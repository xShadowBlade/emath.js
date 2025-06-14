/**
 * @file Declares the RandomSelector class
 */
import { Decimal, DecimalSource } from "../E/e";

/**
 * An entry when used to create a {@link RandomSelector}.
 * @template Name - The type of the name of the option, defaults to `string`.
 */
interface RandomOptionEntry<Name extends string = string> {
    /**
     * A unique identifier for the option that is returned by the selector.
     */
    name: Name;

    /**
     * Represents the chance of this option being selected, as a {@link Decimal}.
     * - Chances can be any positive {@link Decimal} value, within the interval of [0, Infinity).
     * - Chances are relative to each other, so the sum of all chances does not need to equal 1.
     * - A chance of 0 means the option will never be selected.
     * 
     * See {@link RandomSelector} for more information on how chances are used and limitations.
     * @example
     * new Decimal(10)
     * new Decimal(20) // This one would be 2 times more likely to be selected than the previous one (with 1x luck).
     */
    chance: Decimal;
}

/**
 * Used internally to represent an array of {@link RandomOptionEntry} objects with weights.
 */
interface WeightOptionEntry<Name extends string = string> extends Pick<RandomOptionEntry<Name>, "name"> {
    /**
     * A weight for the option, as a {@link Decimal}.
     * - Weights are numeric values within the range of [0, Infinity)
     * - Weights may or may not be "normalized" (i.e., the sum of all weights may not equal 1).
     */
    weight: Decimal;
}

/**
 * A method of selecting a random option from a list of entries given their chance and a luck multiplier.
 */
abstract class SelectionMethod {
    /**
     * Selects a random option from the given entries based on their weights and the provided luck.
     * @param entries - An array of objects representing the possible options.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns A randomly selected option from the entries, or undefined if no options are available.
     */
    public abstract select<T extends string>(entries: RandomOptionEntry<T>[], luck: Decimal): T | undefined;

    /**
     * Gets the normalized weights of the given entries based on the provided luck.
     * This has no impact on the functionality of the selector, but is useful for displaying a probability distribution.
     * @param entries - An array of objects representing the possible options.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns An array of objects representing the normalized weights of the entries.
     */
    public getNormalizedWeights<T extends string>(entries: RandomOptionEntry<T>[], luck: Decimal): WeightOptionEntry<T>[] | undefined {
        return undefined;
    }
}

/**
 * A selection method that selects entries starting with the rarest one first and moving to the next one if that one is not selected.
 */
class RarestFirstCascadeSelectionMethod extends SelectionMethod {
    public select<T extends string>(entries: RandomOptionEntry<T>[], luck: Decimal): T | undefined {
        // Sort the entries by their chance in descending order
        entries.sort((a, b) => -a.chance.compare(b.chance));

        // for (const entry of entries) {
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];

            // If it is the last entry, return it
            if (i === entries.length - 1) {
                return entry.name;
            }

            // Divide the chance of the entry by the luck
            const newChance = entry.chance.div(luck);

            // TODO: replace this with select from chance
            if (new Decimal(Math.random()).lt(newChance.reciprocal())) {
                return entry.name;
            }
        }

        // Nothing picked (should never happen)
        return undefined;
    }

    public getNormalizedWeights<T extends string>(entries: RandomOptionEntry<T>[], luck: Decimal): WeightOptionEntry<T>[] {
        // Sort the entries by their chance in descending order
        entries.sort((a, b) => -a.chance.compare(b.chance));

        const out: WeightOptionEntry<T>[] = [];

        /**
         * The probability that all previous chances do not get selected.
         * 
         * For example, if the chances were [2, 4, 8], the cumulative previous chance multiplier would be:
         * - Index 0: 1 (no previous chances)
         * - Index 1: 1 * (1 - (1 / 2)) = 0.5
         * - Index 2: 0.5 * (1 - (1 / 4)) = 0.375
         * - Index 3: 0.375 * (1 - (1 / 8)) = 0.328125
         */
        let cumulativePreviousChanceMultiplier = new Decimal(1);

        let sumOfOutputWeights = new Decimal(0);

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];

            // If the luck is greater than the chance or if it is the last entry, return 1 - sumOfOutputWeights and the rest of the entries with 0 chance
            if (luck.gte(entry.chance) || i === entries.length - 1) {
                out.push({
                    name: entry.name,
                    weight: Decimal.dOne.sub(sumOfOutputWeights),
                });

                for (let j = i + 1; j < entries.length; j++) {
                    out.push({
                        name: entries[j].name,
                        weight: Decimal.dZero,
                    });
                }

                break;
            }

            const baseChanceInverted = luck.div(entry.chance);
            const outputWeight = baseChanceInverted.mul(cumulativePreviousChanceMultiplier);

            out.push({
                name: entry.name,
                weight: outputWeight,
            });

            // Update the cumulative previous chance multiplier and sum of output weights
            cumulativePreviousChanceMultiplier = cumulativePreviousChanceMultiplier.mul(Decimal.dOne.sub(baseChanceInverted));
            sumOfOutputWeights = sumOfOutputWeights.add(outputWeight);
        }

        return out;
    }
}

abstract class WeightBasedSelectionMethod extends SelectionMethod {}

/**
 * A class that allows for random selection of options based on their relative chances.
 *
 * - A chance is a {@link Decimal} that represents the relative likelihood of an option being selected.
 *    - The higher the chance, the less likely the option is to be selected.
 * - A weight is the inverse of a chance (1 / chance).
 *    - The higher the weight, the more likely the option is to be selected.
 *    - Normalized weights (in an entry) add up to 1, while unnormalized weights do not have this requirement.
 *
 * @template PossibleNames - The type of the names of the options, defaults to `string`.
 */
class RandomSelector<PossibleNames extends string = string> {
    /**
     * Converts the chances of each entry into a relative chance from 0 to 1 given the total weight.
     * @param entries - An array of {@link RandomOptionEntry} objects representing the possible options.
     * @param totalWeight - The total weight of all options, used to normalize chances. If not provided, it will be calculated as the sum of all chances.
     * @returns An array of {@link RandomOptionEntry} objects with normalized chances.
     * @example
     * const entries = [
     *   { name: "A", weight: new Decimal(1/2) },
     *   { name: "B", weight: new Decimal(1/5) },
     *   { name: "C", weight: new Decimal(1/10) },
     *   { name: "D", weight: new Decimal(1/20) },
     * ];
     * 
     * // Will return chances normalized to the total weight (1/2 + 1/5 + 1/10 + 1/20).
     * // Resulting chances will be approximately: [0.58824, 0.23529, 0.11765, 0.058824]
     * const normalizedEntries = RandomSelector.normalizeWeights(entries);
     */
    public static normalizeWeights<T extends string = string>(entries: WeightOptionEntry<T>[], totalWeight?: Decimal): WeightOptionEntry<T>[] {
        totalWeight = totalWeight ?? entries.reduce((sum, entry) => sum.add(entry.weight), new Decimal(0));

        return entries.map(entry => ({
            ...entry,
            weight: entry.weight.div(totalWeight)
        }));
    }

    /**
     * An array of {@link RandomOptionEntry} objects representing the possible options.
     */
    public readonly entries: RandomOptionEntry<PossibleNames>[] = [];

    /**
     * The method used to select a random option from the list of entries.
     */
    private readonly selectionMethod: SelectionMethod;

    /**
     * Creates a new RandomSelector with the given options.
     * @param options - An array of {@link RandomOptionEntry} objects representing the possible options.
     * @param selectionMethod - The method used to select a random option from the list of entries. Defaults to {@link RarestFirstCascadeSelectionMethod}.
     */
    constructor(options: RandomOptionEntry<PossibleNames>[], selectionMethod: SelectionMethod = new RarestFirstCascadeSelectionMethod()) {
        this.selectionMethod = selectionMethod;
        this.entries = options;
    }

    /**
     * Selects a random option from the list of entries based on their chances and the provided luck.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns A randomly selected option from the entries, or undefined if no options are available.
     */
    public select(luck: DecimalSource = Decimal.dOne): PossibleNames | undefined {
        luck = new Decimal(luck);

        return this.selectionMethod.select(this.entries, luck);
    }

    /**
     * Gets the normalized weights of the entries based on the provided luck.
     * This has no impact on the functionality of the selector, but is useful for displaying a probability distribution.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns An array of objects representing the normalized weights of the entries.
     */
    public getNormalizedWeights(luck: DecimalSource = Decimal.dOne): WeightOptionEntry<PossibleNames>[] | undefined {
        luck = new Decimal(luck);

        return this.selectionMethod.getNormalizedWeights(this.entries, luck);
    }
}

// Test
// const testEntries = [
//     { name: "Common", chance: new Decimal(2) },
//     { name: "Rare", chance: new Decimal(5) },
//     { name: "Epic", chance: new Decimal(10) },
//     { name: "Legendary", chance: new Decimal(2000) },
//     { name: "Mythic", chance: new Decimal(1e6) },
// ] as const satisfies RandomOptionEntry[];

// const randomSelector = new RandomSelector(testEntries, new RarestFirstCascadeSelectionMethod());

// const luckToTest = new Decimal(2);

// // Test the selector
// console.time("Selector");
// const selected = new Map<string, number>();
// const numberOfIterations = 1_000_000;

// for (let i = 0; i < numberOfIterations; i++) {
//     const selectedEntry = randomSelector.select(luckToTest);
//     if (selectedEntry) {
//         selected.set(selectedEntry, (selected.get(selectedEntry) ?? 0) + 1);
//     }
// }
// console.timeEnd("Selector");
// console.log("Selected entries:", selected);

// console.table((randomSelector.getNormalizedWeights(luckToTest) ?? []).map(entry => ({
//     name: entry.name,
//     expectedRatio: entry.weight.toNumber(),
//     observedRatio: (selected.get(entry.name) ?? 0) / numberOfIterations,
//     expected: entry.weight.mul(numberOfIterations).toNumber(),
//     observed: selected.get(entry.name) ?? 0,
//     ratioBetweenExpectedAndObserved: entry.weight.div((selected.get(entry.name) ?? 0) / numberOfIterations).toNumber(),
// })));

export type { RandomOptionEntry, WeightOptionEntry };
export { SelectionMethod, RandomSelector, RarestFirstCascadeSelectionMethod };
