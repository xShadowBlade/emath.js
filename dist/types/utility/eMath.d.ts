/**
 * A collection of math-related utility functions and classes.
 */
declare const eMath: {
    getFast: (object: any, id: string) => object | null;
    get: (object: any, id: string) => object | null;
    randomNumber: (min: number, max: number, round?: boolean) => number;
    /**
     * @param times
     * @param type
     * @deprecated dont ever use this
     */
    randomString64: (times: number, type: boolean) => string | number;
    randomString: (length: number) => string;
};
export { eMath };
