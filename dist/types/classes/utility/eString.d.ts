declare class EString extends String {
    constructor(value?: string);
    forEach: (this: String, callbackfn: (value: string) => void) => void;
    forEachAdvanced: (this: EString, callbackfn: (char: {
        value: string;
        index: number;
    }) => void, start: number, end: number) => void;
    toNumber: (this: EString) => number;
    toArray: (this: EString) => string[];
    before: (this: EString, index: number) => string;
    after: (this: EString, index: number) => string;
    customSplit: (this: EString, index: number) => string[];
    random: (this: EString, qty: number) => string;
}
export { EString };
