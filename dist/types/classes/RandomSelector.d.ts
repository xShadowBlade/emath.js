/**
 * @file Declares the RandomSelector class
 */
import type { Pointer } from "../common/types";
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
/**
 * An entry when used to create a {@link RandomSelector}.
 * @template TName - The type of the name of the option, defaults to `string`.
 * @template _TSortedState - The sorting state of the array, defaults to {@link RandomArraySortedState.unsorted}. This is only for type safety and has no impact on functionality.
 */
interface RandomOptionEntry<TName extends string = string, _TSortedState extends RandomArraySortedState = RandomArraySortedState.unsorted> {
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
declare enum RandomArraySortedState {
    /**
     * Unsorted, in any order.
     */
    unsorted = 0,
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
    sortedHighestToLowestChance = 1,
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
    sortedLowestToHighestWeight = 2
}
/**
 * An array of {@link RandomOptionEntry} objects, with an optional sorting state.
 * @template TName - The type of the name of the option, defaults to `string`.
 * @template TSortedState - The sorting state of the array, defaults to {@link RandomArraySortedState.unsorted}. This is only for type safety and has no impact on functionality.
 */
/**
 * An array of {@link WeightOptionEntry} objects, with an optional sorting state.
 * @template TName - The type of the name of the option, defaults to `string`.
 * @template TSortedState - The sorting state of the array, defaults to {@link RandomArraySortedState.unsorted}. This is only for type safety and has no impact on functionality.
 */
/**
 * The normalization state of an array of weights.
 */
declare enum WeightOptionNormalizationState {
    /**
     * The array of weights is normalized; the sum of all weights equals 1.
     */
    normalized = 0,
    /**
     * The array of weights is not normalized; the sum of all weights can be any positive value.
     */
    unnormalized = 1
}
/**
 * Used internally to represent an array of {@link RandomOptionEntry} objects with weights.
 * @template TName - The type of the name of the option, defaults to `string`.
 * @template _TSortedState - The sorting state of the array, defaults to {@link RandomArraySortedState.unsorted}. This is only for type safety and has no impact on functionality.
 * @template _TNormalized - The normalization state of the weights, defaults to {@link WeightOptionNormalizationState.unnormalized}. This is only for type safety and has no impact on functionality.
 */
interface WeightOptionEntry<TName extends string = string, _TSortedState extends RandomArraySortedState = RandomArraySortedState.unsorted, _TNormalized extends WeightOptionNormalizationState = WeightOptionNormalizationState.unnormalized> extends Pick<RandomOptionEntry<TName, _TSortedState>, "name"> {
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
declare abstract class SelectionMethod {
    /**
     * Selects a random option from the given entries based on their weights and the provided luck.
     * @param entries - An array of objects representing the possible options. This array must be sorted from highest to lowest chance ({@link RandomArraySortedState.sortedHighestToLowestChance}).
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns A randomly selected option from the entries, or undefined if no options are available.
     */
    abstract select<T extends string>(entries: RandomOptionEntry<T, RandomArraySortedState.sortedHighestToLowestChance>[], luck: Decimal): T | undefined;
    /**
     * Gets the normalized weights of the given entries based on the provided luck.
     * This has no impact on the functionality of the selector, but is useful for displaying a probability distribution.
     * @param entries - An array of objects representing the possible options. This array must be sorted from highest to lowest chance ({@link RandomArraySortedState.sortedHighestToLowestChance}).
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns An array of objects representing the normalized weights of the entries. Should be sorted from lowest to highest weight ({@link RandomArraySortedState.sortedLowestToHighestWeight}). If the selection method does not support normalized weights, it should return `undefined`.
     */
    getNormalizedWeights<T extends string>(entries: RandomOptionEntry<T, RandomArraySortedState.sortedHighestToLowestChance>[], luck: Decimal): WeightOptionEntry<T, RandomArraySortedState.sortedLowestToHighestWeight, WeightOptionNormalizationState.normalized>[] | undefined;
}
/**
 * A selection method that selects entries starting with the rarest one first and moving to the next one if that one is not selected.
 * - The chance of each entry is divided by the luck multiplier.
 * - Note: entries with the same chance have different probabilities of being selected based on their order in the array.
 */
declare class RarestFirstCascadeSelectionMethod extends SelectionMethod {
    select<T extends string>(entries: RandomOptionEntry<T, RandomArraySortedState.sortedHighestToLowestChance>[], luck: Decimal): T | undefined;
    getNormalizedWeights<T extends string>(entries: RandomOptionEntry<T, RandomArraySortedState.sortedHighestToLowestChance>[], luck: Decimal): WeightOptionEntry<T, RandomArraySortedState.sortedLowestToHighestWeight, WeightOptionNormalizationState.normalized>[];
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
 * This is essentially a wrapper around the various {@link SelectionMethod} classes.
 *  - Use a {@link SelectionMethod} class if the chances can change between initialization and selection.
 * @template TPossibleNames - The type of the names of the options, defaults to `string`.
 */
declare class RandomSelector<TPossibleNames extends string = string> {
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
    static getRandomBooleanWithChance(chance: DecimalSource): boolean;
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
    static normalizeWeights<T extends string = string>(entries: WeightOptionEntry<T, RandomArraySortedState.unsorted, WeightOptionNormalizationState.unnormalized>[], totalWeight?: Decimal): WeightOptionEntry<T, RandomArraySortedState.unsorted, WeightOptionNormalizationState.normalized>[];
    /**
     * Selects an option from the given normalized weights.
     * Suffers from floating point precision issues when the weights are very small.
     * @param entries - An array of normalized {@link WeightOptionEntry} objects. Can be unsorted.
     * @param randomValue - A random value between 0 and 1 used to select an option. Defaults to `Math.random()`.
     * @returns The selected option name, or `null` if no option was selected.
     */
    static selectFromNormalizedWeights<T extends string = string>(entries: WeightOptionEntry<T, RandomArraySortedState.sortedLowestToHighestWeight, WeightOptionNormalizationState.normalized>[], randomValue?: DecimalSource): T | undefined;
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
    static selectMultipleFromNormalizedWeights<T extends string = string>(entries: WeightOptionEntry<T, RandomArraySortedState.sortedLowestToHighestWeight, WeightOptionNormalizationState.normalized>[], numberOfSelections?: DecimalSource, onlyReturnNonZeroSelections?: boolean): SelectedOptionEntry<T>[];
    /**
     * The default selection method used by the {@link RandomSelector} class.
     * Currently set to {@link RarestFirstCascadeSelectionMethod}.
     */
    static defaultSelectionMethod: SelectionMethod;
    /**
     * A function that returns the entries of the selector.
     */
    private getEntries;
    /**
     * @returns An array of {@link RandomOptionEntry} objects representing the possible options, sorted from highest to lowest chance.
     */
    get entries(): RandomOptionEntry<TPossibleNames, RandomArraySortedState.sortedHighestToLowestChance>[];
    /**
     * The method used to select a random option from the list of entries.
     */
    private readonly selectionMethod;
    /**
     * A cache used to store normalized weights for different luck values.
     */
    private readonly weightCache;
    /**
     * Creates a new RandomSelector with the given options.
     * @param options - An array of {@link RandomOptionEntry} objects or a function that returns that array representing the possible options. Can be in any order.
     * @param selectionMethod - The method used to select a random option from the list of entries. Defaults to {@link defaultSelectionMethod}.
     * @param cacheMaxSize - The maximum size of the cache used to store normalized weights. Set to `0` to disable caching. Defaults to `3`.
     */
    constructor(options: Pointer<RandomOptionEntry<TPossibleNames, RandomArraySortedState.sortedHighestToLowestChance>[]>, selectionMethod?: SelectionMethod, cacheMaxSize?: number);
    /**
     * Selects a random option from the list of entries based on their chances and the provided luck.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns A randomly selected option from the entries, or undefined if no options are available.
     */
    select(luck?: DecimalSource): TPossibleNames | undefined;
    /**
     * Gets the normalized weights of the entries based on the provided luck.
     * If a cached value exists for the given luck, it will be returned instead of recalculating.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns An array of objects representing the normalized weights of the entries.
     */
    getNormalizedWeights(luck?: DecimalSource): WeightOptionEntry<TPossibleNames, RandomArraySortedState.sortedLowestToHighestWeight, WeightOptionNormalizationState.normalized>[] | undefined;
    /**
     * Selects multiple entries based on the normalized weights of the entries.
     * See {@link selectMultipleFromNormalizedWeights} for more information.
     * @param numberOfSelections - The number of selections to make from the entries. This can be as large as you want. Defaults to 1.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @param onlyReturnNonZeroSelections - If true, only entries with a non-zero number of selections will be returned. Defaults to false.
     * @returns An array of {@link SelectedOptionEntry} objects representing the selected options and their counts.
     */
    selectMultiple(numberOfSelections?: DecimalSource, luck?: DecimalSource, onlyReturnNonZeroSelections?: boolean): SelectedOptionEntry<TPossibleNames>[];
    /**
     * Gets the cached normalized weights for the given luck, if they exist.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns The cached normalized weights for the given luck, or undefined if no cache exists or no cached value is found.
     */
    getWeightsFromCache(luck?: DecimalSource): WeightOptionEntry<TPossibleNames, RandomArraySortedState.sortedLowestToHighestWeight, WeightOptionNormalizationState.normalized>[] | undefined;
    /**
     * Updates the cache of normalized weights for the given luck, and returns the newly set value.
     * Note: this does not overwrite existing cache entries or return them. To update an existing entry, you must first clear the entire cache using {@link clearCache}.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns The newly calculated normalized weights for the given luck, or undefined if no cache exists or if the entry already exists in the cache.
     */
    updateCache(luck?: DecimalSource): ReturnType<typeof this.getNormalizedWeights>;
    /**
     * Clears the weight cache.
     */
    clearCache(): void;
}
export type { RandomOptionEntry, WeightOptionEntry, SelectedOptionEntry, RandomArraySortedState };
export { SelectionMethod, RandomSelector, RarestFirstCascadeSelectionMethod };
