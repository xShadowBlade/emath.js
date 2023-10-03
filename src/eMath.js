/* eslint-disable */

const Decimal = require("break_eternity.js");
const DecimalClone = Decimal;

const eMath = {
    decimalFunctions: [
    {   
        name: "random",
        value: (min, max, qty, round) => {
            min = E(min);
            max = E(max);
            if (qty) {
                let out = [];
                for (i = 0; i < qty; i++) {
                    let output = E();
                    output = output.plus(max > min ? min : max).plus(max > min ? (max.minus(min).times(Math.random())) : (min.minus(max).times(Math.random())));
                    output = !(round != undefined && !round) ? output.round() : output;
                    out.push(output);
                }
                return out;
            } else {
                let output = E();
                output = output.plus(max > min ? min : max).plus(max > min ? (max.minus(min).times(Math.random())) : (min.minus(max).times(Math.random())));
                output = !(round != undefined && !round) ? output.round() : output;
                return output;
            }
        }
    },
    {   
        name: "mean",
        value: (array) => {
            let sum = new DecimalClone();
            let total = 0;
            for (let x of array) {
                total++;
                sum = sum.plus(x);
            }
            return(sum.divide(total));
        }, 
    },
    {
        name: "median", //bugs
        value: (array, sort = DecimalClone.sort, mean = DecimalClone.mean) => !array.length % 2 ? sort(array)[Math.floor(array.length / 2)] : mean([sort(array)[array.length], sort(array)[array.length - 1]])
    },
    {
        name: "mode", //also bugs
        value: (array) => {
            const stor = [{value: E(Infinity), frequency: 0}];
            let stor2 = [];
            let output = [];
            for (let x of array) { //add all values of array into storage
                x = E(x);
                for (let y of stor) {
                    console.log(y.value, x)
                    if (y.value.neq(x)) {
                        stor.push({
                            value: x,
                            frequency: 1,
                        });
                        break;
                    } else {y.frequency++; break}
                }
            }
            console.log(stor) //debug
            for (let x of stor) {stor2.push(x.frequency);} //make frequency array
            console.log(stor2) //debug
            stor2 = eMath.decimal.sort(stor2)[stor2.length - 1]; //sort frequency array
            console.log(stor) //debug
            for (let x of stor) {
                console.log(x)
                if (x.frequency == stor2) {
                    output.push(x.value);
                }
            }
            return output;
        }
    },
    {
        name: "sort", //default sort
        value: (array) => eMath.decimal.qtSort(array)
    },
    {
        name: "bbSort", //bubble sort
        value: (array) => {
            for(let i = 0; i < array.length; i++){
    
                // Last i elements are already in place 
                for(let j = 0; j < ( array.length - i -1 ); j++){
                   
                    // Checking if the item at present iteration
                    // is greater than the next iteration
                    if(E(array[j]).gt(E(array[j+1]))){
                        
                        // If the condition is true then swap them
                        let temp = array[j];
                        array[j] = array[j + 1];
                        array[j+1] = temp;
                    }
                }
            }
            return array;
        }
    },
    {
        name: "qtSort", //quick sort lr ptr
        value: (array) => {
            if (array.length < 2) {
              return array;
            }
            let pivot = E(array[Math.floor(Math.random() * array.length)]);
            let left = [];
            let right = [];
            let equal = [];
          
            for (let val of array) {
                val = E(val);
                if (val.lt(pivot)) {
                    left.push(val);
                } else if (val.gt(pivot)) {
                    right.push(val);
                } else {
                    equal.push(val);
                }
            }
            return [
              ...eMath.decimal.qtSort(left),
              ...equal,
              ...eMath.decimal.qtSort(right)
            ];
          }
    },
    {
        name: "smoothDamp",
        /**
         * Smoothly interpolates between the current value and the target value over time
         * using a smoothing factor and deltaTime.
         *
         * @param {E} current - The current value to interpolate from.
         * @param {E} target - The target value to interpolate towards.
         * @param {E} smoothing - The smoothing factor controlling the interpolation speed.
         *                           A higher value results in slower interpolation.
         * @param {E} deltaTime - The time elapsed since the last frame in seconds.
         * @returns {E} - The interpolated value between `current` and `target`.
         */
        value: (current, target, smoothing, deltaTime) => current.add(target.minus(current).times(smoothing).times(deltaTime)),
    }
    ],
}
{ // String Prototypes
String.prototype.forEach = function(callbackfn) {
    for(i = 0; i < this.length; i++) {
        callbackfn(this[i]);
    }
}
String.prototype.forEachAdvanced = function(callbackfn, start, end) {
    for(i = (start < 0 ? 0 : start); i < (end > this.length ? this.length : (end < start ? this.length: end)); i++) {
        callbackfn({
            value: this[i],
            index: i,
        });
    }
}
String.prototype.toNumber = function() {
    let output = "";
    for(i = 0; i < this.length; i++) {
        output += this.charCodeAt(i).toString();
    }
    return output;
}
String.prototype.toArray = function() {
    let output = [];
    this.forEach(function(char) {
        output.push(char);
    });
    return output;
}
String.prototype.before = function(index) {
    let output = "";
    this.forEachAdvanced(function(char) {
        output += char.value;
    }, 0, index);
    return output;
}
String.prototype.after = function(index) {
    let output = "";
    this.forEachAdvanced(function(char) {
        output += char.value;
    }, index, -1);
    return output;
}
String.prototype.customSplit = function(index) {
    let output = [];
    output.push(this.before(index));
    output.push(this.after(index));
    return output;
}
String.prototype.random = function(qty) {
    const random = (min, max, round) => !(round != undefined && !round) ? Math.round((Math.random() *  (max > min ? max - min : min - max)) + (max > min ? min: max)): (Math.random() *  (max > min ? max - min : min - max)) + (max > min ? min: max);
    let output = "";
    if(qty > 0){for (i = 0; i < qty; i++) {
        output += this.charAt(random(0, this.length));
    }} else {output = this.charAt(random(0, this.length))}
    return output;
}
}
// {
Array.prototype.random = function(qty) {
    const random = (min, max, round) => !(round != undefined && !round) ? Math.round((Math.random() *  (max > min ? max - min : min - max)) + (max > min ? min: max)): (Math.random() *  (max > min ? max - min : min - max)) + (max > min ? min: max);
    let output = "";
    if(qty > 0){for (i = 0; i < qty; i++) {
        output += this[random(0, this.length)];
    }} else {output = this[random(0, this.length)]}
    return output;
}
eMath.getFast = function(object, id) { // search by convert to string, fast but omits document and class data
    object = JSON.stringify(object);
    const length = id.toString().replace(/\\/g, "").length;
    const searchIndex = object.search(id);
    let output = "";
    let offset = length + 2
    let unclosedQdb = 0; // ""
    let unclosedQsb = 0; // ''
    let unclosedQib = 0; // ``
    let unclosedB = 0; // []
    let unclosedCB = 0; // {}

    function check() {
        const read = object[searchIndex + offset];
        if (object[searchIndex + offset - 1] != "\\") {
            switch(read) {
                case "\"":
                    if (unclosedQdb == 0) { 
                        unclosedQdb = 1;
                    } else {
                        unclosedQdb = 0;
                    }
                break;
                case "\'":
                    if (unclosedQsb == 0) { 
                        unclosedQsb = 1;
                    } else {
                        unclosedQsb = 0;
                    }
                break;
                case "\`":
                    if (unclosedQib == 0) { 
                        unclosedQib = 1;
                    } else {
                        unclosedQib = 0;
                    }
                break;

                case "\[":
                    unclosedB++;
                break;
                case "\]":
                    unclosedB--;
                break;
                case "\{":
                    unclosedCB++;
                break;
                case "\}":
                    unclosedCB--;
                break;
            }
        }
        output += read;
        offset++;
    }
    check();
    while (unclosedQdb + unclosedQsb + unclosedQib + unclosedB + unclosedCB != 0) {
        check()
    }
    return JSON.parse(output);
};
// Object.prototype.getFast = function(id) { return Object.getF(this, id) };

eMath.get = function (object, id) { // recursive search
    try {
        for (let i = 0; i < Object.keys(object).length; i++) {
            if (Object.keys(object)[i] == "sign") break;
            if (Object.keys(object)[i] == id) {
                return object[Object.keys(object)[i]];
            } else if (typeof object[Object.keys(object)[i]] == "object") {
                let output = Object.get(object[Object.keys(object)[i]], id);
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
// Object.prototype.get = function (id) { return Object.get(this, id) }
// //Types
// String.prototype.isString = true;
// DecimalClone.prototype.isDecimal = true;
// Object.prototype.isObject = true;
// Array.prototype.isArray = true;
// Array.prototype.isObject = false; //this because all arrays are objects but not all objects are arrays for some reason
// }
for (let x of eMath.decimalFunctions) {
    DecimalClone[x["name"]] = x["value"];
}
delete eMath.decimalFunctions;
function E(x){return new DecimalClone(x)};

const TS = x => new Date(x != undefined ? x : new Date());

const EINF = DecimalClone.dInf

// Math.lerp = function (value1, value2, amount) {
// 	amount = amount < 0 ? 0 : amount;
// 	amount = amount > 1 ? 1 : amount;
// 	return value1 + (value2 - value1) * amount;
// };

DecimalClone.prototype.clone = function() {
    return this;
}

DecimalClone.prototype.modular=DecimalClone.prototype.mod = function (other) {
    other=E(other);
    if (other.eq(0)) return E(0);
    if (this.sign*other.sign==-1) return this.abs().mod(other.abs()).neg();
    if (this.sign==-1) return this.abs().mod(other.abs());
    return this.sub(this.div(other).floor().mul(other));
};

/**
 * Applies a soft cap to a DecimalClone value using a specified soft cap function.
 *
 * @param {DecimalClone} start - The value at which the soft cap starts.
 * @param {number} power - The power or factor used in the soft cap calculation.
 * @param {string} mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
 *                       or "exp" for exponential soft cap.
 * @returns {DecimalClone} - The DecimalClone value after applying the soft cap.
 */
DecimalClone.prototype.softcap = function (start, power, mode) {
    var x = this.clone()
    if (x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start)
        if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
        if ([2, "exp"].includes(mode)) x = expMult(x.div(start), power).mul(start)
    }
    return x
}
/**
 * Scales a currency value using a specified scaling function.
 *
 * @param {DecimalClone} x - The value of the currency to be scaled.
 * @param {DecimalClone} s - The value at which scaling starts.
 * @param {DecimalClone} p - The scaling factor.
 * @param {string} mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
 * @param {boolean} [rev=false] - Whether to reverse the scaling operation (unscaling).
 * @returns {DecimalClone} - The scaled currency value.
 */
function scale(x, s, p, mode, rev=false) {
    s = E(s)
    p = E(p)
    if (x.gte(s)) {
        if ([0, "pow"].includes(mode)) x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)))
        if ([1, "exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(s) : DecimalClone.pow(p,x.sub(s)).mul(s)
    }
    return x
}

DecimalClone.prototype.toRoman = function() {
    let num = this.clone();
    if (num.gte(5000)) return num;
    num = num.toNumber();

    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

DecimalClone.prototype.scale = function (s, p, mode, rev=false) {
    s = E(s)
    p = E(p)
    var x = this.clone()
    if (x.gte(s)) {
        if ([0, "pow"].includes(mode)) x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)))
        if ([1, "exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(s) : DecimalClone.pow(p,x.sub(s)).mul(s)
    }
    return x
}

const formats = (() => {
    const ST_NAMES = [
        null, [
            ["","U","D","T","Qa","Qt","Sx","Sp","Oc","No"],
            ["","Dc","Vg","Tg","Qag","Qtg","Sxg","Spg","Ocg","Nog"],
            ["","Ce","De","Te","Qae","Qte","Sxe","Spe","Oce","Noe"],
        ],[
            ["","Mi","Mc","Na","Pc","Fm","At","Zp","Yc","Xn"],
            ["","Me","Du","Tr","Te","Pe","He","Hp","Ot","En"],
            ["","c","Ic","TCn","TeC","PCn","HCn","HpC","OCn","ECn"],
            ["","Hc","DHe","THt","TeH","PHc","HHe","HpH","OHt","EHc"]
        ]
    ]
    
    const FORMATS = {
        omega: {
            config: {
                greek: "βζλψΣΘΨω",
                infinity: "Ω",
            },
            format(value) {
                const step = Decimal.floor(value.div(1000));
                const omegaAmount = Decimal.floor(step.div(this.config.greek.length));
                let lastLetter = this.config.greek[step.toNumber() % this.config.greek.length] + toSubscript(value.toNumber() % 1000);
                const beyondGreekArrayBounds = this.config.greek[step.toNumber() % this.config.greek.length] === undefined;
                if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
                lastLetter = "ω";
                }
                const omegaOrder = Decimal.log(value, 8000);
                if (omegaAmount.equals(0)) {
                return lastLetter;
                } else if (omegaAmount.gt(0) && omegaAmount.lte(3)) {
                const omegas = [];
                for (let i = 0; i < omegaAmount.toNumber(); i++) {
                    omegas.push("ω");
                }
                return `${omegas.join("^")}^${lastLetter}`;
                } else if (omegaAmount.gt(3) && omegaAmount.lt(10)) {
                return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
                } else if (omegaOrder < 3) {
                return `ω(${this.format(omegaAmount)})^${lastLetter}`;
                } else if (omegaOrder < 6) {
                return `ω(${this.format(omegaAmount)})`;
                }
                const val = Decimal.pow(8000, omegaOrder % 1);
                const orderStr = omegaOrder < 100
                ? Math.floor(omegaOrder).toFixed(0)
                : this.format(Decimal.floor(omegaOrder));
                return `ω[${orderStr}](${this.format(val)})`;
            },
        },
        omega_short: {
            config: {
                greek: "βζλψΣΘΨω",
                infinity: "Ω",
            },
            format(value) {
                const step = Decimal.floor(value.div(1000));
                const omegaAmount = Decimal.floor(step.div(this.config.greek.length));
                let lastLetter = this.config.greek[step.toNumber() % this.config.greek.length] + toSubscript(value.toNumber() % 1000);
                const beyondGreekArrayBounds = this.config.greek[step.toNumber() % this.config.greek.length] === undefined;
                if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
                lastLetter = "ω";
                }
                const omegaOrder = Decimal.log(value, 8000);
                if (omegaAmount.equals(0)) {
                return lastLetter;
                } else if (omegaAmount.gt(0) && omegaAmount.lte(2)) {
                const omegas = [];
                for (let i = 0; i < omegaAmount.toNumber(); i++) {
                    omegas.push("ω");
                }
                return `${omegas.join("^")}^${lastLetter}`;
                } else if (omegaAmount.gt(2) && omegaAmount.lt(10)) {
                return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
                }
                const val = Decimal.pow(8000, omegaOrder % 1);
                const orderStr = omegaOrder < 100
                ? Math.floor(omegaOrder).toFixed(0)
                : this.format(Decimal.floor(omegaOrder));
                return `ω[${orderStr}](${this.format(val)})`;
            }
        },
        elemental: {
          config: {
            element_lists: [["H"],
            ["He", "Li", "Be", "B", "C", "N", "O", "F"],
            ["Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl"],
            [
              "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe",
              "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br"
            ],
            [
              "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru",
              "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I"
            ],
            [
              "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm",
              "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm",
              "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir",
              "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At"
            ],
            [
              "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np",
              "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md",
              "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt",
              "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts"
            ],
            ["Og"]],
          },
          getOffset(group) {
            if (group == 1) return 1
            let n = Math.floor(group / 2)
            let r = 2 * n * (n + 1) * (2 * n + 1) / 3 - 2
            if (group % 2 == 1) r += 2 * Math.pow(n + 1, 2)
            return r
          },
          getAbbreviation(group, progress) {
            const length = this.abbreviationLength(group)
            const elemRel = Math.floor(length * progress)
      
            const elem = elemRel + this.getOffset(group)
      
            return elem > 118 ? this.beyondOg(elem) : this.config.element_lists[group - 1][elemRel]
          },
          beyondOg(x) {
            let log = Math.floor(Math.log10(x))
            let list = ["n", "u", "b", "t", "q", "p", "h", "s", "o", "e"]
            let r = ""
            for (var i = log; i >= 0; i--) {
              let n = Math.floor(x / Math.pow(10, i)) % 10
              if (r == "") r = list[n].toUpperCase()
              else r += list[n]
            }
            return r
          },
          abbreviationLength(group) {
            return group == 1 ? 1 : Math.pow(Math.floor(group / 2) + 1, 2) * 2
          },
          getAbbreviationAndValue(x) {
            const abbreviationListUnfloored = x.log(118).toNumber()
            const abbreviationListIndex = Math.floor(abbreviationListUnfloored) + 1
            const abbreviationLength = this.abbreviationLength(abbreviationListIndex)
            const abbreviationProgress = abbreviationListUnfloored - abbreviationListIndex + 1
            const abbreviationIndex = Math.floor(abbreviationProgress * abbreviationLength)
            const abbreviation = this.getAbbreviation(abbreviationListIndex, abbreviationProgress)
            const value = E(118).pow(abbreviationListIndex + abbreviationIndex / abbreviationLength - 1)
            return [abbreviation, value];
          },
          formatElementalPart(abbreviation, n) {
            if (n.eq(1)) {
              return abbreviation;
            }
            return `${n} ${abbreviation}`;
          },
          format(value,acc) {
            if (value.gt(E(118).pow(E(118).pow(E(118).pow(4))))) return "e"+this.format(value.log10(),acc)
      
            let log = value.log(118)
            let slog = log.log(118)
            let sslog = slog.log(118).toNumber()
            let max = Math.max(4 - sslog * 2, 1)
            const parts = [];
            while (log.gte(1) && parts.length < max) {
              const [abbreviation, value] = this.getAbbreviationAndValue(log)
              const n = log.div(value).floor()
              log = log.sub(n.mul(value))
              parts.unshift([abbreviation, n])
            }
            if (parts.length >= max) {
              return parts.map((x) => this.formatElementalPart(x[0], x[1])).join(" + ");
            }
            const formattedMantissa = E(118).pow(log).toFixed(parts.length === 1 ? 3 : acc);
            if (parts.length === 0) {
              return formattedMantissa;
            }
            if (parts.length === 1) {
              return `${formattedMantissa} × ${this.formatElementalPart(parts[0][0], parts[0][1])}`;
            }
            return `${formattedMantissa} × (${parts.map((x) => this.formatElementalPart(x[0], x[1])).join(" + ")})`;
          },
        },
        old_sc: {
          format(ex, acc) {
            ex = E(ex)
            let e = ex.log10().floor()
            if (e.lt(9)) {
                if (e.lt(3)) {
                    return ex.toFixed(acc)
                }
                return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            } else {
                if (ex.gte("eeee10")) {
                    let slog = ex.slog()
                    return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + this.format(slog.floor(), 0)
                }
                let m = ex.div(E(10).pow(e))
                return (e.log10().gte(9)?'':m.toFixed(4))+'e'+this.format(e,0)
            }
          }
        },
        eng: {
          format(ex, acc) {
            ex = E(ex)
            let e = ex.log10().floor()
            if (e.lt(9)) {
              if (e.lt(3)) {
                  return ex.toFixed(acc)
              }
              return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            } else {
              if (ex.gte("eeee10")) {
                let slog = ex.slog()
                return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + this.format(slog.floor(), 0)
              }
              let m = ex.div(E(1000).pow(e.div(3).floor()))
              return (e.log10().gte(9)?'':m.toFixed(E(4).sub(e.sub(e.div(3).floor().mul(3)))))+'e'+this.format(e.div(3).floor().mul(3),0)
            }
          },
        },
        mixed_sc: {
          format(ex, acc, max) {
            ex = E(ex)
            let e = ex.log10().floor()
            if (e.lt(303) && e.gte(max)) return format(ex,acc,max,"st")
            else return format(ex,acc,max,"sc")
          }
        },
        layer: {
          layers: ["infinity","eternity","reality","equality","affinity","celerity","identity","vitality","immunity","atrocity"],
          format(ex, acc, max) {
            ex = E(ex)
            let layer = ex.max(1).log10().max(1).log(INFINITY_NUM.log10()).floor()
            if (layer.lte(0)) return format(ex,acc,max,"sc")
            ex = E(10).pow(ex.max(1).log10().div(INFINITY_NUM.log10().pow(layer)).sub(layer.gte(1)?1:0))
            let meta = layer.div(10).floor()
            let layer_id = layer.toNumber()%10-1
            return format(ex,Math.max(4,acc),max,"sc") + " " + (meta.gte(1)?"meta"+(meta.gte(2)?"^"+format(meta,0,max,"sc"):"")+"-":"") + (isNaN(layer_id)?"nanity":this.layers[layer_id])
          },
        },
        standard: {
          tier1(x) {
            return ST_NAMES[1][0][x % 10] +
            ST_NAMES[1][1][Math.floor(x / 10) % 10] +
            ST_NAMES[1][2][Math.floor(x / 100)]
          },
          tier2(x) {
            let o = x % 10
            let t = Math.floor(x / 10) % 10
            let h = Math.floor(x / 100) % 10
      
            let r = ''
            if (x < 10) return ST_NAMES[2][0][x]
            if (t == 1 && o == 0) r += "Vec"
            else r += ST_NAMES[2][1][o] + ST_NAMES[2][2][t]
            r += ST_NAMES[2][3][h]
      
            return r
          },
        },
        inf: {
          format(ex, acc, max) {
            let meta = 0
            let inf = E(Number.MAX_VALUE)
            let symbols = ["", "∞", "Ω", "Ψ", "ʊ"]
            let symbols2 = ["", "", "m", "mm", "mmm"]
            while (ex.gte(inf)) {
              ex = ex.log(inf)
              meta++
            }
      
            if (meta == 0) return format(ex, acc, max, "sc")
            if (ex.gte(3)) return symbols2[meta] + symbols[meta] + "ω^"+format(ex.sub(1), acc, max, "sc")
            if (ex.gte(2)) return symbols2[meta] + "ω" + symbols[meta] + "-"+format(inf.pow(ex.sub(2)), acc, max, "sc")
            return symbols2[meta] + symbols[meta] + "-"+format(inf.pow(ex.sub(1)), acc, max, "sc")
          }
        },
    }
    
    
    const INFINITY_NUM = E(2).pow(1024);
    const SUBSCRIPT_NUMBERS = "₀₁₂₃₄₅₆₇₈₉";
    const SUPERSCRIPT_NUMBERS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
    
    function toSubscript(value) {
        return value.toFixed(0).split("")
          .map((x) => x === "-" ? "₋" : SUBSCRIPT_NUMBERS[parseInt(x, 10)])
          .join("");
    }
    
    function toSuperscript(value) {
        return value.toFixed(0).split("")
          .map((x) => x === "-" ? "₋" : SUPERSCRIPT_NUMBERS[parseInt(x, 10)])
          .join("");
    }
    function formatST(ex, acc=2, max=9, type="st") {return format(ex, acc, max, type)}
    function format(ex, acc=2, max=9, type="mixed_sc") {
        ex = E(ex)
        neg = ex.lt(0)?"-":""
        if (ex.mag == Infinity) return neg + 'Infinity'
        if (Number.isNaN(ex.mag)) return neg + 'NaN'
        if (ex.lt(0)) ex = ex.mul(-1)
        if (ex.eq(0)) return ex.toFixed(acc)
        let e = ex.log10().floor()
        switch (type) {
            case "sc":
                if (ex.log10().lt(Math.min(-acc,0)) && acc > 1) {
                    let e = ex.log10().ceil()
                    let m = ex.div(e.eq(-1)?E(0.1):E(10).pow(e))
                    let be = e.mul(-1).max(1).log10().gte(9)
                    return neg+(be?'':m.toFixed(2))+'e'+format(e, 0, max, "mixed_sc")
                } else if (e.lt(max)) {
                    let a = Math.max(Math.min(acc-e.toNumber(), acc), 0)
                    return neg+(a>0?ex.toFixed(a):ex.toFixed(a).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
                } else {
                    if (ex.gte("eeee10")) {
                        let slog = ex.slog()
                        return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(2)) + "F" + format(slog.floor(), 0)
                    }
                    let m = ex.div(E(10).pow(e))
                    let be = e.log10().gte(9)
                    return neg+(be?'':m.toFixed(2))+'e'+format(e, 0, max, "mixed_sc")
                }
            case "st":
                let e3 = ex.log(1e3).floor()
                if (e3.lt(1)) {
                  return neg+ex.toFixed(Math.max(Math.min(acc-e.toNumber(), acc), 0))
                } else {
                  let e3_mul = e3.mul(3)
                  let ee = e3.log10().floor()
                  if (ee.gte(3000)) return "e"+format(e, acc, max, "st")
    
                  let final = ""
                  if (e3.lt(4)) final = ["", "K", "M", "B"][Math.round(e3.toNumber())]
                  else {
                    let ee3 = Math.floor(e3.log(1e3).toNumber())
                    if (ee3 < 100) ee3 = Math.max(ee3 - 1, 0)
                    e3 = e3.sub(1).div(E(10).pow(ee3*3))
                    while (e3.gt(0)) {
                      let div1000 = e3.div(1e3).floor()
                      let mod1000 = e3.sub(div1000.mul(1e3)).floor().toNumber()
                      if (mod1000 > 0) {
                        if (mod1000 == 1 && !ee3) final = "U"
                        if (ee3) final = FORMATS.standard.tier2(ee3) + (final ? "-" + final : "")
                        if (mod1000 > 1) final = FORMATS.standard.tier1(mod1000) + final
                      }
                      e3 = div1000
                      ee3++
                    }
                  }
    
                  let m = ex.div(E(10).pow(e3_mul))
                  return neg+(ee.gte(10)?'':(m.toFixed(E(2).sub(e.sub(e3_mul)).add(1).toNumber()))+' ')+final
                }
            default:
                return neg+FORMATS[type].format(ex, acc, max)
        }
    }
    
    function formatGain(amt, gain) {
        let next = amt.add(gain)
        let rate
        let ooms = next.div(amt)
        if (ooms.gte(10) && amt.gte(1e100)) {
            ooms = ooms.log10().mul(20)
            rate = "(+"+format(ooms) + " OoMs/sec)"
        }
        else rate = "(+"+format(gain)+"/sec)"
        return rate
    }
    
    function formatTime(ex,acc=2,type="s") {
        ex = E(ex)
        if (ex.gte(86400)) return format(ex.div(86400).floor(),0,12,"sc")+":"+formatTime(ex.mod(86400),acc,'d')
        if (ex.gte(3600)||type=="d") return (ex.div(3600).gte(10)||type!="d"?"":"0")+format(ex.div(3600).floor(),0,12,"sc")+":"+formatTime(ex.mod(3600),acc,'h')
        if (ex.gte(60)||type=="h") return (ex.div(60).gte(10)||type!="h"?"":"0")+format(ex.div(60).floor(),0,12,"sc")+":"+formatTime(ex.mod(60),acc,'m')
        return (ex.gte(10)||type!="m" ?"":"0")+format(ex,acc,12,"sc")
    }
    
    function formatReduction(ex) { ex = E(ex); return format(E(1).sub(ex).mul(100))+"%" }
    
    function formatPercent(ex) { ex = E(ex); return format(ex.mul(100))+"%" }
    
    function formatMult(ex,acc=2) { ex = E(ex); return ex.gte(1)?"×"+ex.format(acc):"/"+ex.pow(-1).format(acc)}
    
    function expMult(a,b,base=10) { return Decimal.gte(a,10) ? Decimal.pow(base,Decimal.log(a,base).pow(b)) : E(a) }

    function metric (num, type) {
		num = E(num);
		const abb = [
			{
				name: "K",
				altName: "Kilo",
				value: E("1000"),
			},
			{
				name: "M",
				altName: "Mega",
				value: E("1e6"),
			},
			{
				name: "G",
				altName: "Giga",
				value: E("1e9"),
			},
			{
				name: "T",
				altName: "Tera",
				value: E("1e12"),
			},
			{
				name: "P",
				altName: "Peta",
				value: E("1e15"),
			},
			{
				name: "E",
				altName: "Exa",
				value: E("1e18"),
			},
			{
				name: "Z",
				altName: "Zetta",
				value: E("1e21"),
			},
			{
				name: "Y",
				altName: "Yotta",
				value: E("1e24"),
			},
			{
				name: "R",
				altName: "Ronna",
				value: E("1e27"),
			},
			{
				name: "Q",
				altName: "Quetta",
				value: E("1e30"),
			},
		];
		for (let i = 0; i < abb.length; i++) {
			if (num.greaterThanOrEqualTo(abb[i]["value"])) {
				if (i == abb.length - 1) {
					switch (type) {
					case 1:
						return abb[i]["name"];
						break;
					case 2:
						return `${num.divide(abb[i]["value"]).format()}`;
						break;
					case 3:
						return abb[i]["altName"];
						break;
					case 0:
					default:
						return `${num.divide(abb[i]["value"]).format()} ${abb[i]["name"]}`;
						break;
					}
				}
				continue;
			} else if (i == 0) {
				switch (type) {
				case 1:
					return "";
					break;
				case 2:
				case 0:
				default:
					return num.format();
					break;
				}
			} else {
				switch (type) {
				case 1:
					return abb[i - 1]["name"];
					break;
				case 2:
					return `${num.divide(abb[i - 1]["value"]).format()}`;
					break;
				case 3:
					return abb[i - 1]["altName"];
					break;
				case 0:
				default:
					return `${num.divide(abb[i - 1]["value"]).format()} ${abb[i - 1]["name"]}`;
					break;
				}
			}
		}
	}
	function ev (num, c2 = false) {
		return `${this.metric(num, 2)} ${this.metric(num, 1)}eV${c2 ? "/c^2" : ""}`;
	}
    
    return {...FORMATS, ...{
      toSubscript,
      toSuperscript,
      formatST,
      format,
      formatGain,
      formatTime,
      formatReduction,
      formatPercent,
      formatMult,
      expMult,
      metric,
      ev,
    }};
})();

const { format, formatGain } = formats;

DecimalClone.prototype.format = function (acc=2, max=9) { return format(this.clone(), acc, max) }

DecimalClone.prototype.formatST = function (acc=2, max=9, type="st") { return format(this.clone(), acc, max, type) }

DecimalClone.prototype.formatGain = function (gain, mass=false) { return formatGain(this.clone(), gain, mass) }

Object.getOwnPropertyNames(DecimalClone).forEach((value) => {
    E[value] = DecimalClone[value];
});

module.exports = { eMath, E, TS, formats };