/* eslint-disable no-unused-vars */
class EString extends String {
    constructor (value?: string) {
        super(value);
    }
    public forEach = function (this: string, callbackfn: (value: string) => void): void {
        for (let i = 0; i < this.length; i++) {
            callbackfn(this[i]);
        }
    };
    public forEachAdvanced = function (this: EString, callbackfn: (char: { value: string, index: number }) => void, start: number, end: number): void {
        for (let i = (start < 0 ? 0 : start); i < (end > this.length ? this.length : (end < start ? this.length : end)); i++) {
            callbackfn({
                value: this[i],
                index: i,
            });
        }
    };
    public toNumber = function (this: EString): number {
        let output = "";
        for (let i = 0; i < this.length; i++) {
            output += this.charCodeAt(i).toString();
        }
        return parseInt(output);
    };
    public toArray = function (this: EString): string[] {
        const output = [];
        for (let i = 0; i < this.length; i++) {
            output.push(this[i]);
        }
        return output;
    };
    public before = function (this: EString, index: number): string {
        let output = "";
        this.forEachAdvanced(function (char) {
            output += char.value;
        }, 0, index);
        return output;
    };
    public after = function (this: EString, index: number): string {
        let output = "";
        this.forEachAdvanced(function (char) {
            output += char.value;
        }, index, -1);
        return output;
    };
    public customSplit = function (this: EString, index: number): string[] {
        const output = [];
        output.push(this.before(index));
        output.push(this.after(index));
        return output;
    };
    public random = function (this: EString, qty: number): string {
        const random = (min: number, max: number, round?: boolean) => !(round != undefined && !round) ? Math.round((Math.random() * (max > min ? max - min : min - max)) + (max > min ? min : max)) : (Math.random() * (max > min ? max - min : min - max)) + (max > min ? min : max);
        let output = "";
        if (qty > 0) {for (let i = 0; i < qty; i++) {
            output += this.charAt(random(0, this.length));
        }} else {output = this.charAt(random(0, this.length));}
        return output;
    };
};

export { EString };