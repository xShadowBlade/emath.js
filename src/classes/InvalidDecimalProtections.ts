/**
 * @file Handles certain protections for invalid Decimal values.
 */

import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";

// For jsdoc
import type { DataManager, StaticClassWithData } from "../game/managers/DataManager";

/**
 * Possible protections for invalid Decimal values.
 */
interface DecimalProtectionsOptions {
    /**
     * Whether to allow NaN values.
     * Checked using {@link Decimal.isNaN}.
     */
    allowNaN: boolean;

    /**
     * Whether to allow infinite values.
     * Checked using {@link Decimal.isFinite}.
     */
    allowInfinite: boolean;

    /**
     * Whether to allow negative values.
     * Checked using {@link InvalidDecimalProtections.isDecimalNegative}.
     * Note that this does not check for negative zero, which should already be normalized to positive zero.
     */
    allowNegative: boolean;

    /**
     * Whether to allow zero values.
     * Checked using {@link InvalidDecimalProtections.isDecimalZero}.
     */
    allowZero: boolean;

    /**
     * Whether to allow non-integer values.
     * If false, any values will be truncated to integers using {@link Decimal.trunc} before being assigned to a variable.
     */
    allowNonInteger: boolean;
}

/**
 * A possible type of warning that can be issued when an invalid Decimal value is detected along with its name for logging.
 */
enum DecimalProtectionWarningType {
    nan = "NaN",
    infinite = "infinite",
    negative = "negative",
    zero = "zero",
    nonInteger = "non-integer",

    nonDecimal = "non-Decimal",
    failedToSerializeDecimal = "plain Decimal-like object",
    unknown = "unknown",
}

interface FailedToSerializeDecimal {
    sign: number;
    layer: number;
    mag: number;
}

/**
 * Handles certain protections for invalid Decimal values.
 */
class InvalidDecimalProtections {
    /**
     * The maximum total number of warnings that can be issued by this instance. Once this is reached, further warnings will be suppressed.
     */
    public static readonly maxTotalWarnings = 100;

    /**
     * Checks if the Decimal is negative. Assumes that the Decimal is already normalized, so it does not check for negative zero.
     * @param decimal - The value to check.
     * @returns true if the Decimal is negative, false otherwise.
     */
    public static isDecimalNegative(decimal: Decimal): boolean {
        return decimal.sign === -1;
    }

    /**
     * Checks if the Decimal is zero. The Decimal does not need to be normalized.
     * Adapted from the zero check in {@link Decimal.normalize}.
     * Note that this also returns true for negative zero.
     * @param decimal - The value to check.
     * @returns true if the Decimal is zero, false otherwise.
     */
    public static isDecimalZero(decimal: Decimal): boolean {
        return (
            decimal.sign === 0 ||
            (decimal.mag === 0 && decimal.layer === 0) ||
            (decimal.mag === Number.NEGATIVE_INFINITY && decimal.layer > 0 && Number.isFinite(decimal.layer))
        );
    }

    /**
     * The default protections for invalid Decimal values.
     * These can be overridden by passing a {@link DecimalProtectionsOptions} object to the constructor.
     */
    public static readonly defaultProtections: DecimalProtectionsOptions = {
        allowNaN: false,
        allowInfinite: false,
        allowNegative: true,
        allowZero: true,
        allowNonInteger: true,
    };

    /**
     * The protections currently in use for this instance. Can be modified by calling {@link withProtections} or by directly modifying the properties of this object.
     */
    public protections: DecimalProtectionsOptions;

    /**
     * The total number of warnings that have been issued by this instance. Once this reaches {@link InvalidDecimalProtections.maxTotalWarnings}, further warnings will be suppressed.
     */
    private totalWarningCount = 0;

    /**
     * @param initialProtections - The protections to use for this instance.
     * Any properties not specified will default to {@link InvalidDecimalProtections.defaultProtections}.
     */
    public constructor(initialProtections?: Partial<DecimalProtectionsOptions>) {
        this.protections = { ...InvalidDecimalProtections.defaultProtections, ...initialProtections };
    }

    private fromDecimalSourceOrFailedToSerializeDecimal(
        value: DecimalSource | FailedToSerializeDecimal | undefined,
        context: string,
        ...toLogIfInvalid: unknown[]
    ): Decimal | undefined {
        // If the value is a Decimal, number, or string, we can safely convert it to a Decimal.
        if (value instanceof Decimal) {
            return new Decimal(value).normalize();
        }
        if (typeof value === "number" || typeof value === "string") {
            return new Decimal(value);
        }

        // If the value is an object with the properties of a Decimal, we can attempt to reconstruct it.
        if (typeof value === "object" && value !== null && "sign" in value && "mag" in value && "layer" in value) {
            const { sign, mag, layer } = value;

            if (typeof sign === "number" && typeof mag === "number" && typeof layer === "number") {
                this.warnInvalidValue(
                    value,
                    context,
                    DecimalProtectionWarningType.failedToSerializeDecimal,
                    ...toLogIfInvalid,
                );

                return Decimal.fromComponents(sign, layer, mag);
            }
        }

        this.warnInvalidValue(value, context, DecimalProtectionWarningType.nonDecimal, ...toLogIfInvalid);
        return undefined;
    }

    private shouldWarn(context: string, type: DecimalProtectionWarningType, ...toLog: unknown[]): boolean {
        this.totalWarningCount++;

        if (this.totalWarningCount === InvalidDecimalProtections.maxTotalWarnings) {
            console.error(
                `eMath.js: Maximum DecimalProtection total warnings reached. Further warnings will be suppressed for ${context}.`,
                ...toLog,
            );
        }
        if (this.totalWarningCount >= InvalidDecimalProtections.maxTotalWarnings) {
            return false;
        }

        return true;
    }

    private warnInvalidValue(
        theInvalidValue: unknown,
        context: string,
        type: DecimalProtectionWarningType,
        ...toLogIfInvalid: unknown[]
    ): void {
        if (!this.shouldWarn(context, type, ...toLogIfInvalid)) {
            return;
        }

        console.warn(`eMath.js: Attempted to set a ${type} value to ${context}:`, theInvalidValue, ...toLogIfInvalid);
    }

    /**
     * Checks if the value is valid according to the protections and warns if it is not.
     *
     * Intended to be used internally for setter methods in classes.
     * @param value - The value to check.
     * @param elseValue - The value to return if the value is invalid.
     * @param context - The context in which the value is being assigned, used for warning messages.
     * @param toLogIfInvalid - Additional values to log if the value is invalid.
     * @returns A transformed {@link value} if it is valid, otherwise {@link elseValue}.
     */
    public validateValueOrElse(
        value?: DecimalSource,
        elseValue?: Decimal,
        context = "",
        ...toLogIfInvalid: unknown[]
    ): Decimal {
        value = this.fromDecimalSourceOrFailedToSerializeDecimal(value, context, ...toLogIfInvalid);
        elseValue = this.fromDecimalSourceOrFailedToSerializeDecimal(elseValue, `${context} (elseValue)`, ...toLogIfInvalid);

        if (elseValue === undefined) {
            elseValue = new Decimal(Decimal.dOne);
        }
        if (value === undefined) {
            return elseValue;
        }

        if (!this.protections.allowNaN && value.isNan()) {
            this.warnInvalidValue(value, context, DecimalProtectionWarningType.nan, ...toLogIfInvalid);
            return elseValue;
        }

        if (!this.protections.allowInfinite && !value.isFinite()) {
            this.warnInvalidValue(value, context, DecimalProtectionWarningType.infinite, ...toLogIfInvalid);
            return elseValue;
        }

        if (!this.protections.allowNegative && InvalidDecimalProtections.isDecimalNegative(value)) {
            this.warnInvalidValue(value, context, DecimalProtectionWarningType.negative, ...toLogIfInvalid);
            return elseValue;
        }

        if (!this.protections.allowZero && InvalidDecimalProtections.isDecimalZero(value)) {
            this.warnInvalidValue(value, context, DecimalProtectionWarningType.zero, ...toLogIfInvalid);
            return elseValue;
        }

        if (!this.protections.allowNonInteger) {
            value = value.trunc();
        }

        return value;
    }

    /**
     * Modifies the protections for this instance. Any properties not specified will remain unchanged.
     * @param newProtections - The new protections to use for this instance.
     */
    public setProtections(newProtections: Partial<DecimalProtectionsOptions>): void {
        this.protections = { ...this.protections, ...newProtections };
    }
}

export { InvalidDecimalProtections };
export type { DecimalProtectionsOptions, DecimalProtectionWarningType };
