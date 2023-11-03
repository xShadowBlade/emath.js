"use strict";

import Decimal, { DecimalSource } from "E/e";

type StaticMethods<T> = {
	// eslint-disable-next-line no-unused-vars
	[K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
};

// @ts-ignore
const E: StaticMethods<Decimal> & {
	/* eslint-disable no-unused-vars */
	(x?: DecimalSource): Decimal;
	/* eslint-enable */
} = (x?: DecimalSource) => new Decimal(x);

// Copy static properties from Decimal to E
(Object.getOwnPropertyNames(Decimal).filter((b) => !Object.getOwnPropertyNames(class {}).includes(b)) as string[]).forEach((prop) => {
    (E as any)[prop] = (Decimal as any)[prop];
});

// eslint-disable-next-line no-redeclare
type E = Decimal;

const eMath = {};

export { eMath, E };