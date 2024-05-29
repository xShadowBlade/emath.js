/**
 * @file Declares the attribute and attributeStatic classes.
 */
import "reflect-metadata"; // Required for class-transformer
import { Type } from "class-transformer";
// import { Decimal, DecimalSource } from "../E/e";
import { Boost } from "./Boost";
import { Decimal, DecimalSource } from "../E/e";
import type { Pointer } from "../common/types";

/**
 * Represents an attribute in the game.
 * Note: This is only meant for the data of an attribute. Use in combination with {@link AttributeStatic} for the actual attribute.
 */
class Attribute {
    /** The current value of the attribute. */
    @Type(() => Decimal)
    public value: Decimal;

    /**
     * Constructs a static attribute with an initial effect.
     * @param initial - The inital value of the attribute.
     */
    constructor (initial: DecimalSource = 0) {
        this.value = new Decimal(initial);
    }
}

/**
 * Represents a static attribute, which is number that can affected by boosts.
 *
 * Note: This class is essentially a wrapper around {@link Boost}, and if you choose not to use boosts, you can use {@link Decimal} directly.
 * It may be marked as deprecated in the future.
 * @template B - Indicates whether the boost is enabled. Defaults to true.
 * @example
 * const health = new AttributeStatic(undefined, true, 100); // AttributeStatic<true>
 * // Set a health boost that multiplies the health by 1.1
 * health.boost.setBoost({
 *     id: "healthBoost",
 *     value: (e) => e.mul(1.1),
 * });
 * console.log(health.value); // 110
 */
class AttributeStatic<B extends boolean = true> {
    /** The data for the attribute. */
    protected readonly pointerFn: (() => Attribute);

    /** @returns The data for the attribute. */
    public get pointer (): Attribute {
        return this.pointerFn();
    }

    /** The initial value of the attribute. */
    public readonly initial: Decimal;

    /**
     * The boost of the attribute.
     * NOTE: This will not be used if the boost is disabled.
     */
    public readonly boost: B extends true ? Boost : null;

    /**
     * Constructs a new instance of the Attribute class.
     * @param pointer - A function or an instance of the attribute class. Defaults to a new instance of the attribute class.
     * @param useBoost - Indicates whether to use boost for the attribute. Defaults to true. (hint: if you don't use boost, don't use this class and use Decimal directly)
     * @param initial - The initial value of the attribute. Defaults to 0.
     */
    constructor (pointer?: Pointer<Attribute>, useBoost: B = true as B, initial: DecimalSource = 0) {
        // Assign the initial value
        this.initial = new Decimal(initial);

        // Set the pointer and pointer function
        pointer ??= new Attribute(this.initial);
        this.pointerFn = (typeof pointer === "function" ? pointer : (): Attribute => pointer);

        // Create the boost if enabled
        this.boost = (useBoost ? new Boost(this.initial) : null) as typeof this.boost;
    }

    /**
     * Updates the value of the attribute.
     * NOTE: This method must be called every time the boost is updated, else the value stored will not be updated.
     * @deprecated This is automatically called when the value is accessed. It will be removed in the future.
     */
    public update (): void {
        console.warn("AttributeStatic.update is deprecated and will be removed in the future. The value is automatically updated when accessed.");
        if (this.boost) {
            this.pointer.value = this.boost.calculate();
        }
    }

    /**
     * Gets the value of the attribute, and also updates the value stored.
     * NOTE: This getter must be called every time the boost is updated, else the value stored will not be updated.
     * @returns The calculated value of the attribute.
     */
    public get value (): Decimal {
        if (this.boost) {
            this.pointer.value = this.boost.calculate();
        }
        return this.pointer.value;
    }

    /**
     * Sets the value of the attribute.
     * NOTE: This setter should not be used when boost is enabled.
     * @param value - The value to set the attribute to.
     */
    public set value (value: Decimal) {
        if (this.boost) {
            throw new Error("Cannot set value of attributeStatic when boost is enabled.");
        }
        this.pointer.value = value;
    }
}

export { Attribute, AttributeStatic };
