/**
 * @file Declares the DecimalArray class.
 */
import { Decimal } from "./e";

enum DecimalLayerArrayType {
    int8Array = 127,
    int16Array = 32767,
    int32Array = 2147483647,
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
     * Because layer is normally always positive, we can use the sign bit of the layer to store the sign of the Decimal.
     * In this array, negative layers are used to represent negative Decimals, and positive layers are used to represent positive Decimals.
     * In this array, a layer of `-0` represents a Decimal with a layer of 0 and a negative sign.
     *
     * The array type changes based on the maximum layer that could be stored in the array to save memory.
     * - Layers from -128 to 127 can be stored in an Int8Array.
     * - Layers from -32768 to 32767 can be stored in an Int16Array.
     * - Layers from -2147483648 to 2147483647 can be stored in an Int32Array.
     * - Layers outside of that range are stored in a Float64Array.
     */
    private readonly layerAndSignArray: Int8Array | Int16Array | Int32Array | Float64Array;

    /**
     * Stores the mag of each Decimal in a Float64Array.
     */
    private readonly magArray: Float64Array;

    private layerAndSignArrayType: DecimalLayerArrayType;

    public readonly length: number;

    /**
     * Creates a new DecimalArray with the specified size.
     * @param size - The number of Decimals to store in the array.
     * @param maxLayerThatCouldBeStored - The maximum layer that could be stored in the array.
     * This is used to determine the appropriate type for the layerAndSignArray.
     */
    // constructor(size: number) {
    //     this.layerAndSignArray = new Float64Array(size);
    //     this.magArray = new Float64Array(size);
    // }
    constructor(size: number, maxLayerThatCouldBeStored = Infinity) {
        // Determine the appropriate type for the layerAndSignArray based on the maximum layer that could be stored
        // if (maxLayerThatCouldBeStored <= DecimalLayerArrayType.int8Array) {
        //     this.layerAndSignArray = new Int8Array(size);
        //     this.layerAndSignArrayType = DecimalLayerArrayType.int8Array;
        // } else if (maxLayerThatCouldBeStored <= DecimalLayerArrayType.int16Array) {
        //     this.layerAndSignArray = new Int16Array(size);
        //     this.layerAndSignArrayType = DecimalLayerArrayType.int16Array;
        // } else if (maxLayerThatCouldBeStored <= DecimalLayerArrayType.int32Array) {
        //     this.layerAndSignArray = new Int32Array(size);
        //     this.layerAndSignArrayType = DecimalLayerArrayType.int32Array;
        // } else {
        //     this.layerAndSignArray = new Float64Array(size);
        //     this.layerAndSignArrayType = DecimalLayerArrayType.float64Array;
        // }

        this.length = size;

        // Temp assignments
        this.layerAndSignArray = new Int8Array(0);
        this.layerAndSignArrayType = DecimalLayerArrayType.int8Array;

        this.resizeLayerAndSignArray(maxLayerThatCouldBeStored);

        this.magArray = new Float64Array(size);
    }

    public resizeLayerAndSignArray(maxLayerThatCouldBeStored = Infinity): void {
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

        newLayerAndSignArray.set(this.layerAndSignArray);

        // @ts-expect-error - Temporarily disable readonly to allow resizing the array
        this.layerAndSignArray = newLayerAndSignArray;
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
        const layer = Math.abs(layerAndSign);
        const sign = Object.is(layerAndSign, -0) ? -1 : layer === 0 && mag === 0 ? 0 : 1;

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

        this.layerAndSignArray[index] = decimal.sign * decimal.layer;
        this.magArray[index] = decimal.mag;
    }

    /**
     * @returns An iterator over the Decimals in the array.
     * Important: This method reuses the same Decimal instance for each value in the array.
     * If a reference to a Decimal in the array needs to be stored, it should be cloned first before storing the reference.
     */
    public [Symbol.iterator](): IterableIterator<Decimal> {
        let index = 0;
        const size = this.layerAndSignArray.length;
        const existingDecimal = new Decimal();

        return {
            next: (): IteratorResult<Decimal> => {
                if (index < size) {
                    this.getIntoExisting(index, existingDecimal);
                    index++;
                    return { value: existingDecimal, done: false };
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
