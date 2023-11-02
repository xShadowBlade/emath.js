"use strict";

// import Decimal from "break_eternity.js";
// import formats from "./format";

import { Decimal, DecimalSource } from "E/e";

const E = (x?: DecimalSource) => new Decimal(x);

// eslint-disable-next-line no-redeclare
type E = Decimal;

const eMath = {};

export { eMath, E };