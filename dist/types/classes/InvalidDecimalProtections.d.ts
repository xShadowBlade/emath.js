/**
 * @file Handles certain protections for invalid Decimal values.
 */
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
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
declare enum DecimalProtectionWarningType {
    nan = "NaN",
    infinite = "infinite",
    negative = "negative",
    zero = "zero",
    nonInteger = "non-integer",
    nonDecimal = "non-Decimal",
    failedToSerializeDecimal = "plain Decimal-like object",
    unknown = "unknown"
}
/**
 * Handles certain protections for invalid Decimal values.
 */
declare class InvalidDecimalProtections {
    /**
     * The maximum total number of warnings that can be issued by this instance. Once this is reached, further warnings will be suppressed.
     */
    static readonly maxTotalWarnings = 100;
    /**
     * Checks if the Decimal is negative. Assumes that the Decimal is already normalized, so it does not check for negative zero.
     * @param decimal - The value to check.
     * @returns true if the Decimal is negative, false otherwise.
     */
    static isDecimalNegative(decimal: Decimal): boolean;
    /**
     * Checks if the Decimal is zero. The Decimal does not need to be normalized.
     * Adapted from the zero check in {@link Decimal.normalize}.
     * Note that this also returns true for negative zero.
     * @param decimal - The value to check.
     * @returns true if the Decimal is zero, false otherwise.
     */
    static isDecimalZero(decimal: Decimal): boolean;
    /**
     * The default protections for invalid Decimal values.
     * These can be overridden by passing a {@link DecimalProtectionsOptions} object to the constructor.
     */
    static readonly defaultProtections: DecimalProtectionsOptions;
    /**
     * The protections currently in use for this instance. Can be modified by calling {@link withProtections} or by directly modifying the properties of this object.
     */
    protections: DecimalProtectionsOptions;
    /**
     * The total number of warnings that have been issued by this instance. Once this reaches {@link InvalidDecimalProtections.maxTotalWarnings}, further warnings will be suppressed.
     */
    private totalWarningCount;
    /**
     * @param initialProtections - The protections to use for this instance.
     * Any properties not specified will default to {@link InvalidDecimalProtections.defaultProtections}.
     */
    constructor(initialProtections?: Partial<DecimalProtectionsOptions>);
    private fromDecimalSourceOrFailedToSerializeDecimal;
    private shouldWarn;
    private warnInvalidValue;
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
    validateValueOrElse(value?: DecimalSource, elseValue?: Decimal, context?: string, ...toLogIfInvalid: unknown[]): Decimal;
    /**
     * Modifies the protections for this instance. Any properties not specified will remain unchanged.
     * @param newProtections - The new protections to use for this instance.
     */
    setProtections(newProtections: Partial<DecimalProtectionsOptions>): void;
}
export { InvalidDecimalProtections };
export type { DecimalProtectionsOptions, DecimalProtectionWarningType };
