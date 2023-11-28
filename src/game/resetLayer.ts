import type { game } from "./game";
import type { gameCurrency } from "./game";

class gameReset {
    public currenciesToReset: gameCurrency[];
    public extender?: gameReset;

    constructor (currenciesToReset: gameCurrency[], extender?: gameReset) {
        this.currenciesToReset = currenciesToReset;
        this.extender = extender;
    }

    public reset (): void {
        this.currenciesToReset.forEach((currency) => {
            currency.static.reset();
        });

        if (this.extender) {
            this.extender.reset();
        }
    }
}

export { gameReset };