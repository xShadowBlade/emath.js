/**
 * @file Declares the RandomSelector class
 */
import type { Pointer } from "../common/types";
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
/**
 * An entry when used to create a {@link RandomSelector}.
 * @template TName - The type of the name of the option, defaults to `string`.
 */
interface RandomOptionEntry<TName extends string = string> {
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
 * Used internally to represent an array of {@link RandomOptionEntry} objects with weights.
 */
interface WeightOptionEntry<TName extends string = string> extends Pick<RandomOptionEntry<TName>, "name"> {
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
     * @param entries - An array of objects representing the possible options.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns A randomly selected option from the entries, or undefined if no options are available.
     */
    abstract select<T extends string>(entries: RandomOptionEntry<T>[], luck: Decimal): T | undefined;
    /**
     * Gets the normalized weights of the given entries based on the provided luck.
     * This has no impact on the functionality of the selector, but is useful for displaying a probability distribution.
     * @param entries - An array of objects representing the possible options.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns An array of objects representing the normalized weights of the entries.
     */
    getNormalizedWeights<T extends string>(entries: RandomOptionEntry<T>[], luck: Decimal): WeightOptionEntry<T>[] | undefined;
}
/**
 * A selection method that selects entries starting with the rarest one first and moving to the next one if that one is not selected.
 */
declare class RarestFirstCascadeSelectionMethod extends SelectionMethod {
    select<T extends string>(entries: RandomOptionEntry<T>[], luck: Decimal): T | undefined;
    getNormalizedWeights<T extends string>(entries: RandomOptionEntry<T>[], luck: Decimal): WeightOptionEntry<T>[];
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
    static normalizeWeights<T extends string = string>(entries: WeightOptionEntry<T>[], totalWeight?: Decimal): WeightOptionEntry<T>[];
    /**
     * Selects an option from the given normalized weights.
     * Suffers from floating point precision issues when the weights are very small.
     * @param entries - An array of normalized {@link WeightOptionEntry} objects. Can be unsorted.
     * @param randomValue - A random value between 0 and 1 used to select an option. Defaults to `Math.random()`.
     * @returns The selected option name, or `null` if no option was selected.
     */
    static selectFromNormalizedWeights<T extends string = string>(entries: WeightOptionEntry<T>[], randomValue?: DecimalSource): T | undefined;
    /**
     * Samples from a multinomial distribution based on the normalized weights of the entries.
     * Approximated using a binomial distribution for each entry. See {@link sampleFromBinomialDistribution} for more information.
     * @param entries - An array of normalized {@link WeightOptionEntry} objects.
     * @param numberOfSelections - The number of selections to make from the entries. This can be as large as you want.
     * @returns An array of {@link SelectedOptionEntry} objects representing the selected options and their counts.
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
    static selectMultipleFromNormalizedWeights<T extends string = string>(entries: WeightOptionEntry<T>[], numberOfSelections: DecimalSource): SelectedOptionEntry<T>[];
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
     * @returns An array of {@link RandomOptionEntry} objects representing the possible options.
     */
    get entries(): RandomOptionEntry<TPossibleNames>[];
    /**
     * The method used to select a random option from the list of entries.
     */
    private readonly selectionMethod;
    /**
     * Creates a new RandomSelector with the given options.
     * @param options - An array of {@link RandomOptionEntry} objects or a function that returns that array representing the possible options.
     * @param selectionMethod - The method used to select a random option from the list of entries. Defaults to {@link defaultSelectionMethod}.
     */
    constructor(options: Pointer<RandomOptionEntry<TPossibleNames>[]>, selectionMethod?: SelectionMethod);
    /**
     * Selects a random option from the list of entries based on their chances and the provided luck.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns A randomly selected option from the entries, or undefined if no options are available.
     */
    select(luck?: DecimalSource): TPossibleNames | undefined;
    /**
     * Gets the normalized weights of the entries based on the provided luck.
     * This has no impact on the functionality of the selector, but is useful for displaying a probability distribution.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns An array of objects representing the normalized weights of the entries.
     */
    getNormalizedWeights(luck?: DecimalSource): WeightOptionEntry<TPossibleNames>[] | undefined;
    /**
     * Selects multiple entries based on the normalized weights of the entries.
     * See {@link selectMultipleFromNormalizedWeights} for more information.
     * @param numberOfSelections - The number of selections to make from the entries. This can be as large as you want. Defaults to 1.
     * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
     * @returns An array of {@link SelectedOptionEntry} objects representing the selected options and their counts.
     */
    selectMultiple(numberOfSelections?: DecimalSource, luck?: DecimalSource): SelectedOptionEntry<TPossibleNames>[];
}
export type { RandomOptionEntry, WeightOptionEntry };
export { SelectionMethod, RandomSelector, RarestFirstCascadeSelectionMethod };
