/**
 * @file Declares the DecimalArray class.
 */
import type { CompareResult } from "./e";
import { Decimal } from "./e";
/**
 * A specialized array to store Decimals in a more memory-efficient way.
 * Internally backed by two Float64Arrays, one for the layer and sign, and one for the mag.
 * Does not implement all Array methods, only the ones that are necessary for storing and retrieving Decimals.
 */
declare class DecimalArray implements Iterable<Decimal> {
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
    private layerAndSignArray;
    /**
     * Stores the mag of each Decimal in a Float64Array.
     */
    private magArray;
    /**
     * The type of the {@link layerAndSignArray}.
     */
    private layerAndSignArrayType;
    /**
     * The number of Decimals stored in the array.
     */
    length: number;
    /**
     * Creates a new DecimalArray with the specified size.
     * @param size - The number of Decimals to store in the array.
     * @param maxLayerThatCouldBeStored - The maximum layer that could be stored in the array.
     * This is used to determine the appropriate type for the layerAndSignArray.
     */
    constructor(size: number, maxLayerThatCouldBeStored?: number);
    resizeLayerAndSignArray(maxLayerThatCouldBeStored?: number, fillFromExisting?: boolean): void;
    resize(newSize: number): void;
    /**
     * Modifies the existing Decimal at the given index to have the same value as the Decimal at the given index.
     * @param index - The index of the Decimal to get.
     * @param existingDecimal - The Decimal to modify.
     */
    getIntoExisting(index: number, existingDecimal: Decimal): void;
    /**
     * Gets the Decimal at the given index.
     * @param index - The index of the Decimal to get.
     * @returns A new Decimal with the same value as the Decimal at the given index.
     */
    get(index: number): Decimal;
    /**
     * Sets the Decimal at the given index to have the same value as the given Decimal.
     * @param index - The index of the Decimal to set.
     * @param decimal - The Decimal to set the value to.
     */
    set(index: number, decimal: Decimal): void;
    /**
     * Compares the Decimal at the given index with the given Decimal.
     * Equal to `this.get(index).cmp(decimalToCompare)`, but more efficient because it doesn't create a new Decimal instance.
     * @param index - The index of the Decimal to compare.
     * @param decimalToCompare - The Decimal to compare with.
     * @returns -1 if the Decimal at the given index is less than the given Decimal, 0 if they are equal, and 1 if the Decimal at the given index is greater than the given Decimal.
     */
    compareAt(index: number, decimalToCompare: Decimal): CompareResult;
    /**
     * Binary searches for the given Decimal in the array.
     * Assumes the array is sorted in ascending order.
     * @param decimalToSearch - The Decimal to search for.
     * @returns The index of the Decimal if found, or an `integerIndex` + 0.5 if not found, where the `integerIndex` is the index of the largest Decimal in the array that is less than the given Decimal.
     */
    search(decimalToSearch: Decimal): number;
    /**
     * @returns An iterator over the Decimals in the array.
    //  * Important: This method reuses the same Decimal instance for each value in the array.
    //  * If a reference to a Decimal in the array needs to be stored, it should be cloned first before storing the reference.
     */
    [Symbol.iterator](): IterableIterator<Decimal>;
}
export { DecimalArray };
