/**
 * @file Declares the attribute and attributeStatic classes.
 */
import { E, ESource } from "../E/eMain";
import { boost } from "../classes/boost";
import { Type } from "class-transformer";
import { Decimal } from "../E/e";

/**
 * Represents an attribute in the game.
 * @deprecated Use {@link attributeStatic} instead.
 */
class attribute {
    /** The current value of the attribute. */
    @Type(() => Decimal)
    public value: E;

    /**
     * Constructs a static attribute with an initial effect.
     * @param initial - The inital value of the attribute.
     */
    constructor (initial: ESource) {
        this.value = E(initial);
    }
}

/** Represents a static attribute, which is number effected by boosts. */
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
     * @param pointer - A function or an instance of the attribute class.
     * @param useBoost - Indicates whether to use boost for the attribute.
     * @param initial - The initial value of the attribute.
     */
    constructor (pointer: (() => attribute) | attribute, useBoost: boolean = true, initial: ESource = 0) {
        this.initial = E(initial);
        // this.pointer = typeof pointer === "function" ? pointer() : pointer;
        this.pointerFn = typeof pointer === "function" ? pointer() : pointer;
        if (useBoost) this.boost = new boost(this.initial);
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
