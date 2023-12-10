class EObject extends Object {
    constructor (value?: object) {
        super(value);
    }
    public static getFast (object: any, id: string): any { // search by convert to string, fast but omits document and class data
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
    };
    public getFast (this: any, id: string) { return EObject.getFast(this, id); };

    public static get (object: any, id: string): any { // recursive search
        try {
            for (let i = 0; i < Object.keys(object).length; i++) {
                if (Object.keys(object)[i] == "sign") break;
                if (Object.keys(object)[i] == id) {
                    return object[Object.keys(object)[i]];
                } else if (typeof object[Object.keys(object)[i]] == "object") {
                    const output = EObject.get(object[Object.keys(object)[i]], id);
                    if (output != null) return output;
                } else {
                    continue;
                }
            }
            return null;
        } catch {
            return null;
        }
    }
    public get (this: any, id: string) { return EObject.get(this, id); }
}

export { EObject };