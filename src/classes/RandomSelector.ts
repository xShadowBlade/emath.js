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
     * A list of all possible options that can be selected converted to unnormalized weights.
     */
    public readonly weightEntries: WeightOptionEntry<PossibleNames>[];

    /**
     * The total weight of all options, used to normalize chances.
     * This is calculated as the sum of all unnormalized weights when the class is instantiated.
     */
    private readonly totalWeight: Decimal;

    /**
     * Creates a new RandomSelector with the given options.
     * @param options - An array of {@link RandomOptionEntry} objects representing the possible options.
     */
    constructor(options: RandomOptionEntry<PossibleNames>[]) {
        this.weightEntries = options.map(entry => ({
            name: entry.name,
            weight: entry.chance.eq(Decimal.dZero) ? Decimal.dZero : Decimal.dOne.div(entry.chance)
        }));

        this.totalWeight = this.weightEntries.reduce((sum, entry) => sum.add(entry.weight), new Decimal(0));
    }

    /**
     * Converts the chances/weights of each entry into a relative chance from 0 to 1 given the luck multiplier.
     * The sum of all chances should equal 1.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns An array of {@link RandomOptionEntry} objects with normalized chances.
     */
    // private getEntriesWithWeightedChances(luck: DecimalSource = Decimal.dOne): RandomOptionEntry<PossibleNames>[] {
    //     luck = new Decimal(luck);

    //     return this.entries.map(entry => ({
    //         ...entry,
    //         chance: entry.chance.div(this.totalWeight)
    //     }));
    // }
}

// Test
const testEntries = [
    { name: "A", chance: new Decimal(2) },
    { name: "B", chance: new Decimal(5) },
    { name: "C", chance: new Decimal(10) },
    { name: "D", chance: new Decimal(20) }
] as const satisfies RandomOptionEntry[];

const randomSelector = new RandomSelector(testEntries);

console.log(RandomSelector.normalizeWeights(randomSelector.weightEntries));

export type { RandomOptionEntry };
