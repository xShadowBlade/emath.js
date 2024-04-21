/**
 * @file Declares the attribute and attributeStatic classes.
 */
import "reflect-metadata"; // Required for class-transformer
import { Type } from "class-transformer";
import { E, ESource } from "../E/eMain";
import { Boost } from "./Boost";
import { Decimal } from "../E/e";
import type { Pointer } from "../game/Game";

/**
 * Represents an attribute in the game.
 * Note: This is only meant for the data of an attribute. Use in combination with {@link AttributeStatic} for the actual attribute.
 */
class Attribute {
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
 * @template B - Indicates whether the boost is enabled. Defaults to true.
 * @example
 * const health = new attributeStatic(undefined, true, 100);
 * // Set a health boost that multiplies the health by 1.1
 * health.boost?.setBoost({
 *     id: "healthBoost",
 *     value: (e) => e.mul(1.1),
 * });
 * console.log(health.value); // 110
 */
class AttributeStatic<B extends boolean = true> {
    /** The data for the attribute. */
    protected readonly pointerFn: (() => Attribute);

    /** @returns The data for the attribute. */
    public get pointer () {
        return this.pointerFn();
    }

    /** The initial value of the attribute. */
    public readonly initial: E;

    /**
     * The boost of the attribute.
     * NOTE: This will not be used if the boost is disabled.
     */
    public readonly boost: B extends true ? Boost : undefined;

    /**
     * Constructs a new instance of the Attribute class.
     * @param pointer - A function or an instance of the attribute class. Defaults to a new instance of the attribute class.
     * @param useBoost - Indicates whether to use boost for the attribute.
     * @param initial - The initial value of the attribute.
     */
    constructor (pointer?: Pointer<Attribute>, useBoost?: B, initial: ESource = 0) {
        this.initial = E(initial);
        pointer = (pointer ? (typeof pointer === "function" ? pointer : () => pointer) : () => new Attribute(this.initial)) as (() => Attribute);
        this.pointerFn = pointer;
        this.boost = (useBoost ? new Boost(this.initial) : undefined) as typeof this.boost;
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

export { Attribute, AttributeStatic };
