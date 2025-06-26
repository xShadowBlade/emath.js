/**
 * @file Declares functions relating to sampling of probabilities.
 */
import type { DecimalSource } from "../../E/e";
import { Decimal } from "../../E/e";
/**
 * Generates a random sample from a normal distribution using the Box-Muller transform.
 * Adapted from {@link https://stackoverflow.com/a/36481059/}.
 * @param mean - The mean of the normal distribution.
 * @param standardDeviation - The standard deviation of the normal distribution.
 * @returns A random sample from the normal distribution.
 */
declare function gaussianRandom(mean?: DecimalSource, standardDeviation?: DecimalSource): Decimal;
/**
 * Generates a random sample from a Poisson distribution using the inverse transform sampling method.
 * @param lambda - The rate parameter of the Poisson distribution.
 * @returns A random sample from the Poisson distribution.
 */
declare function poissonRandom(lambda: DecimalSource): Decimal;
/**
 * Samples from a binomial distribution using various methods depending on the parameters.
 * - `np > 10`: Uses Gaussian approximation. See {@link gaussianRandom}.
 * - `np <= 10`: Uses Poisson approximation. See {@link poissonRandom}.
 * @param numberOfTrials - The number of trials in the binomial distribution.
 * @param probabilityOfSuccess - The probability of success in each trial.
 * @returns A sample from the binomial distribution, or null if the parameters are invalid.
 */
declare function sampleFromBinomialDistribution(numberOfTrials: DecimalSource, probabilityOfSuccess: DecimalSource): Decimal | null;
export { gaussianRandom, poissonRandom, sampleFromBinomialDistribution };
