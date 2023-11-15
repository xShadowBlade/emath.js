import type { gameCurrency } from "./game";
declare class gameReset {
    currenciesToReset: gameCurrency[];
    extender?: gameReset;
    constructor(currenciesToReset: gameCurrency[], extender?: gameReset);
}
export { gameReset };
