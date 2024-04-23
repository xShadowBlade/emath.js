/**
 * @file Declares the attribute and attributeStatic classes.
 */
import "reflect-metadata";
import { E, ESource } from "../E/eMain";
import { Boost } from "./Boost";
import type { Pointer } from "../game/Game";
/**
 * Represents an attribute in the game.
 * Note: This is only meant for the data of an attribute. Use in combination with {@link AttributeStatic} for the actual attribute.
 */
declare class Attribute {
    /** The current value of the attribute. */
    value: E;
    /**
     * Constructs a static attribute with an initial effect.
     * @param initial - The inital value of the attribute.
     */
    constructor(initial?: ESource);
}
/**
 * Represents a static attribute, which is number that can affected by boosts.
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
declare class AttributeStatic<B extends boolean = true> {
    /** The data for the attribute. */
    protected readonly pointerFn: (() => Attribute);
    /** @returns The data for the attribute. */
    get pointer(): Attribute;
    /** The initial value of the attribute. */
    readonly initial: E;
    /**
     * The boost of the attribute.
     * NOTE: This will not be used if the boost is disabled.
     */
    readonly boost: B extends true ? Boost : null;
    /**
     * Constructs a new instance of the Attribute class.
     * @param pointer - A function or an instance of the attribute class. Defaults to a new instance of the attribute class.
     * @param useBoost - Indicates whether to use boost for the attribute. Defaults to true. (hint: if you don't use boost, don't use this class and use Decimal directly)
     * @param initial - The initial value of the attribute. Defaults to 0.
     */
    constructor(pointer?: Pointer<Attribute>, useBoost?: B, initial?: ESource);
    /**
     * Updates the value of the attribute.
     * NOTE: This method must be called every time the boost is updated, else the value stored will not be updated.
     * @deprecated This is automatically called when the value is accessed. It will be removed in the future.
     */
    update(): void;
    /**
     * Gets the value of the attribute, and also updates the value stored.
     * NOTE: This getter must be called every time the boost is updated, else the value stored will not be updated.
     * @returns The calculated value of the attribute.
     */
    get value(): E;
    /**
     * Sets the value of the attribute.
     * NOTE: This setter should not be used when boost is enabled.
     * @param value - The value to set the attribute to.
     */
    set value(value: E);
}
export { Attribute, AttributeStatic };
