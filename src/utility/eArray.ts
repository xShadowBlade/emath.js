import { eMath } from "./eMath";

class EArray extends Array {
    constructor (value?: any) {
        super(value);
    }
    public random (qty: number) {
        let output = "";
        if (qty > 0) {for (let i = 0; i < qty; i++) {
            output += this[eMath.randomNumber(0, this.length)];
        }} else {output = this[eMath.randomNumber(0, this.length)];}
        return output;
    }
}

export { EArray };