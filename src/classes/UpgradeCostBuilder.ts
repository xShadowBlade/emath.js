import { Decimal } from "../E/e";

class UpgradeCostOperation {
    constructor(
        public apply: (input: Decimal, magnitude: Decimal) => Decimal,
        public inverse: (input: Decimal, magnitude: Decimal) => Decimal,
    ) {}
}

const Operations = {
    add: new UpgradeCostOperation(
        (input, magnitude) => input.add(magnitude),
        (input, magnitude) => input.sub(magnitude),
    ),
    mul: new UpgradeCostOperation(
        (input, magnitude) => input.mul(magnitude),
        (input, magnitude) => input.div(magnitude),
    ),
    pow: new UpgradeCostOperation(
        (input, magnitude) => input.pow(magnitude),
        (input, magnitude) => input.pow(magnitude.reciprocal()),
    ),
} as const satisfies Record<string, UpgradeCostOperation>;

class UpgradeCostBuilder {}
