import { E, ESource } from "../eMain";
import { boost } from "../classes/boost";
/**
 * Represents an attribute in the game.
 * @deprecated Use {@link attributeStatic} instead.
 */
declare class attribute {
    /**
     * The current value of the attribute.
     */
    value: E;
    /**
     * Constructs a static attribute with an initial effect.
     * @param initial - The inital value of the attribute.
     */
    constructor(initial: ESource);
}
/**
 * Represents a static attribute, which is number effected by boosts.
 */
declare class attributeStatic {
    protected pointer: attribute;
    /**
     * The initial value of the attribute.
     */
    initial: E;
    /**
     * The boost of the attribute.
     * NOTE: This will not be used if the boost is disabled.
     */
    boost: boost;
    /**
     * Constructs a new instance of the Attribute class.
     * @param pointer - A function or an instance of the attribute class.
     * @param initial - The initial value of the attribute.
     * @param useBoost - Indicates whether to use boost for the attribute.
     */
    constructor(pointer: (() => attribute) | attribute, useBoost?: boolean, initial?: ESource);
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
export { attribute, attributeStatic };
