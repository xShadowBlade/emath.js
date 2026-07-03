import { inverseFunctionApprox, Decimal } from "emath.js";
import { run, bench, boxplot, summary } from "mitata";

bench("Decimal Creation (control)", () => new Decimal(1));

const x = new Decimal(1);

bench("Decimal normalize", () => x.normalize());
bench("instanceof Decimal check", () => x instanceof Decimal);
// bench("typeof check", () => typeof x === "object");

await run();
