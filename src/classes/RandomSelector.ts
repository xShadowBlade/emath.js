/**
 * @file Declares the RandomSelector class
 */
import type { Pointer } from "../common/types";
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
import { LRUCache } from "../E/lru-cache";
import { sampleFromBinomialDistribution } from "./numericalAnalysis/sampling";
import type { DecimalJSONString } from "./Upgrade";
import { decimalToJSONString } from "./Upgrade";

/**
 * An entry when used to create a {@link RandomSelector}.
 * @template TName - The type of the name of the option, defaults to `string`.
 * @template _TSortedState - The sorting state of the array, defaults to {@link RandomArraySortedState.unsorted}. This is only for type safety and has no impact on functionality.
 */
interface RandomOptionEntry<
    TName extends string = string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
    _TSortedState extends RandomArraySortedState = RandomArraySortedState.unsorted,
> {
    /**
     * A unique identifier for the option that is returned by the selector.
     */
    name: TName;

    /**
     * Represents the chance of this option being selected, as a {@link Decimal}.
     * - Chances can be any positive {@link Decimal} value, within the interval of [0, Infinity).
     * - Chances are relative to each other, so the sum of all chances does not need to equal 1.
     * - A chance of 0 means the option will never be selected.
     *
     * This can be a getter and is called every time the selector is used.
     * See {@link RandomSelector} for more information on how chances are used and limitations.
     * @example
     * new Decimal(10) // This one would be 2 times more likely to be selected than the next one (with 1x luck).
     * new Decimal(20)
     */
    chance: Decimal;
}

/**
 * Possible sorting states for an array of {@link RandomOptionEntry} objects.
 */
enum RandomArraySortedState {
    /**
     * Unsorted, in any order.
     */
    unsorted,

    /**
     * Sorted from highest to lowest chance.
     * @example
     * // Unsorted
     * [
     *     { name: "A", chance: new Decimal(1) },
     *     { name: "B", chance: new Decimal(5) },
     *     { name: "C", chance: new Decimal(2) },
     * ]
     * // Sorted
     * [
     *     { name: "B", chance: new Decimal(5) },
     *     { name: "C", chance: new Decimal(2) },
     *     { name: "A", chance: new Decimal(1) },
     * ]
     */
    sortedHighestToLowestChance,

    /**
     * Sorted from lowest to highest weight.
     * @example
     * // Unsorted
     * [
     *     { name: "A", weight: new Decimal(1) },
     *     { name: "B", weight: new Decimal(0.2) },
     *     { name: "C", weight: new Decimal(0.5) },
     * ]
     * // Sorted
     * [
     *     { name: "B", weight: new Decimal(0.2) },
     *     { name: "C", weight: new Decimal(0.5) },
     *     { name: "A", weight: new Decimal(1) },
     * ]
     */
    sortedLowestToHighestWeight,
}

/**
 * An array of {@link RandomOptionEntry} objects, with an optional sorting state.
 * @template TName - The type of the name of the option, defaults to `string`.
 * @template TSortedState - The sorting state of the array, defaults to {@link RandomArraySortedState.unsorted}. This is only for type safety and has no impact on functionality.
 */
// type RandomOptionEntryArray<
//     TName extends string = string,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     TSortedState extends RandomArraySortedState = RandomArraySortedState.unsorted,
// > = RandomOptionEntry<TName>[];

/**
 * An array of {@link WeightOptionEntry} objects, with an optional sorting state.
 * @template TName - The type of the name of the option, defaults to `string`.
 * @template TSortedState - The sorting state of the array, defaults to {@link RandomArraySortedState.unsorted}. This is only for type safety and has no impact on functionality.
 */
// type WeightOptionEntryArray<
//     TName extends string = string,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     TSortedState extends RandomArraySortedState = RandomArraySortedState.unsorted,
// > = WeightOptionEntry<TName>[];

/**
 * The normalization state of an array of weights.
 */
enum WeightOptionNormalizationState {
    /**
     * The array of weights is normalized; the sum of all weights equals 1.
     */
    normalized,

    /**
     * The array of weights is not normalized; the sum of all weights can be any positive value.
     */
    unnormalized,
}

/**
 * Used internally to represent an array of {@link RandomOptionEntry} objects with weights.
 * @template TName - The type of the name of the option, defaults to `string`.
 * @template _TSortedState - The sorting state of the array, defaults to {@link RandomArraySortedState.unsorted}. This is only for type safety and has no impact on functionality.
 * @template _TNormalized - The normalization state of the weights, defaults to {@link WeightOptionNormalizationState.unnormalized}. This is only for type safety and has no impact on functionality.
 */
interface WeightOptionEntry<
    TName extends string = string,
    /* eslint-disable @typescript-eslint/naming-convention */
    _TSortedState extends RandomArraySortedState = RandomArraySortedState.unsorted,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _TNormalized extends WeightOptionNormalizationState = WeightOptionNormalizationState.unnormalized,
    /* eslint-enable @typescript-eslint/naming-convention */
> extends Pick<RandomOptionEntry<TName, _TSortedState>, "name"> {
    /**
     * A weight for the option, as a {@link Decimal}.
     * - Weights are numeric values within the range of [0, Infinity)
     * - Weights may or may not be "normalized" (i.e., the sum of all weights may not equal 1).
     */
    weight: Decimal;
}

interface SelectedOptionEntry<TName extends string = string> extends Pick<RandomOptionEntry<TName>, "name"> {
    /**
     * The number of times this option was selected.
     */
    numberOfSelections: Decimal;
}

/**
 * A method of selecting a random option from a list of entries given their chance and a luck multiplier.
 */
abstract class SelectionMethod {
    /**
     * Selects a random option from the given entries based on their weights and the provided luck.
     * @param entries - An array of objects representing the possible options. This array must be sorted from highest to lowest chance ({@link RandomArraySortedState.sortedHighestToLowestChance}).
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns A randomly selected option from the entries, or undefined if no options are available.
     */
    public abstract select<T extends string>(
        // entries: RandomOptionEntryArray<T, RandomArraySortedState.sortedHighestToLowestChance>,
        entries: RandomOptionEntry<T, RandomArraySortedState.sortedHighestToLowestChance>[],
        luck: Decimal,
    ): T | undefined;

    /**
     * Gets the normalized weights of the given entries based on the provided luck.
     * This has no impact on the functionality of the selector, but is useful for displaying a probability distribution.
     * @param entries - An array of objects representing the possible options. This array must be sorted from highest to lowest chance ({@link RandomArraySortedState.sortedHighestToLowestChance}).
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns An array of objects representing the normalized weights of the entries. Should be sorted from lowest to highest weight ({@link RandomArraySortedState.sortedLowestToHighestWeight}). If the selection method does not support normalized weights, it should return `undefined`.
     */
    public getNormalizedWeights<T extends string>(
        /* eslint-disable @typescript-eslint/no-unused-vars */
        // entries: RandomOptionEntryArray<T, RandomArraySortedState.sortedHighestToLowestChance>,
        entries: RandomOptionEntry<T, RandomArraySortedState.sortedHighestToLowestChance>[],
        luck: Decimal,
        /* eslint-enable @typescript-eslint/no-unused-vars */
    ):
        | WeightOptionEntry<
              T,
              RandomArraySortedState.sortedLowestToHighestWeight,
              WeightOptionNormalizationState.normalized
          >[]
        | undefined {
        return undefined;
    }
}

/**
 * A selection method that selects entries starting with the rarest one first and moving to the next one if that one is not selected.
 * - The chance of each entry is divided by the luck multiplier.
 * - Note: entries with the same chance have different probabilities of being selected based on their order in the array.
 */
class RarestFirstCascadeSelectionMethod extends SelectionMethod {
    public select<T extends string>(
        entries: RandomOptionEntry<T, RandomArraySortedState.sortedHighestToLowestChance>[],
        luck: Decimal,
    ): T | undefined {
        // Sort the entries by their chance in descending order
        // entries.sort((a, b) => -a.chance.compare(b.chance));

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];

            // If it is the last entry, return it
            if (i === entries.length - 1) {
                return entry.name;
            }

            // Divide the chance of the entry by the luck
            const newChance = entry.chance.div(luck);

            if (RandomSelector.getRandomBooleanWithChance(newChance)) {
                return entry.name;
            }
        }

        // Nothing picked (should never happen)
        return undefined;
    }

    public getNormalizedWeights<T extends string>(
        entries: RandomOptionEntry<T, RandomArraySortedState.sortedHighestToLowestChance>[],
        luck: Decimal,
    ): WeightOptionEntry<
        T,
        RandomArraySortedState.sortedLowestToHighestWeight,
        WeightOptionNormalizationState.normalized
    >[] {
        // Sort the entries by their chance in descending order
        // entries.sort((a, b) => -a.chance.compare(b.chance));

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
            cumulativePreviousChanceMultiplier = cumulativePreviousChanceMultiplier.mul(
                Decimal.dOne.sub(baseChanceInverted),
            );
            sumOfOutputWeights = sumOfOutputWeights.add(outputWeight);
        }

        return out;
    }
}

// TODO: Implement other selection methods
// abstract class WeightBasedSelectionMethod extends SelectionMethod {}

/**
 * A class that allows for random selection of options based on their relative chances.
 *
 * - A chance is a {@link Decimal} that represents the relative likelihood of an option being selected.
 *    - The higher the chance, the less likely the option is to be selected.
 * - A weight is the inverse of a chance (1 / chance).
 *    - The higher the weight, the more likely the option is to be selected.
 *    - Normalized weights (in an entry) add up to 1, while unnormalized weights do not have this requirement.
 *
 * This is essentially a wrapper around the various {@link SelectionMethod} classes.
 *  - Use a {@link SelectionMethod} class if the chances can change between initialization and selection.
 * @template TPossibleNames - The type of the names of the options, defaults to `string`.
 */
class RandomSelector<TPossibleNames extends string = string> {
    /**
     * Generates a random boolean based on a given chance.
     * - If the chance is less than or equal to 1, it will always return `true`.
     * This suffers from floating point precision issues when the chance is very unlikely.
     * @param chance - The chance of returning `true`. The higher the chance, the less likely it is to return `true`.
     * @returns - A random boolean value based on the given chance.
     * @example
     * RandomSelector.getRandomBooleanWithChance(new Decimal(1)); // Always returns true
     * RandomSelector.getRandomBooleanWithChance(new Decimal(2)); // 1 in 2 chance (50%) of returning true
     * RandomSelector.getRandomBooleanWithChance(new Decimal(5)); // 1 in 5 chance (20%)
     * RandomSelector.getRandomBooleanWithChance(new Decimal(3.5)); // 1 in 3.5 chance (~28.57%)
     */
    public static getRandomBooleanWithChance(chance: DecimalSource): boolean {
        chance = new Decimal(chance);

        if (chance.lte(1)) {
            return true;
        }

        return new Decimal(Math.random()).lt(chance.reciprocal());
    }

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
    public static normalizeWeights<T extends string = string>(
        entries: WeightOptionEntry<T, RandomArraySortedState.unsorted, WeightOptionNormalizationState.unnormalized>[],
        totalWeight?: Decimal,
    ): WeightOptionEntry<T, RandomArraySortedState.unsorted, WeightOptionNormalizationState.normalized>[] {
        totalWeight = totalWeight ?? entries.reduce((sum, entry) => sum.add(entry.weight), new Decimal(0));

        return entries.map((entry) => ({
            ...entry,
            weight: entry.weight.div(totalWeight),
        }));
    }

    /**
     * Selects an option from the given normalized weights.
     * Suffers from floating point precision issues when the weights are very small.
     * @param entries - An array of normalized {@link WeightOptionEntry} objects. Can be unsorted.
     * @param randomValue - A random value between 0 and 1 used to select an option. Defaults to `Math.random()`.
     * @returns The selected option name, or `null` if no option was selected.
     */
    public static selectFromNormalizedWeights<T extends string = string>(
        entries: WeightOptionEntry<
            T,
            RandomArraySortedState.sortedLowestToHighestWeight,
            WeightOptionNormalizationState.normalized
        >[],
        randomValue: DecimalSource = Math.random(),
    ): T | undefined {
        // Sort from lowest to highest weight
        entries.sort((a, b) => a.weight.compare(b.weight));

        // debug
        // console.log("Sorted entries:", entries);

        randomValue = new Decimal(randomValue);
        let cumulativeWeight = new Decimal(0);

        // For each entry, add its weight to the cumulative weight and check if the random value is less than or equal to it
        for (const entry of entries) {
            cumulativeWeight = cumulativeWeight.add(entry.weight);

            if (randomValue.lte(cumulativeWeight)) {
                return entry.name;
            }
        }

        // If no entry was selected, return undefined
        // Normally this should not happen if the weights are normalized correctly
        return undefined;
    }

    /**
     * Samples from a multinomial distribution based on the normalized weights of the entries.
     * Approximated using a binomial distribution for each entry. See {@link sampleFromBinomialDistribution} for more information.
     * @param entries - An array of normalized {@link WeightOptionEntry} objects. Must be sorted from highest to lowest weight.
     * @param numberOfSelections - The number of selections to make from the entries. This can be as large as you want. Defaults to 1.
     * @param onlyReturnNonZeroSelections - If true, only entries with a non-zero number of selections will be returned. Defaults to false.
     * @returns An array of {@link SelectedOptionEntry} objects representing the selected options and their counts. If {@link onlyReturnNonZeroSelections} is true, only entries with a non-zero number of selections will be included. Otherwise, it is returned in the same order as the input entries.
     * @example
     * const entries = [
     *     { name: "A", weight: new Decimal(0.5) },
     *     { name: "B", weight: new Decimal(0.3) },
     *     { name: "C", weight: new Decimal(0.2) },
     * ];
     *
     * const numberOfSelections = new Decimal(1000);
     *
     * // `selected` will contain an array of SelectedOptionEntry objects with the counts of each selected option.
     * // For example, it might return something like:
     * // [
     * //     { name: "A", numberOfSelections: new Decimal(493) },
     * //     { name: "B", numberOfSelections: new Decimal(302) },
     * //     { name: "C", numberOfSelections: new Decimal(205) },
     * // ]
     * const selected = RandomSelector.selectMultipleFromNormalizedWeights(entries, numberOfSelections);
     */
    public static selectMultipleFromNormalizedWeights<T extends string = string>(
        entries: WeightOptionEntry<
            T,
            RandomArraySortedState.sortedLowestToHighestWeight,
            WeightOptionNormalizationState.normalized
        >[],
        numberOfSelections: DecimalSource = Decimal.dOne,
        onlyReturnNonZeroSelections = false,
    ): SelectedOptionEntry<T>[] {
        const k = entries.length;

        const out: SelectedOptionEntry<T>[] = onlyReturnNonZeroSelections
            ? []
            : entries.map((entry) => ({
                  name: entry.name,
                  numberOfSelections: Decimal.dZero,
              }));

        let remainingTrials = new Decimal(numberOfSelections);
        let remainingProbMass = new Decimal(1);

        // For each entry, do a binomial sampling based on the remaining trials and the adjusted probability mass
        for (let i = 0; i < k - 1; i++) {
            // If there are no remaining trials or probability mass, stop sampling
            if (remainingTrials.lte(0) || remainingProbMass.lte(0)) break;

            // Calculate the adjusted probability for the current entry
            // and sample from the binomial distribution
            const adjustedP = entries[i].weight.div(remainingProbMass);
            const x = sampleFromBinomialDistribution(remainingTrials, adjustedP) ?? Decimal.dZero;

            // If onlyReturnNonZeroSelections is true, only add the entry if it has a non-zero number of selections
            if (!onlyReturnNonZeroSelections) {
                out[i].numberOfSelections = x;
            } else if (x.gt(0)) {
                out.push({
                    name: entries[i].name,
                    numberOfSelections: x,
                });
            }

            // Update the remaining trials and probability mass
            remainingTrials = remainingTrials.sub(x);
            remainingProbMass = remainingProbMass.sub(entries[i].weight);
        }

        // Assign remaining trials to the last bucket
        if (!onlyReturnNonZeroSelections) {
            out[k - 1].numberOfSelections = remainingTrials.max(Decimal.dZero);
        } else if (remainingTrials.gt(0)) {
            out.push({
                name: entries[k - 1].name,
                numberOfSelections: remainingTrials.max(Decimal.dZero),
            });
        }

        return out;
    }

    /**
     * The default selection method used by the {@link RandomSelector} class.
     * Currently set to {@link RarestFirstCascadeSelectionMethod}.
     */
    public static defaultSelectionMethod: SelectionMethod = new RarestFirstCascadeSelectionMethod();

    /**
     * A function that returns the entries of the selector.
     */
    private getEntries: () => RandomOptionEntry<TPossibleNames, RandomArraySortedState.unsorted>[];

    /**
     * @returns An array of {@link RandomOptionEntry} objects representing the possible options, sorted from highest to lowest chance.
     */
    public get entries(): RandomOptionEntry<TPossibleNames, RandomArraySortedState.sortedHighestToLowestChance>[] {
        const entries = this.getEntries();
        entries.sort((a, b) => -a.chance.compare(b.chance));

        return entries;
    }

    /**
     * The method used to select a random option from the list of entries.
     */
    private readonly selectionMethod: SelectionMethod;

    /**
     * A cache used to store normalized weights for different luck values.
     */
    private readonly weightCache:
        | LRUCache<
              DecimalJSONString,
              WeightOptionEntry<
                  TPossibleNames,
                  RandomArraySortedState.sortedLowestToHighestWeight,
                  WeightOptionNormalizationState.normalized
              >[]
          >
        | undefined;

    /**
     * Creates a new RandomSelector with the given options.
     * @param options - An array of {@link RandomOptionEntry} objects or a function that returns that array representing the possible options. Can be in any order.
     * @param selectionMethod - The method used to select a random option from the list of entries. Defaults to {@link defaultSelectionMethod}.
     * @param cacheMaxSize - The maximum size of the cache used to store normalized weights. Set to `0` to disable caching. Defaults to `3`.
     */
    constructor(
        options: Pointer<RandomOptionEntry<TPossibleNames, RandomArraySortedState.sortedHighestToLowestChance>[]>,
        selectionMethod: SelectionMethod = RandomSelector.defaultSelectionMethod,
        cacheMaxSize = 3,
    ) {
        this.selectionMethod = selectionMethod;
        this.getEntries = typeof options === "function" ? options : (): typeof options => options;

        if (cacheMaxSize > 0) {
            this.weightCache = new LRUCache<
                DecimalJSONString,
                WeightOptionEntry<TPossibleNames, RandomArraySortedState.sortedLowestToHighestWeight>[]
            >(cacheMaxSize);
        } else {
            this.weightCache = undefined;
        }
    }

    /**
     * Selects a random option from the list of entries based on their chances and the provided luck.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns A randomly selected option from the entries, or undefined if no options are available.
     */
    public select(luck: DecimalSource = Decimal.dOne): TPossibleNames | undefined {
        luck = new Decimal(luck);

        return this.selectionMethod.select(this.entries, luck);
    }

    /**
     * Gets the normalized weights of the entries based on the provided luck.
     * If a cached value exists for the given luck, it will be returned instead of recalculating.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns An array of objects representing the normalized weights of the entries.
     */
    public getNormalizedWeights(
        luck: DecimalSource = Decimal.dOne,
    ):
        | WeightOptionEntry<
              TPossibleNames,
              RandomArraySortedState.sortedLowestToHighestWeight,
              WeightOptionNormalizationState.normalized
          >[]
        | undefined {
        luck = new Decimal(luck);

        // If there is no cache, just calculate and return the weights
        if (!this.weightCache) {
            return this.selectionMethod.getNormalizedWeights(this.entries, luck);
        }

        // Check the cache first
        const cachedWeights = this.getWeightsFromCache(luck);
        if (cachedWeights) return cachedWeights;

        // Update the cache and return the newly calculated weights
        return this.updateCache(luck);
    }

    /**
     * Selects multiple entries based on the normalized weights of the entries.
     * See {@link selectMultipleFromNormalizedWeights} for more information.
     * @param numberOfSelections - The number of selections to make from the entries. This can be as large as you want. Defaults to 1.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @param onlyReturnNonZeroSelections - If true, only entries with a non-zero number of selections will be returned. Defaults to false.
     * @returns An array of {@link SelectedOptionEntry} objects representing the selected options and their counts.
     */
    public selectMultiple(
        numberOfSelections?: DecimalSource,
        luck?: DecimalSource,
        onlyReturnNonZeroSelections?: boolean,
    ): SelectedOptionEntry<TPossibleNames>[] {
        const normalizedWeights = this.getNormalizedWeights(luck);

        if (!normalizedWeights) {
            return [];
        }

        // Select multiple entries based on the normalized weights
        return RandomSelector.selectMultipleFromNormalizedWeights(
            normalizedWeights,
            numberOfSelections,
            onlyReturnNonZeroSelections,
        );
    }

    /**
     * Gets the cached normalized weights for the given luck, if they exist.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns The cached normalized weights for the given luck, or undefined if no cache exists or no cached value is found.
     */
    public getWeightsFromCache(
        luck: DecimalSource = Decimal.dOne,
    ):
        | WeightOptionEntry<
              TPossibleNames,
              RandomArraySortedState.sortedLowestToHighestWeight,
              WeightOptionNormalizationState.normalized
          >[]
        | undefined {
        if (!this.weightCache) return undefined;

        const luckKey = decimalToJSONString(new Decimal(luck));
        return this.weightCache.get(luckKey);
    }

    /**
     * Updates the cache of normalized weights for the given luck, and returns the newly set value.
     * Note: this does not overwrite existing cache entries or return them. To update an existing entry, you must first clear the entire cache using {@link clearCache}.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns The newly calculated normalized weights for the given luck, or undefined if no cache exists or if the entry already exists in the cache.
     */
    public updateCache(luck: DecimalSource = Decimal.dOne): ReturnType<typeof this.getNormalizedWeights> {
        if (!this.weightCache) return undefined;

        luck = new Decimal(luck);

        const luckKey = decimalToJSONString(luck);

        // If the key already exists, do nothing
        // TODO: Add way to change existing cache entries without first clearing the entire cache
        if (this.weightCache.has(luckKey)) {
            return undefined;
        }

        const normalizedWeights = this.selectionMethod.getNormalizedWeights(this.entries, luck);

        if (normalizedWeights) {
            this.weightCache.set(luckKey, normalizedWeights);
        }

        return normalizedWeights;
    }

    /**
     * Clears the weight cache.
     */
    public clearCache(): void {
        if (this.weightCache) {
            this.weightCache.clear();
        }
    }
}

// Test
const testEntries = [
    { name: "Common", chance: new Decimal(2) },
    { name: "Rare", chance: new Decimal(5) },
    { name: "Epic", chance: new Decimal(10) },
    { name: "Legendary", chance: new Decimal(2000) },
    { name: "Mythic", chance: new Decimal(1e6) },
] as const satisfies RandomOptionEntry[];

const randomSelector = new RandomSelector(testEntries, new RarestFirstCascadeSelectionMethod());

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

// Test multinomial

// const numberOfSelections = new Decimal(10).pow(2);
// const luck = new Decimal(2);
// const selected = randomSelector.selectMultiple(numberOfSelections, luck);

// const correspondingNormalizedWeights = randomSelector.getNormalizedWeights(luck) ?? [];

// // Log results
// console.table(
//     selected.map((entry, i) => ({
//         name: entry.name,
//         expectedRatio: correspondingNormalizedWeights[i]?.weight.toNumber() ?? 0,
//         observedRatio: entry.numberOfSelections.div(numberOfSelections).toNumber(),
//         expected: correspondingNormalizedWeights[i]?.weight.mul(numberOfSelections).toNumber() ?? 0,
//         observed: entry.numberOfSelections.toNumber(),
//         ratioBetweenExpectedAndObserved:
//             correspondingNormalizedWeights[i]?.weight
//                 .div(entry.numberOfSelections.div(numberOfSelections))
//                 .toNumber() ?? 0,
//     })),
// );

// Test performance
// const manyEntries: RandomOptionEntry<string>[] = Array.from({ length: 100000 }, (_, i) => ({
//     name: `Entry ${i + 1}`,
//     chance: new Decimal(1.1).pow(i + 1),
// }));
// const manyEntriesSelector = new RandomSelector(manyEntries, new RarestFirstCascadeSelectionMethod());

// console.time("Multinomial");
// // for (let i = 0; i < 1; i++) {
// //     manyEntriesSelector.selectMultiple(numberOfSelections, luck, true);
// // }
// const manyEntriesSelected = manyEntriesSelector.selectMultiple(numberOfSelections, luck, true);
// console.timeEnd("Multinomial");

// console.log(manyEntriesSelected);

export type { RandomOptionEntry, WeightOptionEntry, SelectedOptionEntry, RandomArraySortedState };
export { SelectionMethod, RandomSelector, RarestFirstCascadeSelectionMethod };
