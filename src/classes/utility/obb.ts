interface obbInit {
	name: string,
	value: any,
}

/**
 * @deprecated dont ever use this
 */
class obb {
	// eslint-disable-next-line no-undef
	[key: string]: any;
	constructor (array: obbInit[], methods: obbInit[]) { // syntax ex. {name: "a", value: {boost: ""}}, {}
	    for (const x of array) {
	        // console.log(x); debug

	        if (!x["name"] || !x["value"]) {break;}
	        this[x["name"]] = x["value"];
	        // /console.log(x, x["name"], x["value"]); debug
	        if (methods != undefined) {
	            for (const y of methods) {
	                if (!y["name"] || !y["value"]) {break;}
	                // console.log([y, y["name"], y["value"]]); debug
	                if (!this[x["name"]][y["name"]]) this[x["name"]][y["name"]] = y["value"];
	                // delete(this[y["name"]]["name"]);
	                // delete(this[y["name"]]["value"]);
	            }
	        }
	        delete (this[x["name"]]["name"]);
	        delete (this[x["name"]]["value"]);
	    }

	};
}
export { obb };