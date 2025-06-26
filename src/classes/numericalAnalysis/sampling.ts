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
function gaussianRandom(mean: DecimalSource = 0, standardDeviation: DecimalSource = 1): Decimal {
    // Convert [0, 1) to (0, 1]
    const u = Decimal.dOne.sub(Math.random());
    const v = new Decimal(Math.random());
    const z = Decimal.sqrt(u.ln().mul(-2)).mul(v.mul(2 * Math.PI).cos());

    // Transform to the desired mean and standard deviation
    return z.mul(standardDeviation).add(mean);
}

/**
 * Generates a random sample from a Poisson distribution using the inverse transform sampling method.
 * @param lambda - The rate parameter of the Poisson distribution.
 * @returns A random sample from the Poisson distribution.
 */
function poissonRandom(lambda: DecimalSource): Decimal {
    const L = Decimal.dNegOne.mul(lambda).exp();
    let k = new Decimal(0);
    let prod = Decimal.dOne;

    do {
        k = k.add(1);
        prod = prod.mul(Math.random());
    } while (prod.gt(L));

    return k.sub(1);
}

/**
 * Samples from a binomial distribution using various methods depending on the parameters.
 * - `np > 10`: Uses Gaussian approximation. See {@link gaussianRandom}.
 * - `np <= 10`: Uses Poisson approximation. See {@link poissonRandom}.
 * @param numberOfTrials - The number of trials in the binomial distribution.
 * @param probabilityOfSuccess - The probability of success in each trial.
 * @returns A sample from the binomial distribution, or null if the parameters are invalid.
 */
function sampleFromBinomialDistribution(
    numberOfTrials: DecimalSource,
    probabilityOfSuccess: DecimalSource,
): Decimal | null {
    // Validate inputs
    numberOfTrials = new Decimal(numberOfTrials);
    probabilityOfSuccess = new Decimal(probabilityOfSuccess);

    if (numberOfTrials.lt(0) || probabilityOfSuccess.lt(0) || probabilityOfSuccess.gt(1)) {
        return null;
    }

    const np = numberOfTrials.mul(probabilityOfSuccess);

    // Use Gaussian approximation for large np
    if (np.gt(10)) {
        return gaussianRandom(np, Decimal.sqrt(np.mul(Decimal.dOne.sub(probabilityOfSuccess))))
            .round()
            .clamp(0, numberOfTrials);
    }

    // TODO: more checks for different values of np like small p and large n
    // Use poisson approximation for small np
    return poissonRandom(np).round().clamp(0, numberOfTrials);
}

// Test gaussianRandom
// const meanTest = new Decimal(10);
// const stdDevTest = new Decimal(2);

// console.time("gaussianRandom");
// const testSamples = Array.from({ length: 100000 }, () => gaussianRandom(meanTest, stdDevTest));
// console.timeEnd("gaussianRandom");

// const sampleMean = testSamples.reduce((sum, value) => sum.add(value), new Decimal(0)).div(testSamples.length);
// const sampleVariance = testSamples.reduce((sum, value) => sum.add(value.sub(sampleMean).pow(2)), new Decimal(0)).div(testSamples.length);

// console.table({
//     sampleMean: sampleMean.toNumber(),
//     expectedMean: meanTest.toNumber(),
//     sampleStandardDeviation: sampleVariance.sqrt().toNumber(),
//     expectedStandardDeviation: stdDevTest.toNumber(),
//     min: testSamples.reduce((min, value) => (value.lt(min) ? value : min), testSamples[0]).toNumber(),
//     max: testSamples.reduce((max, value) => (value.gt(max) ? value : max), testSamples[0]).toNumber(),
// });

// Test poissonRandom
// const lambdaTest = new Decimal(5);

// console.time("poissonRandom");
// const poissonSamples = Array.from({ length: 100000 }, () => poissonRandom(lambdaTest));
// console.timeEnd("poissonRandom");
// const poissonSampleMean = poissonSamples.reduce((sum, value) => sum.add(value), new Decimal(0)).div(poissonSamples.length);
// const poissonSampleVariance = poissonSamples.reduce((sum, value) => sum.add(value.sub(poissonSampleMean).pow(2)), new Decimal(0)).div(poissonSamples.length);
// console.table({
//     poissonSampleMean: poissonSampleMean.toNumber(),
//     expectedPoissonMean: lambdaTest.toNumber(),
//     poissonSampleVariance: poissonSampleVariance.toNumber(),
//     expectedPoissonVariance: lambdaTest.toNumber(),
//     poissonMin: poissonSamples.reduce((min, value) => (value.lt(min) ? value : min), poissonSamples[0]).toNumber(),
//     poissonMax: poissonSamples.reduce((max, value) => (value.gt(max) ? value : max), poissonSamples[0]).toNumber(),
// });

export { gaussianRandom, poissonRandom, sampleFromBinomialDistribution };
