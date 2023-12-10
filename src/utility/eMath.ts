import { EString } from "./eString";

/**
 * A collection of math-related utility functions and classes.
 */
const eMath = {
    getFast: function (object: any, id: string): object | null { // search by convert to string, fast but omits document and class data
        object = JSON.stringify(object);
        const length = id.toString().replace(/\\/g, "").length;
        const searchIndex = object.search(id);
        let output = "";
        let offset = length + 2;
        let unclosedQdb = 0; // ""
        let unclosedQsb = 0; // ''
        let unclosedQib = 0; // ``
        let unclosedB = 0; // []
        let unclosedCB = 0; // {}

        /**
         *
         */
        function check () {
            const read = object[searchIndex + offset];
            if (object[searchIndex + offset - 1] != "\\") {
                switch (read) {
                case "\"":
                    if (unclosedQdb == 0) {
                        unclosedQdb = 1;
                    } else {
                        unclosedQdb = 0;
                    }
                    break;
                case "'":
                    if (unclosedQsb == 0) {
                        unclosedQsb = 1;
                    } else {
                        unclosedQsb = 0;
                    }
                    break;
                case "`":
                    if (unclosedQib == 0) {
                        unclosedQib = 1;
                    } else {
                        unclosedQib = 0;
                    }
                    break;

                case "[":
                    unclosedB++;
                    break;
                case "]":
                    unclosedB--;
                    break;
                case "{":
                    unclosedCB++;
                    break;
                case "}":
                    unclosedCB--;
                    break;
                }
            }
            output += read;
            offset++;
        }
        check();
        while (unclosedQdb + unclosedQsb + unclosedQib + unclosedB + unclosedCB != 0) {
            check();
        }
        return JSON.parse(output);
    },
    get: function (object: any, id: string): object | null { // recursive search
        try {
            for (let i = 0; i < Object.keys(object).length; i++) {
                if (Object.keys(object)[i] == "sign") break;
                if (Object.keys(object)[i] == id) {
                    return object[Object.keys(object)[i]];
                } else if (typeof object[Object.keys(object)[i]] == "object") {
                    const output: object | null = this.get(object[Object.keys(object)[i]], id);
                    if (output != null) return output;
                } else {
                    continue;
                }
            }
            return null;
        } catch {
            return null;
        }
    },
    randomNumber: (min: number, max: number, round?: boolean): number => !(round != undefined && !round) ? Math.round((Math.random() * (max > min ? max - min : min - max)) + (max > min ? min : max)) : (Math.random() * (max > min ? max - min : min - max)) + (max > min ? min : max), // rounds by default, can disable

    /**
     * @param times
     * @param type
     * @deprecated dont ever use this
     */
    randomString64: (times: number, type: boolean) => {
        let output = (Math.random() * 1232311).toString();
        for (let i = 0; i < times; i++) {
            output = btoa(output) + btoa(btoa(Math.random().toString()));
        }
        return type ? output.length : output;
    },
    randomString: (length: number) => new EString("!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~").random(length).toString(),
};

export { eMath };