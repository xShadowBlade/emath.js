import type { gameCurrency } from "./game";
declare class gameReset {
    currenciesToReset: gameCurrency[];
    extender?: gameReset;
    constructor(currenciesToReset: gameCurrency[], extender?: gameReset);
    reset(): void;
}
export { gameReset };
