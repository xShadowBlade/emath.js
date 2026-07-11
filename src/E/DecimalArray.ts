/**
 * @file Declares the DecimalArray class.
 */
import type { CompareResult } from "./e";
import { Decimal } from "./e";

enum DecimalLayerArrayType {
    int8Array = 126,
    int16Array = 32766,
    int32Array = 2147483646,
    // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
    float64Array = Infinity,
}

/**
 * A specialized array to store Decimals in a more memory-efficient way.
 * Internally backed by two Float64Arrays, one for the layer and sign, and one for the mag.
 * Does not implement all Array methods, only the ones that are necessary for storing and retrieving Decimals.
 */
class DecimalArray implements Iterable<Decimal> {
    /**
     * Stores the layer and sign of each Decimal in a Float64Array.
     * Because layer is normally always positive, we can use the sign of the layer to store the sign of the Decimal.
     * In this array, negative layers are used to represent negative Decimals, and positive layers are used to represent positive Decimals.
     * In this array, a layer of `0` represents a Decimal that is exactly `0`.
     * A positive value in this array represents a positive Decimal with layer `value - 1`, and a negative value in this array represents a negative Decimal with layer `-value - 1`.
     *
     * The array type changes based on the maximum layer that could be stored in the array to save memory.
     * - Layers from -127 to 126 can be stored in an Int8Array.
     * - Layers from -32767 to 32766 can be stored in an Int16Array.
     * - Layers from -2147483647 to 2147483646 can be stored in an Int32Array.
     * - Layers outside of that range are stored in a Float64Array.
     */
    private layerAndSignArray: Int8Array | Int16Array | Int32Array | Float64Array;

    /**
     * Stores the mag of each Decimal in a Float64Array.
     */
    private magArray: Float64Array;

    /**
     * The type of the {@link layerAndSignArray}.
     */
    private layerAndSignArrayType: DecimalLayerArrayType;

    /**
     * The number of Decimals stored in the array.
     */
    public length: number;

    /**
     * Creates a new DecimalArray with the specified size.
     * @param size - The number of Decimals to store in the array.
     * @param maxLayerThatCouldBeStored - The maximum layer that could be stored in the array.
     * This is used to determine the appropriate type for the layerAndSignArray.
     */
    constructor(size: number, maxLayerThatCouldBeStored = Infinity) {
        this.length = size;

        // Temp assignments
        this.layerAndSignArray = new Int8Array(0);
        this.layerAndSignArrayType = DecimalLayerArrayType.int8Array;

        this.resizeLayerAndSignArray(maxLayerThatCouldBeStored);

        this.magArray = new Float64Array(size);
    }

    public resizeLayerAndSignArray(maxLayerThatCouldBeStored = Infinity, fillFromExisting = true): void {
        let newLayerAndSignArray: Int8Array | Int16Array | Int32Array | Float64Array;
        maxLayerThatCouldBeStored = Math.abs(maxLayerThatCouldBeStored);

        if (maxLayerThatCouldBeStored <= DecimalLayerArrayType.int8Array) {
            newLayerAndSignArray = new Int8Array(this.length);
            this.layerAndSignArrayType = DecimalLayerArrayType.int8Array;
        } else if (maxLayerThatCouldBeStored <= DecimalLayerArrayType.int16Array) {
            newLayerAndSignArray = new Int16Array(this.length);
            this.layerAndSignArrayType = DecimalLayerArrayType.int16Array;
        } else if (maxLayerThatCouldBeStored <= DecimalLayerArrayType.int32Array) {
            newLayerAndSignArray = new Int32Array(this.length);
            this.layerAndSignArrayType = DecimalLayerArrayType.int32Array;
        } else {
            newLayerAndSignArray = new Float64Array(this.length);
            this.layerAndSignArrayType = DecimalLayerArrayType.float64Array;
        }

        if (fillFromExisting) {
            newLayerAndSignArray.set(this.layerAndSignArray);
        }

        this.layerAndSignArray = newLayerAndSignArray;
    }

    // TODO: rename
    public resize(newSize: number): void {
        const wouldOverflow = newSize < this.length;

        this.length = newSize;

        const oldMagArray = this.magArray;
        const oldLayerArray = this.layerAndSignArray;

        this.magArray = new Float64Array(newSize);
        this.resizeLayerAndSignArray(this.layerAndSignArrayType, !wouldOverflow);

        if (!wouldOverflow) {
            this.magArray.set(oldMagArray);
        } else {
            for (let i = 0; i < newSize; i++) {
                this.magArray[i] = oldMagArray[i];
                this.layerAndSignArray[i] = oldLayerArray[i];
            }
        }
    }

    /**
     * Modifies the existing Decimal at the given index to have the same value as the Decimal at the given index.
     * @param index - The index of the Decimal to get.
     * @param existingDecimal - The Decimal to modify.
     */
    public getIntoExisting(index: number, existingDecimal: Decimal): void {
        // Bounds check
        if (index < 0 || index >= this.length) {
            console.warn(
                `eMath.js: Attempted to access index ${index} of DecimalArray of length ${this.length}. Returning NaN Decimal.`,
                { index, length: this.length, array: this },
            );
            existingDecimal.fromDecimal(Decimal.dNaN);
            return;
        }

        const layerAndSign = this.layerAndSignArray[index];
        const mag = this.magArray[index];

        // Extract sign and layer
        const layer = layerAndSign === 0 ? 0 : Math.abs(layerAndSign) - 1;
        const sign = Math.sign(layerAndSign);

        existingDecimal.fromComponents_noNormalize(sign, layer, mag);
    }

    /**
     * Gets the Decimal at the given index.
     * @param index - The index of the Decimal to get.
     * @returns A new Decimal with the same value as the Decimal at the given index.
     */
    public get(index: number): Decimal {
        const out = new Decimal();
        this.getIntoExisting(index, out);
        return out;
    }

    /**
     * Sets the Decimal at the given index to have the same value as the given Decimal.
     * @param index - The index of the Decimal to set.
     * @param decimal - The Decimal to set the value to.
     */
    public set(index: number, decimal: Decimal): void {
        // Resize if necessary
        if (Math.abs(decimal.layer) > this.layerAndSignArrayType) {
            this.resizeLayerAndSignArray(decimal.layer);
        }

        this.layerAndSignArray[index] = decimal.sign === 0 ? 0 : (decimal.layer + 1) * decimal.sign;
        this.magArray[index] = decimal.mag;
    }

    /**
     * Compares the Decimal at the given index with the given Decimal.
     * Equal to `this.get(index).cmp(decimalToCompare)`, but more efficient because it doesn't create a new Decimal instance.
     * @param index - The index of the Decimal to compare.
     * @param decimalToCompare - The Decimal to compare with.
     * @returns -1 if the Decimal at the given index is less than the given Decimal, 0 if they are equal, and 1 if the Decimal at the given index is greater than the given Decimal.
     */
    public compareAt(index: number, decimalToCompare: Decimal): CompareResult {
        const layerAndSign = this.layerAndSignArray[index];
        const mag = this.magArray[index];

        // Extract sign and layer
        const layer = layerAndSign === 0 ? 0 : Math.abs(layerAndSign) - 1;
        const sign = Math.sign(layerAndSign);

        // Adapted from Decimal.prototype.cmp
        if (sign > decimalToCompare.sign) {
            return 1;
        }
        if (sign < decimalToCompare.sign) {
            return -1;
        }

        // Adapted from Decimal.prototype.cmpabs
        const normalizedSignedLayerA = mag > 0 ? layer : -layer;
        const normalizedSignedLayerB = decimalToCompare.mag > 0 ? decimalToCompare.layer : -decimalToCompare.layer;

        if (normalizedSignedLayerA > normalizedSignedLayerB) {
            return sign as CompareResult;
        }
        if (normalizedSignedLayerA < normalizedSignedLayerB) {
            return -sign as CompareResult;
        }
        if (mag > decimalToCompare.mag) {
            return sign as CompareResult;
        }
        if (mag < decimalToCompare.mag) {
            return -sign as CompareResult;
        }

        return 0;
    }

    /**
     * Binary searches for the given Decimal in the array.
     * Assumes the array is sorted in ascending order.
     * @param decimalToSearch - The Decimal to search for.
     * @returns The index of the Decimal if found, or an `integerIndex` + 0.5 if not found, where the `integerIndex` is the index of the largest Decimal in the array that is less than the given Decimal.
     */
    public search(decimalToSearch: Decimal): number {
        let low = 0;
        let high = this.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const comparison = this.compareAt(mid, decimalToSearch);

            // Found an exact match, return the index
            if (comparison === 0) {
                return mid;
            }

            if (comparison < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return low - 0.5;
    }

    /**
     * @returns An iterator over the Decimals in the array.
    //  * Important: This method reuses the same Decimal instance for each value in the array.
    //  * If a reference to a Decimal in the array needs to be stored, it should be cloned first before storing the reference.
     */
    public [Symbol.iterator](): IterableIterator<Decimal> {
        let index = 0;
        const size = this.layerAndSignArray.length;
        // const existingDecimal = new Decimal();

        return {
            next: (): IteratorResult<Decimal> => {
                if (index < size) {
                    // this.getIntoExisting(index, existingDecimal);
                    // index++;
                    // return { value: existingDecimal, done: false };
                    return { value: this.get(index++), done: false };
                } else {
                    return { value: undefined, done: true };
                }
            },

            [Symbol.iterator](): IterableIterator<Decimal> {
                return this;
            },
        };
    }
}

export { DecimalArray };
