/**
 * @file Declares the attribute and attributeStatic classes.
 */
import { E, ESource } from "../E/eMain";
import { boost } from "../classes/boost";
import { Type } from "class-transformer";
import { Decimal } from "../E/e";

/**
 * Represents an attribute in the game.
 * Note: This is only meant for the data of an attribute. Use in combination with {@link attributeStatic} for the actual attribute.
 */
class attribute {
    /** The current value of the attribute. */
    @Type(() => Decimal)
    public value: E;

    /**
     * Constructs a static attribute with an initial effect.
     * @param initial - The inital value of the attribute.
     */
    constructor (initial: ESource = 0) {
        this.value = E(initial);
    }
}

/**
 * Represents a static attribute, which is number that can effected by boosts.
 * @example
 * const health = new attributeStatic(undefined, true, 100);
 * // Set a health boost that multiplies the health by 1.1
 * health.boost?.setBoost({
 *     id: "healthBoost",
 *     value: (e) => e.mul(1.1),
 * });
 * console.log(health.value); // 110
 */
class attributeStatic {
    protected pointerFn: attribute;

    get pointer () {
        return this.pointerFn;
    }

    /** The initial value of the attribute. */
    public initial: E;

    /**
     * The boost of the attribute.
     * NOTE: This will not be used if the boost is disabled.
     */
    public boost?: boost;

    /**
     * Constructs a new instance of the Attribute class.
     * @param pointer - A function or an instance of the attribute class. Defaults to a new instance of the attribute class.
     * @param useBoost - Indicates whether to use boost for the attribute.
     * @param initial - The initial value of the attribute.
     */
    constructor (pointer?: (() => attribute) | attribute, useBoost: boolean = true, initial: ESource = 0) {
        this.initial = E(initial);
        pointer = pointer ?? new attribute(this.initial);
        this.pointerFn = typeof pointer === "function" ? pointer() : pointer;
        if (useBoost) this.boost = new boost(this.initial);
    }

    /**
     * Updates the value of the attribute.
     * NOTE: This method must be called every time the boost is updated, else the value stored will not be updated.
     */
    public update (): void {
        if (this.boost) {
            this.pointer.value = this.boost.calculate();
        }
    }

    /**
     * Gets the value of the attribute, and also updates the value stored.
     * NOTE: This getter must be called every time the boost is updated, else the value stored will not be updated.
     * @returns The calculated value of the attribute.
     */
    public get value (): E {
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
    public set value (value: E) {
        if (this.boost) {
            throw new Error("Cannot set value of attributeStatic when boost is enabled.");
        }
        this.pointer.value = value;
    }
}

export { attribute, attributeStatic };
