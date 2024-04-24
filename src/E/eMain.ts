/**
 * @file The main file for the E library.
 */
// import "./formats";
import { Decimal } from "./e";
import type { DecimalSource } from "./e";
// import { formats } from "./formats";

// eslint-disable-next-line
/**
 * A function that returns a Decimal instance. Also contains static methods and properties of the Decimal class.
 * @param x - The value to convert to a Decimal instance.
 * @returns - The Decimal instance.
 */
// @ts-expect-error Declared as a function, but adds properties later
const E: ((x?: DecimalSource) => Decimal) & typeof Decimal = (() => {
    const out = (x?: DecimalSource) => new Decimal(x);

    // Copy properties from Decimal to E
    (Object.getOwnPropertyNames(Decimal).filter((b) => !Object.getOwnPropertyNames(class {}).includes(b)) as string[]).forEach((prop) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (out as any)[prop] = (Decimal as any)[prop];
    });
    return out;
})();

type E = Decimal;

// test
// const a = E("1.23e89");
// const b = E("4.56e78");
// console.log(a.mul(b).format());
// console.log(E, Object.getOwnPropertyNames(E));
// console.log(E.pow(2, 3).format());

export { E, DecimalSource as ESource };
// export * from "./formats";
export { FORMATS, FormatTypeList } from "./e";
export type { FormatType } from "./e";