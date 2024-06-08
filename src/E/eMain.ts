/**
 * @file The main file for the Decimal library.
 */
// import "./formats";
import { Decimal } from "./e";
import type { DecimalSource } from "./e";
// import { formats } from "./formats";

// eslint-disable-next-line
/**
 * A function that returns a Decimal instance. Also contains static methods and properties of the Decimal class.
 * @deprecated Use the Decimal class directly. This function will be removed in a future version.
 * @param x - The value to convert to a Decimal instance.
 * @returns - The Decimal instance.
 */
const E: ((x?: DecimalSource) => Decimal) & typeof Decimal = ((): typeof E => {
    let shownWarning = false;
    const out = (x?: DecimalSource): Decimal => {
        if (!shownWarning) {
            console.warn("The E function is deprecated. Use the Decimal class directly.");
            shownWarning = true;
        }
        return new Decimal(x);
    };

    // Copy properties from Decimal to E
    // eslint-disable-next-line @typescript-eslint/no-extraneous-class
    (Object.getOwnPropertyNames(Decimal).filter((b) => !Object.getOwnPropertyNames(class {}).includes(b))).forEach((prop) => {
        // @ts-expect-error - Assignment to a read-only property
        (out as typeof E)[prop as keyof typeof Decimal] = (Decimal)[prop as keyof typeof Decimal];
    });
    return out as typeof E;
})();

type E = Decimal;

/**
 * @deprecated Use the DecimalSource type directly. This type will be removed in a future version.
 */
type ESource = DecimalSource;

// test
// const a = new Decimal("1.23e89");
// const b = new Decimal("4.56e78");
// console.log(a.mul(b).format());
// console.log(Decimal, Object.getOwnPropertyNames(Decimal));
// console.log(Decimal.pow(2, 3).format());

export { E };
export type { ESource };
// export * from "./formats";
// export { FORMATS, FormatTypeList } from "./e";
// export type { FormatType } from "./e";
