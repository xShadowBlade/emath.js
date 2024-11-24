import 'reflect-metadata';
import { Expose, Exclude, Type } from 'class-transformer';

let eMathMetadata = {
    version: (()=>{
        try {
            return "9.6.0";
        } catch (error) {
            return "9.5.0";
        }
    })(),
    "break_eternity.js": {
        version: "2.1.0"
    }
};

class LRUCache {
    get size() {
        return this.map.size;
    }
    get(key) {
        let node = this.map.get(key);
        if (void 0 !== node) return node !== this.first && (node === this.last ? (this.last = node.prev, this.last.next = void 0) : (node.prev.next = node.next, node.next.prev = node.prev), node.next = this.first, this.first.prev = node, this.first = node), node.value;
    }
    set(key, value) {
        if (this.maxSize < 1) return;
        if (this.map.has(key)) throw Error("Cannot update existing keys in the cache");
        let node = new ListNode(key, value);
        for(void 0 === this.first ? (this.first = node, this.last = node) : (node.next = this.first, this.first.prev = node, this.first = node), this.map.set(key, node); this.map.size > this.maxSize;){
            let last = this.last;
            this.map.delete(last.key), this.last = last.prev, this.last.next = void 0;
        }
    }
    constructor(maxSize){
        this.map = new Map(), this.first = void 0, this.last = void 0, this.maxSize = maxSize;
    }
}
class ListNode {
    constructor(key, value){
        this.next = void 0, this.prev = void 0, this.key = key, this.value = value;
    }
}

let ST_NAMES = [
    [
        [
            "",
            "U",
            "D",
            "T",
            "Qa",
            "Qt",
            "Sx",
            "Sp",
            "Oc",
            "No"
        ],
        [
            "",
            "Dc",
            "Vg",
            "Tg",
            "Qag",
            "Qtg",
            "Sxg",
            "Spg",
            "Ocg",
            "Nog"
        ],
        [
            "",
            "Ce",
            "De",
            "Te",
            "Qae",
            "Qte",
            "Sxe",
            "Spe",
            "Oce",
            "Noe"
        ]
    ],
    [
        [
            "",
            "Mi",
            "Mc",
            "Na",
            "Pc",
            "Fm",
            "At",
            "Zp",
            "Yc",
            "Xn"
        ],
        [
            "",
            "Me",
            "Du",
            "Tr",
            "Te",
            "Pe",
            "He",
            "Hp",
            "Ot",
            "En"
        ],
        [
            "",
            "c",
            "Ic",
            "TCn",
            "TeC",
            "PCn",
            "HCn",
            "HpC",
            "OCn",
            "ECn"
        ],
        [
            "",
            "Hc",
            "DHe",
            "THt",
            "TeH",
            "PHc",
            "HHe",
            "HpH",
            "OHt",
            "EHc"
        ]
    ]
], formatTypeList = [
    "st",
    "sc",
    "scientific",
    "omega",
    "omega_short",
    "elemental",
    "old_sc",
    "eng",
    "mixed_sc",
    "layer",
    "standard",
    "inf",
    "alphabet"
];
function decimalFormatGenerator(Decimal) {
    let FORMATS = {
        omega: {
            config: {
                greek: "βζλψΣΘΨω",
                infinity: "Ω"
            },
            format (value) {
                value = new Decimal(value);
                let step = Decimal.floor(value.div(1000)), omegaAmount = Decimal.floor(step.div(FORMATS.omega.config.greek.length)), lastLetter = FORMATS.omega.config.greek[step.toNumber() % FORMATS.omega.config.greek.length] + toSubscript(value.toNumber() % 1000);
                (void 0 === FORMATS.omega.config.greek[step.toNumber() % FORMATS.omega.config.greek.length] || step.toNumber() > Number.MAX_SAFE_INTEGER) && (lastLetter = "ω");
                let omegaOrder = Decimal.log(value, 8000).toNumber();
                if (omegaAmount.equals(0)) return lastLetter;
                if (omegaAmount.gt(0) && omegaAmount.lte(3)) {
                    let omegas = [];
                    for(let i = 0; i < omegaAmount.toNumber(); i++)omegas.push("ω");
                    return `${omegas.join("^")}^${lastLetter}`;
                }
                if (omegaAmount.gt(3) && omegaAmount.lt(10)) return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
                if (omegaOrder < 3) return `ω(${FORMATS.omega.format(omegaAmount)})^${lastLetter}`;
                if (omegaOrder < 6) return `ω(${FORMATS.omega.format(omegaAmount)})`;
                let val = Decimal.pow(8000, omegaOrder % 1), orderStr = omegaOrder < 100 ? Math.floor(omegaOrder).toFixed(0) : FORMATS.omega.format(Decimal.floor(omegaOrder));
                return `ω[${orderStr}](${FORMATS.omega.format(val)})`;
            }
        },
        omega_short: {
            config: {
                greek: "βζλψΣΘΨω",
                infinity: "Ω"
            },
            format (value) {
                value = new Decimal(value);
                let step = Decimal.floor(value.div(1000)), omegaAmount = Decimal.floor(step.div(FORMATS.omega_short.config.greek.length)), lastLetter = FORMATS.omega_short.config.greek[step.toNumber() % FORMATS.omega_short.config.greek.length] + toSubscript(value.toNumber() % 1000);
                (void 0 === FORMATS.omega_short.config.greek[step.toNumber() % FORMATS.omega_short.config.greek.length] || step.toNumber() > Number.MAX_SAFE_INTEGER) && (lastLetter = "ω");
                let omegaOrder = Decimal.log(value, 8000).toNumber();
                if (omegaAmount.equals(0)) return lastLetter;
                if (omegaAmount.gt(0) && omegaAmount.lte(2)) {
                    let omegas = [];
                    for(let i = 0; i < omegaAmount.toNumber(); i++)omegas.push("ω");
                    return `${omegas.join("^")}^${lastLetter}`;
                }
                if (omegaAmount.gt(2) && omegaAmount.lt(10)) return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
                let val = Decimal.pow(8000, omegaOrder % 1), orderStr = omegaOrder < 100 ? Math.floor(omegaOrder).toFixed(0) : FORMATS.omega_short.format(Decimal.floor(omegaOrder));
                return `ω[${orderStr}](${FORMATS.omega_short.format(val)})`;
            }
        },
        elemental: {
            config: {
                element_lists: [
                    [
                        "H"
                    ],
                    [
                        "He",
                        "Li",
                        "Be",
                        "B",
                        "C",
                        "N",
                        "O",
                        "F"
                    ],
                    [
                        "Ne",
                        "Na",
                        "Mg",
                        "Al",
                        "Si",
                        "P",
                        "S",
                        "Cl"
                    ],
                    [
                        "Ar",
                        "K",
                        "Ca",
                        "Sc",
                        "Ti",
                        "V",
                        "Cr",
                        "Mn",
                        "Fe",
                        "Co",
                        "Ni",
                        "Cu",
                        "Zn",
                        "Ga",
                        "Ge",
                        "As",
                        "Se",
                        "Br"
                    ],
                    [
                        "Kr",
                        "Rb",
                        "Sr",
                        "Y",
                        "Zr",
                        "Nb",
                        "Mo",
                        "Tc",
                        "Ru",
                        "Rh",
                        "Pd",
                        "Ag",
                        "Cd",
                        "In",
                        "Sn",
                        "Sb",
                        "Te",
                        "I"
                    ],
                    [
                        "Xe",
                        "Cs",
                        "Ba",
                        "La",
                        "Ce",
                        "Pr",
                        "Nd",
                        "Pm",
                        "Sm",
                        "Eu",
                        "Gd",
                        "Tb",
                        "Dy",
                        "Ho",
                        "Er",
                        "Tm",
                        "Yb",
                        "Lu",
                        "Hf",
                        "Ta",
                        "W",
                        "Re",
                        "Os",
                        "Ir",
                        "Pt",
                        "Au",
                        "Hg",
                        "Tl",
                        "Pb",
                        "Bi",
                        "Po",
                        "At"
                    ],
                    [
                        "Rn",
                        "Fr",
                        "Ra",
                        "Ac",
                        "Th",
                        "Pa",
                        "U",
                        "Np",
                        "Pu",
                        "Am",
                        "Cm",
                        "Bk",
                        "Cf",
                        "Es",
                        "Fm",
                        "Md",
                        "No",
                        "Lr",
                        "Rf",
                        "Db",
                        "Sg",
                        "Bh",
                        "Hs",
                        "Mt",
                        "Ds",
                        "Rg",
                        "Cn",
                        "Nh",
                        "Fl",
                        "Mc",
                        "Lv",
                        "Ts"
                    ],
                    [
                        "Og"
                    ]
                ]
            },
            getOffset (group) {
                if (1 == group) return 1;
                let n = Math.floor(group / 2), r = 2 * n * (n + 1) * (2 * n + 1) / 3 - 2;
                return group % 2 == 1 && (r += 2 * Math.pow(n + 1, 2)), r;
            },
            getAbbreviation (group, progress) {
                let elemRel = Math.floor(FORMATS.elemental.abbreviationLength(group) * progress), elem = elemRel + FORMATS.elemental.getOffset(group);
                return elem > 118 ? FORMATS.elemental.beyondOg(elem) : FORMATS.elemental.config.element_lists[group - 1][elemRel];
            },
            beyondOg (x) {
                let log = Math.floor(Math.log10(x)), list = [
                    "n",
                    "u",
                    "b",
                    "t",
                    "q",
                    "p",
                    "h",
                    "s",
                    "o",
                    "e"
                ], r = "";
                for(let i = log; i >= 0; i--){
                    let n = Math.floor(x / Math.pow(10, i)) % 10;
                    "" == r ? r = list[n].toUpperCase() : r += list[n];
                }
                return r;
            },
            abbreviationLength: (group)=>1 == group ? 1 : 2 * Math.pow(Math.floor(group / 2) + 1, 2),
            getAbbreviationAndValue (x) {
                let abbreviationListUnfloored = x.log(118).toNumber(), abbreviationListIndex = Math.floor(abbreviationListUnfloored) + 1, abbreviationLength = FORMATS.elemental.abbreviationLength(abbreviationListIndex), abbreviationProgress = abbreviationListUnfloored - abbreviationListIndex + 1, abbreviationIndex = Math.floor(abbreviationProgress * abbreviationLength);
                return [
                    FORMATS.elemental.getAbbreviation(abbreviationListIndex, abbreviationProgress),
                    new Decimal(118).pow(abbreviationListIndex + abbreviationIndex / abbreviationLength - 1)
                ];
            },
            formatElementalPart: (abbreviation, n)=>n.eq(1) ? abbreviation : `${n.toString()} ${abbreviation}`,
            format (value, acc = 2) {
                if (value.gt(new Decimal(118).pow(new Decimal(118).pow(new Decimal(118).pow(4))))) return "e" + FORMATS.elemental.format(value.log10(), acc);
                let log = value.log(118), max = Math.max(4 - 2 * log.log(118).log(118).toNumber(), 1), parts = [];
                for(; log.gte(1) && parts.length < max;){
                    let [abbreviation, value2] = FORMATS.elemental.getAbbreviationAndValue(log), n = log.div(value2).floor();
                    log = log.sub(n.mul(value2)), parts.unshift([
                        abbreviation,
                        n
                    ]);
                }
                if (parts.length >= max) return parts.map((x)=>FORMATS.elemental.formatElementalPart(x[0], x[1])).join(" + ");
                let formattedMantissa = new Decimal(118).pow(log).toFixed(1 === parts.length ? 3 : acc);
                return 0 === parts.length ? formattedMantissa : 1 === parts.length ? `${formattedMantissa} × ${FORMATS.elemental.formatElementalPart(parts[0][0], parts[0][1])}` : `${formattedMantissa} × (${parts.map((x)=>FORMATS.elemental.formatElementalPart(x[0], x[1])).join(" + ")})`;
            }
        },
        old_sc: {
            format (ex, acc) {
                let e = (ex = new Decimal(ex)).log10().floor();
                if (e.lt(9)) return e.lt(3) ? ex.toFixed(acc) : ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                {
                    if (ex.gte("eeee10")) {
                        let slog = ex.slog();
                        return (slog.gte(1e9) ? "" : Decimal.dTen.pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.old_sc.format(slog.floor(), 0);
                    }
                    let m = ex.div(Decimal.dTen.pow(e));
                    return (e.log10().gte(9) ? "" : m.toFixed(4)) + "e" + FORMATS.old_sc.format(e, 0);
                }
            }
        },
        eng: {
            format (ex, acc = 2) {
                let e = (ex = new Decimal(ex)).log10().floor();
                if (e.lt(9)) return e.lt(3) ? ex.toFixed(acc) : ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                {
                    if (ex.gte("eeee10")) {
                        let slog = ex.slog();
                        return (slog.gte(1e9) ? "" : Decimal.dTen.pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.eng.format(slog.floor(), 0);
                    }
                    let m = ex.div(new Decimal(1000).pow(e.div(3).floor()));
                    return (e.log10().gte(9) ? "" : m.toFixed(new Decimal(4).sub(e.sub(e.div(3).floor().mul(3))).toNumber())) + "e" + FORMATS.eng.format(e.div(3).floor().mul(3), 0);
                }
            }
        },
        mixed_sc: {
            format (ex, acc, max = 9) {
                let e = (ex = new Decimal(ex)).log10().floor();
                return e.lt(303) && e.gte(max) ? format(ex, acc, max, "st") : format(ex, acc, max, "sc");
            }
        },
        layer: {
            layers: [
                "infinity",
                "eternity",
                "reality",
                "equality",
                "affinity",
                "celerity",
                "identity",
                "vitality",
                "immunity",
                "atrocity"
            ],
            format (ex, acc = 2, max) {
                let layer = (ex = new Decimal(ex)).max(1).log10().max(1).log(INFINITY_NUM.log10()).floor();
                if (layer.lte(0)) return format(ex, acc, max, "sc");
                ex = Decimal.dTen.pow(ex.max(1).log10().div(INFINITY_NUM.log10().pow(layer)).sub(layer.gte(1) ? 1 : 0));
                let meta = layer.div(10).floor(), layer_id = layer.toNumber() % 10 - 1;
                return format(ex, Math.max(4, acc), max, "sc") + " " + (meta.gte(1) ? "meta" + (meta.gte(2) ? "^" + format(meta, 0, max, "sc") : "") + "-" : "") + (isNaN(layer_id) ? "nanity" : FORMATS.layer.layers[layer_id]);
            }
        },
        standard: {
            tier1: (x)=>ST_NAMES[0][0][x % 10] + ST_NAMES[0][1][Math.floor(x / 10) % 10] + ST_NAMES[0][2][Math.floor(x / 100)],
            tier2 (x) {
                let o = x % 10, t = Math.floor(x / 10) % 10, h = Math.floor(x / 100) % 10, r = "";
                return x < 10 ? ST_NAMES[1][0][x] : (1 == t && 0 == o ? r += "Vec" : r += ST_NAMES[1][1][o] + ST_NAMES[1][2][t], r += ST_NAMES[1][3][h]);
            }
        },
        inf: {
            format (ex, acc, max) {
                ex = new Decimal(ex);
                let meta = 0, inf = new Decimal(Number.MAX_VALUE), symbols = [
                    "",
                    "∞",
                    "Ω",
                    "Ψ",
                    "ʊ"
                ], symbols2 = [
                    "",
                    "",
                    "m",
                    "mm",
                    "mmm"
                ];
                for(; ex.gte(inf);)ex = ex.log(inf), meta++;
                return 0 == meta ? format(ex, acc, max, "sc") : ex.gte(3) ? symbols2[meta] + symbols[meta] + "ω^" + format(ex.sub(1), acc, max, "sc") : ex.gte(2) ? symbols2[meta] + "ω" + symbols[meta] + "-" + format(inf.pow(ex.sub(2)), acc, max, "sc") : symbols2[meta] + symbols[meta] + "-" + format(inf.pow(ex.sub(1)), acc, max, "sc");
            }
        },
        alphabet: {
            config: {
                alphabet: "abcdefghijklmnopqrstuvwxyz"
            },
            getAbbreviation (ex, start = new Decimal(1e15), startDouble = !1, abbStart = 9) {
                if (ex = new Decimal(ex), start = new Decimal(start).div(1e3), ex.lt(start.mul(1e3))) return "";
                let { alphabet } = FORMATS.alphabet.config, alphabetLength = alphabet.length, exponent = ex.log(1e3).sub(start.log(1e3)).floor(), numLetters = exponent.add(1).log(alphabetLength + 1).ceil(), letters = "", convertToLetters = (num, length)=>{
                    let remaining = num, out = "";
                    for(let i = 0; i < length.toNumber(); i++){
                        let letter = remaining.sub(1).mod(alphabetLength).toNumber();
                        if (letter < 0 || letter >= alphabetLength) return "ω";
                        out = alphabet[letter] + out, remaining = remaining.sub(1).div(alphabetLength).floor();
                    }
                    return out;
                };
                if (numLetters.lt(abbStart)) letters = convertToLetters(exponent, numLetters);
                else {
                    let trunc = numLetters.sub(abbStart).add(1), truncLetters = convertToLetters(exponent.div(Decimal.pow(alphabetLength + 1, trunc.sub(1))).floor(), new Decimal(abbStart));
                    letters = `${truncLetters}(${trunc.gt("1e9") ? trunc.format() : trunc.format(0)})`;
                }
                return letters;
            },
            format (ex, acc = 2, max = 9, type = "mixed_sc", start = new Decimal(1e15), startDouble = !1, abbStart) {
                if (ex = new Decimal(ex), start = new Decimal(start).div(1e3), ex.lt(start.mul(1e3))) return format(ex, acc, max, type);
                let letters = FORMATS.alphabet.getAbbreviation(ex, start, startDouble, abbStart), mantissa = ex.div(Decimal.pow(1e3, ex.log(1e3).floor())), isAbbreviation = letters.length > (abbStart ?? 9) + 2;
                return `${isAbbreviation ? "" : mantissa.toFixed(acc) + " "}${letters}`;
            }
        }
    }, INFINITY_NUM = Decimal.dTwo.pow(1024);
    function toSubscript(value) {
        return value.toFixed(0).split("").map((x)=>"-" === x ? "₋" : "₀₁₂₃₄₅₆₇₈₉"[parseInt(x, 10)]).join("");
    }
    function format(ex, acc = 2, max = 9, type = "mixed_sc") {
        let neg = (ex = new Decimal(ex)).lt(0) ? "-" : "";
        if (ex.mag == 1 / 0) return neg + "Infinity";
        if (Number.isNaN(ex.mag)) return neg + "NaN";
        if (ex.lt(0) && (ex = ex.mul(-1)), ex.eq(0)) return ex.toFixed(acc);
        let e = ex.log10().floor();
        switch(type){
            case "sc":
            case "scientific":
                if (ex.log10().lt(Math.min(-acc, 0)) && acc > 1) {
                    let e2 = ex.log10().ceil(), m = ex.div(e2.eq(-1) ? new Decimal(0.1) : Decimal.dTen.pow(e2));
                    return neg + (e2.mul(-1).max(1).log10().gte(9) ? "" : m.toFixed(2)) + "e" + format(e2, 0, max, "mixed_sc");
                }
                if (e.lt(max)) {
                    let a = Math.max(Math.min(acc - e.toNumber(), acc), 0);
                    return neg + (a > 0 ? ex.toFixed(a) : ex.toFixed(a).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                }
                {
                    if (ex.gte("eeee10")) {
                        let slog = ex.slog();
                        return (slog.gte(1e9) ? "" : Decimal.dTen.pow(slog.sub(slog.floor())).toFixed(2)) + "F" + format(slog.floor(), 0);
                    }
                    let m = ex.div(Decimal.dTen.pow(e));
                    return neg + (e.log10().gte(9) ? "" : m.toFixed(2)) + "e" + format(e, 0, max, "mixed_sc");
                }
            case "st":
            case "standard":
                {
                    let e3 = ex.log(1e3).floor();
                    if (e3.lt(1)) return neg + ex.toFixed(Math.max(Math.min(acc - e.toNumber(), acc), 0));
                    let e3_mul = e3.mul(3), ee = e3.log10().floor();
                    if (ee.gte(3000)) return "e" + format(e, acc, max, "st");
                    let final = "";
                    if (e3.lt(4)) final = [
                        "",
                        "K",
                        "M",
                        "B"
                    ][Math.round(e3.toNumber())];
                    else {
                        let ee3 = Math.floor(e3.log(1e3).toNumber());
                        for(ee3 < 100 && (ee3 = Math.max(ee3 - 1, 0)), e3 = e3.sub(1).div(Decimal.dTen.pow(3 * ee3)); e3.gt(0);){
                            let div1000 = e3.div(1e3).floor(), mod1000 = e3.sub(div1000.mul(1e3)).floor().toNumber();
                            mod1000 > 0 && (1 != mod1000 || ee3 || (final = "U"), ee3 && (final = FORMATS.standard.tier2(ee3) + (final ? "-" + final : "")), mod1000 > 1 && (final = FORMATS.standard.tier1(mod1000) + final)), e3 = div1000, ee3++;
                        }
                    }
                    let m = ex.div(Decimal.dTen.pow(e3_mul)), fixedAmt = 2 === acc ? Decimal.dTwo.sub(e.sub(e3_mul)).add(1).toNumber() : acc;
                    return neg + (ee.gte(10) ? "" : m.toFixed(fixedAmt) + " ") + final;
                }
            default:
                return FORMATS[type] || console.error('Invalid format type "', type, '"'), neg + FORMATS[type].format(ex, acc, max);
        }
    }
    function metric(num, type = 0) {
        num = new Decimal(num);
        let abb = [
            {
                name: "K",
                altName: "Kilo"
            },
            {
                name: "M",
                altName: "Mega"
            },
            {
                name: "G",
                altName: "Giga"
            },
            {
                name: "T",
                altName: "Tera"
            },
            {
                name: "P",
                altName: "Peta"
            },
            {
                name: "Decimal",
                altName: "Exa"
            },
            {
                name: "Z",
                altName: "Zetta"
            },
            {
                name: "Y",
                altName: "Yotta"
            },
            {
                name: "R",
                altName: "Ronna"
            },
            {
                name: "Q",
                altName: "Quetta"
            }
        ].map((x, i)=>({
                name: x.name,
                altName: x.altName,
                value: Decimal.pow(1000, new Decimal(i).add(1))
            })), output = "", abbNum = num.lte(0) ? 0 : Decimal.min(Decimal.log(num, 1000).sub(1), abb.length - 1).floor().toNumber(), abbMax = abb[abbNum];
        switch(0 === abbNum && (output = 1 === type ? "" : num.format()), type){
            case 1:
                output = abbMax.name;
                break;
            case 2:
                output = num.divide(abbMax.value).format();
                break;
            case 3:
                output = abbMax.altName;
                break;
            default:
                output = `${num.divide(abbMax.value).format()} ${abbMax.name}`;
        }
        return output;
    }
    let formats = {
        ...FORMATS,
        toSubscript,
        toSuperscript: function(value) {
            return value.toFixed(0).split("").map((x)=>"-" === x ? "₋" : "⁰¹²³⁴⁵⁶⁷⁸⁹"[parseInt(x, 10)]).join("");
        },
        formatST: function(ex, acc = 2, max = 9, type = "st") {
            return format(ex, acc, max, type);
        },
        format,
        formatGain: function(amt, gain, type = "mixed_sc", acc, max) {
            amt = new Decimal(amt), gain = new Decimal(gain);
            let ooms = amt.add(gain).div(amt);
            return ooms.gte(10) && amt.gte(1e100) ? "(+" + format(ooms = ooms.log10().mul(20), acc, max, type) + " OoMs/sec)" : "(+" + format(gain, acc, max, type) + "/sec)";
        },
        formatTime: function formatTime(ex, acc = 2, type = "s") {
            return (ex = new Decimal(ex)).gte(86400) ? format(ex.div(86400).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(86400), acc, "d") : ex.gte(3600) || "d" == type ? (ex.div(3600).gte(10) || "d" != type ? "" : "0") + format(ex.div(3600).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(3600), acc, "h") : ex.gte(60) || "h" == type ? (ex.div(60).gte(10) || "h" != type ? "" : "0") + format(ex.div(60).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(60), acc, "m") : (ex.gte(10) || "m" != type ? "" : "0") + format(ex, acc, 12, "sc");
        },
        formatTimeLong: function(ex, ms = !1, acc = 0, max = 9, type = "mixed_sc") {
            let formatFn = (exf)=>format(exf, acc, max, type), mls = (ex = new Decimal(ex)).mul(1000).mod(1000).floor(), sec = ex.mod(60).floor(), min = ex.div(60).mod(60).floor(), hour = ex.div(3600).mod(24).floor(), day = ex.div(86400).mod(365.2425).floor(), year = ex.div(31556952).floor(), yearStr = year.eq(1) ? " year" : " years", dayStr = day.eq(1) ? " day" : " days", hourStr = hour.eq(1) ? " hour" : " hours", minStr = min.eq(1) ? " minute" : " minutes", secStr = sec.eq(1) ? " second" : " seconds", mlsStr = mls.eq(1) ? " millisecond" : " milliseconds";
            return `${year.gt(0) ? formatFn(year) + yearStr + ", " : ""}${day.gt(0) ? formatFn(day) + dayStr + ", " : ""}${hour.gt(0) ? formatFn(hour) + hourStr + ", " : ""}${min.gt(0) ? formatFn(min) + minStr + ", " : ""}${sec.gt(0) ? formatFn(sec) + secStr + "," : ""}${ms && mls.gt(0) ? " " + formatFn(mls) + mlsStr : ""}`.replace(/,([^,]*)$/, "$1").trim();
        },
        formatReduction: function(ex) {
            return ex = new Decimal(ex), format(Decimal.dOne.sub(ex).mul(100)) + "%";
        },
        formatPercent: function(ex) {
            return format((ex = new Decimal(ex)).mul(100)) + "%";
        },
        formatMult: function(ex, acc = 2) {
            return (ex = new Decimal(ex)).gte(1) ? "×" + ex.format(acc) : "/" + ex.pow(-1).format(acc);
        },
        expMult: function(a, b, base = 10) {
            return Decimal.gte(a, 10) ? Decimal.pow(base, Decimal.log(a, base).pow(b)) : new Decimal(a);
        },
        metric,
        ev: function(num, c2 = !1) {
            return `${metric(num, 2)} ${metric(num, 1)}eV${c2 ? "/c^2" : ""}`;
        }
    };
    return {
        FORMATS,
        formats
    };
}

function _ts_decorate$3(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)(d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$1(k, v) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
}
let LAYER_DOWN = Math.log10(9e15), FIRST_NEG_LAYER = 1 / 9e15, powerOf10 = function() {
    let powersOf10 = [];
    for(let i = -323; i <= 308; i++)powersOf10.push(Number("1e" + i));
    return function(power) {
        return powersOf10[power + 323];
    };
}(), critical_headers = [
    2,
    Math.E,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
], critical_tetr_values = [
    [
        1,
        1.0891180521811202527,
        1.1789767925673958433,
        1.2701455431742086633,
        1.3632090180450091941,
        1.4587818160364217007,
        1.5575237916251418333,
        1.6601571006859253673,
        1.7674858188369780435,
        1.8804192098842727359,
        2
    ],
    [
        1,
        1.1121114330934078681,
        1.2310389249316089299,
        1.3583836963111376089,
        1.4960519303993531879,
        1.6463542337511945810,
        1.8121385357018724464,
        1.9969713246183068478,
        2.2053895545527544330,
        2.4432574483385252544,
        Math.E
    ],
    [
        1,
        1.1187738849693603,
        1.2464963939368214,
        1.38527004705667,
        1.5376664685821402,
        1.7068895236551784,
        1.897001227148399,
        2.1132403089001035,
        2.362480153784171,
        2.6539010333870774,
        3
    ],
    [
        1,
        1.1367350847096405,
        1.2889510672956703,
        1.4606478703324786,
        1.6570295196661111,
        1.8850062585672889,
        2.1539465047453485,
        2.476829779693097,
        2.872061932789197,
        3.3664204535587183,
        4
    ],
    [
        1,
        1.1494592900767588,
        1.319708228183931,
        1.5166291280087583,
        1.748171114438024,
        2.0253263297298045,
        2.3636668498288547,
        2.7858359149579424,
        3.3257226212448145,
        4.035730287722532,
        5
    ],
    [
        1,
        1.159225940787673,
        1.343712473580932,
        1.5611293155111927,
        1.8221199554561318,
        2.14183924486326,
        2.542468319282638,
        3.0574682501653316,
        3.7390572020926873,
        4.6719550537360774,
        6
    ],
    [
        1,
        1.1670905356972596,
        1.3632807444991446,
        1.5979222279405536,
        1.8842640123816674,
        2.2416069644878687,
        2.69893426559423,
        3.3012632110403577,
        4.121250340630164,
        5.281493033448316,
        7
    ],
    [
        1,
        1.1736630594087796,
        1.379783782386201,
        1.6292821855668218,
        1.9378971836180754,
        2.3289975651071977,
        2.8384347394720835,
        3.5232708454565906,
        4.478242031114584,
        5.868592169644505,
        8
    ],
    [
        1,
        1.1793017514670474,
        1.394054150657457,
        1.65664127441059,
        1.985170999970283,
        2.4069682290577457,
        2.9647310119960752,
        3.7278665320924946,
        4.814462547283592,
        6.436522247411611,
        9
    ],
    [
        1,
        1.1840100246247336579,
        1.4061375836156954169,
        1.6802272208863963918,
        2.026757028388618927,
        2.4770056063449647580,
        3.0805252717554819987,
        3.9191964192627283911,
        5.1351528408331864230,
        6.9899611795347148455,
        10
    ]
], critical_slog_values = [
    [
        -1,
        -0.9194161097107025,
        -0.8335625019330468,
        -0.7425599821143978,
        -0.6466611521029437,
        -0.5462617907227869,
        -0.4419033816638769,
        -0.3342645487554494,
        -0.224140440909962,
        -0.11241087890006762,
        0
    ],
    [
        -1,
        -0.90603157029014,
        -0.80786507256596,
        -0.7064666939634,
        -0.60294836853664,
        -0.49849837513117,
        -0.39430303318768,
        -0.29147201034755,
        -0.19097820800866,
        -0.09361896280296,
        0
    ],
    [
        -1,
        -0.9021579584316141,
        -0.8005762598234203,
        -0.6964780623319391,
        -0.5911906810998454,
        -0.486050182576545,
        -0.3823089430815083,
        -0.28106046722897615,
        -0.1831906535795894,
        -0.08935809204418144,
        0
    ],
    [
        -1,
        -0.8917227442365535,
        -0.781258746326964,
        -0.6705130326902455,
        -0.5612813129406509,
        -0.4551067709033134,
        -0.35319256652135966,
        -0.2563741554088552,
        -0.1651412821106526,
        -0.0796919581982668,
        0
    ],
    [
        -1,
        -0.8843387974366064,
        -0.7678744063886243,
        -0.6529563724510552,
        -0.5415870994657841,
        -0.4352842206588936,
        -0.33504449124791424,
        -0.24138853420685147,
        -0.15445285440944467,
        -0.07409659641336663,
        0
    ],
    [
        -1,
        -0.8786709358426346,
        -0.7577735191184886,
        -0.6399546189952064,
        -0.527284921869926,
        -0.4211627631006314,
        -0.3223479611761232,
        -0.23107655627789858,
        -0.1472057700818259,
        -0.07035171210706326,
        0
    ],
    [
        -1,
        -0.8740862815291583,
        -0.7497032990976209,
        -0.6297119746181752,
        -0.5161838335958787,
        -0.41036238255751956,
        -0.31277212146489963,
        -0.2233976621705518,
        -0.1418697367979619,
        -0.06762117662323441,
        0
    ],
    [
        -1,
        -0.8702632331800649,
        -0.7430366914122081,
        -0.6213373075161548,
        -0.5072025698095242,
        -0.40171437727184167,
        -0.30517930701410456,
        -0.21736343968190863,
        -0.137710238299109,
        -0.06550774483471955,
        0
    ],
    [
        -1,
        -0.8670016295947213,
        -0.7373984232432306,
        -0.6143173985094293,
        -0.49973884395492807,
        -0.394584953527678,
        -0.2989649949848695,
        -0.21245647317021688,
        -0.13434688362382652,
        -0.0638072667348083,
        0
    ],
    [
        -1,
        -0.8641642839543857,
        -0.732534623168535,
        -0.6083127477059322,
        -0.4934049257184696,
        -0.3885773075899922,
        -0.29376029055315767,
        -0.2083678561173622,
        -0.13155653399373268,
        -0.062401588652553186,
        0
    ]
], D = function(value) {
    return Decimal.fromValue_noAlloc(value);
}, FC = function(sign, layer, mag) {
    return Decimal.fromComponents(sign, layer, mag);
}, FC_NN = function(sign, layer, mag) {
    return Decimal.fromComponents_noNormalize(sign, layer, mag);
}, decimalPlaces = function(value, places) {
    let len = places + 1, numDigits = Math.ceil(Math.log10(Math.abs(value)));
    return parseFloat((Math.round(value * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len)).toFixed(Math.max(len - numDigits, 0)));
}, f_maglog10 = function(n) {
    return Math.sign(n) * Math.log10(Math.abs(n));
}, f_gamma = function(n) {
    let l;
    if (!isFinite(n)) return n;
    if (n < -50) return n === Math.trunc(n) ? Number.NEGATIVE_INFINITY : 0;
    let scal1 = 1;
    for(; n < 10;)scal1 *= n, ++n;
    n -= 1, l = 0.9189385332046727 + (n + 0.5) * Math.log(n) - n;
    let n2 = n * n, np = n;
    return l += 1 / (12 * np), np *= n2, l -= 1 / (360 * np), np *= n2, l += 1 / (1260 * np), np *= n2, l -= 1 / (1680 * np), np *= n2, l += 1 / (1188 * np), np *= n2, l -= 691 / (360360 * np), np *= n2, l += 7 / (1092 * np), np *= n2, Math.exp(l -= 3617 / (122400 * np)) / scal1;
}, f_lambertw = function(z, tol = 1e-10, principal = !0) {
    let w, wn;
    if (!Number.isFinite(z)) return z;
    if (principal) {
        if (0 === z) return z;
        if (1 === z) return 0.56714329040978387299997;
        w = z < 10 ? 0 : Math.log(z) - Math.log(Math.log(z));
    } else {
        if (0 === z) return -1 / 0;
        w = z <= -0.1 ? -2 : Math.log(-z) - Math.log(-Math.log(-z));
    }
    for(let i = 0; i < 100; ++i){
        if (Math.abs((wn = (z * Math.exp(-w) + w * w) / (w + 1)) - w) < tol * Math.abs(wn)) return wn;
        w = wn;
    }
    throw Error(`Iteration failed to converge: ${z.toString()}`);
};
function d_lambertw(z, tol = 1e-10, principal = !0) {
    let w, ew, wewz, wn;
    if (!Number.isFinite(z.mag)) return new Decimal(z);
    if (principal) {
        if (z.eq(Decimal.dZero)) return FC_NN(0, 0, 0);
        if (z.eq(Decimal.dOne)) return Decimal.fromNumber(0.56714329040978387299997);
        w = Decimal.ln(z);
    } else {
        if (z.eq(Decimal.dZero)) return FC_NN(-1, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        w = Decimal.ln(z.neg());
    }
    for(let i = 0; i < 100; ++i){
        if (ew = w.neg().exp(), wewz = w.sub(z.mul(ew)), wn = w.sub(wewz.div(w.add(1).sub(w.add(2).mul(wewz).div(Decimal.mul(2, w).add(2))))), Decimal.abs(wn.sub(w)).lt(Decimal.abs(wn).mul(tol))) return wn;
        w = wn;
    }
    throw Error(`Iteration failed to converge: ${z.toString()}`);
}
class Decimal {
    get m() {
        if (0 === this.sign) return 0;
        if (0 === this.layer) {
            let man;
            let exp = Math.floor(Math.log10(this.mag));
            return man = 5e-324 === this.mag ? 5 : this.mag / powerOf10(exp), this.sign * man;
        }
        if (1 !== this.layer) return this.sign;
        {
            let residue = this.mag - Math.floor(this.mag);
            return this.sign * Math.pow(10, residue);
        }
    }
    set m(value) {
        this.layer <= 2 ? this.fromMantissaExponent(value, this.e) : (this.sign = Math.sign(value), 0 === this.sign && (this.layer = 0, this.exponent = 0));
    }
    get e() {
        return 0 === this.sign ? 0 : 0 === this.layer ? Math.floor(Math.log10(this.mag)) : 1 === this.layer ? Math.floor(this.mag) : 2 === this.layer ? Math.floor(Math.sign(this.mag) * Math.pow(10, Math.abs(this.mag))) : this.mag * Number.POSITIVE_INFINITY;
    }
    set e(value) {
        this.fromMantissaExponent(this.m, value);
    }
    get s() {
        return this.sign;
    }
    set s(value) {
        0 === value ? (this.sign = 0, this.layer = 0, this.mag = 0) : this.sign = value;
    }
    get mantissa() {
        return this.m;
    }
    set mantissa(value) {
        this.m = value;
    }
    get exponent() {
        return this.e;
    }
    set exponent(value) {
        this.e = value;
    }
    static fromComponents(sign, layer, mag) {
        return new Decimal().fromComponents(sign, layer, mag);
    }
    static fromComponents_noNormalize(sign, layer, mag) {
        return new Decimal().fromComponents_noNormalize(sign, layer, mag);
    }
    static fromMantissaExponent(mantissa, exponent) {
        return new Decimal().fromMantissaExponent(mantissa, exponent);
    }
    static fromMantissaExponent_noNormalize(mantissa, exponent) {
        return new Decimal().fromMantissaExponent_noNormalize(mantissa, exponent);
    }
    static fromDecimal(value) {
        return new Decimal().fromDecimal(value);
    }
    static fromNumber(value) {
        return new Decimal().fromNumber(value);
    }
    static fromString(value, linearhyper4 = !1) {
        return new Decimal().fromString(value, linearhyper4);
    }
    static fromValue(value) {
        return new Decimal().fromValue(value);
    }
    static fromValue_noAlloc(value) {
        if (value instanceof Decimal) return value;
        if ("string" == typeof value) {
            let cached = Decimal.fromStringCache.get(value);
            return void 0 !== cached ? cached : Decimal.fromString(value);
        }
        return "number" == typeof value ? Decimal.fromNumber(value) : FC_NN(0, 0, 0);
    }
    static abs(value) {
        return D(value).abs();
    }
    static neg(value) {
        return D(value).neg();
    }
    static negate(value) {
        return D(value).neg();
    }
    static negated(value) {
        return D(value).neg();
    }
    static sign(value) {
        return D(value).sign;
    }
    static sgn(value) {
        return D(value).sign;
    }
    static round(value) {
        return D(value).round();
    }
    static floor(value) {
        return D(value).floor();
    }
    static ceil(value) {
        return D(value).ceil();
    }
    static trunc(value) {
        return D(value).trunc();
    }
    static add(value, other) {
        return D(value).add(other);
    }
    static plus(value, other) {
        return D(value).add(other);
    }
    static sub(value, other) {
        return D(value).sub(other);
    }
    static subtract(value, other) {
        return D(value).sub(other);
    }
    static minus(value, other) {
        return D(value).sub(other);
    }
    static mul(value, other) {
        return D(value).mul(other);
    }
    static multiply(value, other) {
        return D(value).mul(other);
    }
    static times(value, other) {
        return D(value).mul(other);
    }
    static div(value, other) {
        return D(value).div(other);
    }
    static divide(value, other) {
        return D(value).div(other);
    }
    static recip(value) {
        return D(value).recip();
    }
    static reciprocal(value) {
        return D(value).recip();
    }
    static reciprocate(value) {
        return D(value).reciprocate();
    }
    static mod(value, other, floored = !1) {
        return D(value).mod(other, floored);
    }
    static modulo(value, other, floored = !1) {
        return D(value).modulo(other, floored);
    }
    static modular(value, other, floored = !1) {
        return D(value).modular(other, floored);
    }
    static cmp(value, other) {
        return D(value).cmp(other);
    }
    static cmpabs(value, other) {
        return D(value).cmpabs(other);
    }
    static compare(value, other) {
        return D(value).cmp(other);
    }
    static isNaN(value) {
        return isNaN((value = D(value)).sign) || isNaN(value.layer) || isNaN(value.mag);
    }
    static isFinite(value) {
        return isFinite((value = D(value)).sign) && isFinite(value.layer) && isFinite(value.mag);
    }
    static eq(value, other) {
        return D(value).eq(other);
    }
    static equals(value, other) {
        return D(value).eq(other);
    }
    static neq(value, other) {
        return D(value).neq(other);
    }
    static notEquals(value, other) {
        return D(value).notEquals(other);
    }
    static lt(value, other) {
        return D(value).lt(other);
    }
    static lte(value, other) {
        return D(value).lte(other);
    }
    static gt(value, other) {
        return D(value).gt(other);
    }
    static gte(value, other) {
        return D(value).gte(other);
    }
    static max(value, other) {
        return D(value).max(other);
    }
    static min(value, other) {
        return D(value).min(other);
    }
    static minabs(value, other) {
        return D(value).minabs(other);
    }
    static maxabs(value, other) {
        return D(value).maxabs(other);
    }
    static clamp(value, min, max) {
        return D(value).clamp(min, max);
    }
    static clampMin(value, min) {
        return D(value).clampMin(min);
    }
    static clampMax(value, max) {
        return D(value).clampMax(max);
    }
    static cmp_tolerance(value, other, tolerance) {
        return D(value).cmp_tolerance(other, tolerance);
    }
    static compare_tolerance(value, other, tolerance) {
        return D(value).cmp_tolerance(other, tolerance);
    }
    static eq_tolerance(value, other, tolerance) {
        return D(value).eq_tolerance(other, tolerance);
    }
    static equals_tolerance(value, other, tolerance) {
        return D(value).eq_tolerance(other, tolerance);
    }
    static neq_tolerance(value, other, tolerance) {
        return D(value).neq_tolerance(other, tolerance);
    }
    static notEquals_tolerance(value, other, tolerance) {
        return D(value).notEquals_tolerance(other, tolerance);
    }
    static lt_tolerance(value, other, tolerance) {
        return D(value).lt_tolerance(other, tolerance);
    }
    static lte_tolerance(value, other, tolerance) {
        return D(value).lte_tolerance(other, tolerance);
    }
    static gt_tolerance(value, other, tolerance) {
        return D(value).gt_tolerance(other, tolerance);
    }
    static gte_tolerance(value, other, tolerance) {
        return D(value).gte_tolerance(other, tolerance);
    }
    static pLog10(value) {
        return D(value).pLog10();
    }
    static absLog10(value) {
        return D(value).absLog10();
    }
    static log10(value) {
        return D(value).log10();
    }
    static log(value, base) {
        return D(value).log(base);
    }
    static log2(value) {
        return D(value).log2();
    }
    static ln(value) {
        return D(value).ln();
    }
    static logarithm(value, base) {
        return D(value).logarithm(base);
    }
    static pow(value, other) {
        return D(value).pow(other);
    }
    static pow10(value) {
        return D(value).pow10();
    }
    static root(value, other) {
        return D(value).root(other);
    }
    static factorial(value, _other) {
        return D(value).factorial();
    }
    static gamma(value, _other) {
        return D(value).gamma();
    }
    static lngamma(value, _other) {
        return D(value).lngamma();
    }
    static exp(value) {
        return D(value).exp();
    }
    static sqr(value) {
        return D(value).sqr();
    }
    static sqrt(value) {
        return D(value).sqrt();
    }
    static cube(value) {
        return D(value).cube();
    }
    static cbrt(value) {
        return D(value).cbrt();
    }
    static tetrate(value, height = 2, payload = FC_NN(1, 0, 1), linear = !1) {
        return D(value).tetrate(height, payload, linear);
    }
    static iteratedexp(value, height = 2, payload = FC_NN(1, 0, 1), linear = !1) {
        return D(value).iteratedexp(height, payload, linear);
    }
    static iteratedlog(value, base = 10, times = 1, linear = !1) {
        return D(value).iteratedlog(base, times, linear);
    }
    static layeradd10(value, diff, linear = !1) {
        return D(value).layeradd10(diff, linear);
    }
    static layeradd(value, diff, base = 10, linear = !1) {
        return D(value).layeradd(diff, base, linear);
    }
    static slog(value, base = 10, linear = !1) {
        return D(value).slog(base, 100, linear);
    }
    static lambertw(value, principal) {
        return D(value).lambertw(principal);
    }
    static ssqrt(value) {
        return D(value).ssqrt();
    }
    static linear_sroot(value, degree) {
        return D(value).linear_sroot(degree);
    }
    static pentate(value, height = 2, payload = FC_NN(1, 0, 1), linear = !1) {
        return D(value).pentate(height, payload, linear);
    }
    static penta_log(value, base = 10, linear = !1) {
        return D(value).penta_log(base, 100, linear);
    }
    static linear_penta_root(value, degree) {
        return D(value).linear_penta_root(degree);
    }
    static sin(value) {
        return D(value).sin();
    }
    static cos(value) {
        return D(value).cos();
    }
    static tan(value) {
        return D(value).tan();
    }
    static asin(value) {
        return D(value).asin();
    }
    static acos(value) {
        return D(value).acos();
    }
    static atan(value) {
        return D(value).atan();
    }
    static sinh(value) {
        return D(value).sinh();
    }
    static cosh(value) {
        return D(value).cosh();
    }
    static tanh(value) {
        return D(value).tanh();
    }
    static asinh(value) {
        return D(value).asinh();
    }
    static acosh(value) {
        return D(value).acosh();
    }
    static atanh(value) {
        return D(value).atanh();
    }
    static affordGeometricSeries(resourcesAvailable, priceStart, priceRatio, currentOwned) {
        return this.affordGeometricSeries_core(D(resourcesAvailable), D(priceStart), D(priceRatio), currentOwned);
    }
    static sumGeometricSeries(numItems, priceStart, priceRatio, currentOwned) {
        return this.sumGeometricSeries_core(numItems, D(priceStart), D(priceRatio), currentOwned);
    }
    static affordArithmeticSeries(resourcesAvailable, priceStart, priceAdd, currentOwned) {
        return this.affordArithmeticSeries_core(D(resourcesAvailable), D(priceStart), D(priceAdd), D(currentOwned));
    }
    static sumArithmeticSeries(numItems, priceStart, priceAdd, currentOwned) {
        return this.sumArithmeticSeries_core(D(numItems), D(priceStart), D(priceAdd), D(currentOwned));
    }
    static efficiencyOfPurchase(cost, currentRpS, deltaRpS) {
        return this.efficiencyOfPurchase_core(D(cost), D(currentRpS), D(deltaRpS));
    }
    static randomDecimalForTesting(maxLayers) {
        if (20 * Math.random() < 1) return FC_NN(0, 0, 0);
        let randomsign = Math.random() > 0.5 ? 1 : -1;
        if (20 * Math.random() < 1) return FC_NN(randomsign, 0, 1);
        let layer = Math.floor(Math.random() * (maxLayers + 1)), randomexp = 0 === layer ? 616 * Math.random() - 308 : 16 * Math.random();
        Math.random() > 0.9 && (randomexp = Math.trunc(randomexp));
        let randommag = Math.pow(10, randomexp);
        return Math.random() > 0.9 && (randommag = Math.trunc(randommag)), FC(randomsign, layer, randommag);
    }
    static affordGeometricSeries_core(resourcesAvailable, priceStart, priceRatio, currentOwned) {
        let actualStart = priceStart.mul(priceRatio.pow(currentOwned));
        return Decimal.floor(resourcesAvailable.div(actualStart).mul(priceRatio.sub(1)).add(1).log10().div(priceRatio.log10()));
    }
    static sumGeometricSeries_core(numItems, priceStart, priceRatio, currentOwned) {
        return priceStart.mul(priceRatio.pow(currentOwned)).mul(Decimal.sub(1, priceRatio.pow(numItems))).div(Decimal.sub(1, priceRatio));
    }
    static affordArithmeticSeries_core(resourcesAvailable, priceStart, priceAdd, currentOwned) {
        let b = priceStart.add(currentOwned.mul(priceAdd)).sub(priceAdd.div(2)), b2 = b.pow(2);
        return b.neg().add(b2.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt()).div(priceAdd).floor();
    }
    static sumArithmeticSeries_core(numItems, priceStart, priceAdd, currentOwned) {
        let actualStart = priceStart.add(currentOwned.mul(priceAdd));
        return numItems.div(2).mul(actualStart.mul(2).plus(numItems.sub(1).mul(priceAdd)));
    }
    static efficiencyOfPurchase_core(cost, currentRpS, deltaRpS) {
        return cost.div(currentRpS).add(cost.div(deltaRpS));
    }
    normalize() {
        if (0 === this.sign || 0 === this.mag && 0 === this.layer || this.mag === Number.NEGATIVE_INFINITY && this.layer > 0 && Number.isFinite(this.layer)) return this.sign = 0, this.mag = 0, this.layer = 0, this;
        if (0 === this.layer && this.mag < 0 && (this.mag = -this.mag, this.sign = -this.sign), this.mag === Number.POSITIVE_INFINITY || this.layer === Number.POSITIVE_INFINITY || this.mag === Number.NEGATIVE_INFINITY || this.layer === Number.NEGATIVE_INFINITY) return this.mag = Number.POSITIVE_INFINITY, this.layer = Number.POSITIVE_INFINITY, this;
        if (0 === this.layer && this.mag < FIRST_NEG_LAYER) return this.layer += 1, this.mag = Math.log10(this.mag), this;
        let absmag = Math.abs(this.mag), signmag = Math.sign(this.mag);
        if (absmag >= 9e15) return this.layer += 1, this.mag = signmag * Math.log10(absmag), this;
        for(; absmag < LAYER_DOWN && this.layer > 0;)this.layer -= 1, 0 === this.layer ? this.mag = Math.pow(10, this.mag) : (this.mag = signmag * Math.pow(10, absmag), absmag = Math.abs(this.mag), signmag = Math.sign(this.mag));
        return 0 === this.layer && (this.mag < 0 ? (this.mag = -this.mag, this.sign = -this.sign) : 0 === this.mag && (this.sign = 0)), (Number.isNaN(this.sign) || Number.isNaN(this.layer) || Number.isNaN(this.mag)) && (this.sign = Number.NaN, this.layer = Number.NaN, this.mag = Number.NaN), this;
    }
    fromComponents(sign, layer, mag) {
        return this.sign = sign, this.layer = layer, this.mag = mag, this.normalize(), this;
    }
    fromComponents_noNormalize(sign, layer, mag) {
        return this.sign = sign, this.layer = layer, this.mag = mag, this;
    }
    fromMantissaExponent(mantissa, exponent) {
        return this.layer = 1, this.sign = Math.sign(mantissa), mantissa = Math.abs(mantissa), this.mag = exponent + Math.log10(mantissa), this.normalize(), this;
    }
    fromMantissaExponent_noNormalize(mantissa, exponent) {
        return this.fromMantissaExponent(mantissa, exponent), this;
    }
    fromDecimal(value) {
        return this.sign = value.sign, this.layer = value.layer, this.mag = value.mag, this;
    }
    fromNumber(value) {
        return this.mag = Math.abs(value), this.sign = Math.sign(value), this.layer = 0, this.normalize(), this;
    }
    fromString(value, linearhyper4 = !1) {
        let base, height;
        let originalValue = value, cached = Decimal.fromStringCache.get(originalValue);
        if (void 0 !== cached) return this.fromDecimal(cached);
        let pentationparts = (value = value.replace(",", "")).split("^^^");
        if (2 === pentationparts.length) {
            let base = parseFloat(pentationparts[0]), height = parseFloat(pentationparts[1]), heightparts = pentationparts[1].split(";"), payload = 1;
            if (2 !== heightparts.length || isFinite(payload = parseFloat(heightparts[1])) || (payload = 1), isFinite(base) && isFinite(height)) {
                let result = Decimal.pentate(base, height, payload, linearhyper4);
                return this.sign = result.sign, this.layer = result.layer, this.mag = result.mag, Decimal.fromStringCache.maxSize >= 1 && Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this)), this;
            }
        }
        let tetrationparts = value.split("^^");
        if (2 === tetrationparts.length) {
            let base = parseFloat(tetrationparts[0]), height = parseFloat(tetrationparts[1]), heightparts = tetrationparts[1].split(";"), payload = 1;
            if (2 !== heightparts.length || isFinite(payload = parseFloat(heightparts[1])) || (payload = 1), isFinite(base) && isFinite(height)) {
                let result = Decimal.tetrate(base, height, payload, linearhyper4);
                return this.sign = result.sign, this.layer = result.layer, this.mag = result.mag, Decimal.fromStringCache.maxSize >= 1 && Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this)), this;
            }
        }
        let powparts = value.split("^");
        if (2 === powparts.length) {
            let base = parseFloat(powparts[0]), exponent = parseFloat(powparts[1]);
            if (isFinite(base) && isFinite(exponent)) {
                let result = Decimal.pow(base, exponent);
                return this.sign = result.sign, this.layer = result.layer, this.mag = result.mag, Decimal.fromStringCache.maxSize >= 1 && Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this)), this;
            }
        }
        let ptparts = (value = value.trim().toLowerCase()).split("pt");
        if (2 === ptparts.length || 2 === (ptparts = value.split("p")).length) {
            base = 10;
            let negative = !1;
            ptparts[0].startsWith("-") && (negative = !0, ptparts[0] = ptparts[0].slice(1)), height = parseFloat(ptparts[0]), ptparts[1] = ptparts[1].replace("(", ""), ptparts[1] = ptparts[1].replace(")", "");
            let payload = parseFloat(ptparts[1]);
            if (isFinite(payload) || (payload = 1), isFinite(base) && isFinite(height)) {
                let result = Decimal.tetrate(base, height, payload, linearhyper4);
                return this.sign = result.sign, this.layer = result.layer, this.mag = result.mag, Decimal.fromStringCache.maxSize >= 1 && Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this)), negative && (this.sign *= -1), this;
            }
        }
        if (2 === (ptparts = value.split("f")).length) {
            base = 10;
            let negative = !1;
            ptparts[0].startsWith("-") && (negative = !0, ptparts[0] = ptparts[0].slice(1)), ptparts[0] = ptparts[0].replace("(", ""), ptparts[0] = ptparts[0].replace(")", "");
            let payload = parseFloat(ptparts[0]);
            if (ptparts[1] = ptparts[1].replace("(", ""), ptparts[1] = ptparts[1].replace(")", ""), height = parseFloat(ptparts[1]), isFinite(payload) || (payload = 1), isFinite(base) && isFinite(height)) {
                let result = Decimal.tetrate(base, height, payload, linearhyper4);
                return this.sign = result.sign, this.layer = result.layer, this.mag = result.mag, Decimal.fromStringCache.maxSize >= 1 && Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this)), negative && (this.sign *= -1), this;
            }
        }
        let parts = value.split("e"), ecount = parts.length - 1;
        if (0 === ecount) {
            let numberAttempt = parseFloat(value);
            if (isFinite(numberAttempt)) return this.fromNumber(numberAttempt), Decimal.fromStringCache.size >= 1 && Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this)), this;
        } else if (1 === ecount) {
            let numberAttempt = parseFloat(value);
            if (isFinite(numberAttempt) && 0 !== numberAttempt) return this.fromNumber(numberAttempt), Decimal.fromStringCache.maxSize >= 1 && Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this)), this;
        }
        let newparts = value.split("e^");
        if (2 === newparts.length) {
            this.sign = 1, newparts[0].startsWith("-") && (this.sign = -1);
            let layerstring = "";
            for(let i = 0; i < newparts[1].length; ++i){
                let chrcode = newparts[1].charCodeAt(i);
                if (chrcode >= 43 && chrcode <= 57 || 101 === chrcode) layerstring += newparts[1].charAt(i);
                else {
                    if (this.layer = parseFloat(layerstring), this.mag = parseFloat(newparts[1].substr(i + 1)), this.layer < 0 || this.layer % 1 != 0) {
                        let result = Decimal.tetrate(10, this.layer, this.mag, linearhyper4);
                        this.sign = result.sign, this.layer = result.layer, this.mag = result.mag;
                    }
                    return this.normalize(), Decimal.fromStringCache.maxSize >= 1 && Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this)), this;
                }
            }
        }
        if (ecount < 1) return this.sign = 0, this.layer = 0, this.mag = 0, Decimal.fromStringCache.maxSize >= 1 && Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this)), this;
        let mantissa = parseFloat(parts[0]);
        if (0 === mantissa) return this.sign = 0, this.layer = 0, this.mag = 0, Decimal.fromStringCache.maxSize >= 1 && Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this)), this;
        let exponent = parseFloat(parts[parts.length - 1]);
        if (ecount >= 2) {
            let me = parseFloat(parts[parts.length - 2]);
            isFinite(me) && (exponent *= Math.sign(me), exponent += f_maglog10(me));
        }
        if (isFinite(mantissa)) {
            if (1 === ecount) this.sign = Math.sign(mantissa), this.layer = 1, this.mag = exponent + Math.log10(Math.abs(mantissa));
            else {
                if (this.sign = Math.sign(mantissa), this.layer = ecount, 2 === ecount) {
                    let result = Decimal.mul(FC(1, 2, exponent), D(mantissa));
                    return this.sign = result.sign, this.layer = result.layer, this.mag = result.mag, Decimal.fromStringCache.maxSize >= 1 && Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this)), this;
                }
                this.mag = exponent;
            }
        } else this.sign = "-" === parts[0] ? -1 : 1, this.layer = ecount, this.mag = exponent;
        return this.normalize(), Decimal.fromStringCache.maxSize >= 1 && Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this)), this;
    }
    fromValue(value) {
        return value instanceof Decimal ? this.fromDecimal(value) : "number" == typeof value ? this.fromNumber(value) : "string" == typeof value ? this.fromString(value) : (this.sign = 0, this.layer = 0, this.mag = 0, this);
    }
    toNumber() {
        return this.mag === Number.POSITIVE_INFINITY && this.layer === Number.POSITIVE_INFINITY && 1 === this.sign ? Number.POSITIVE_INFINITY : this.mag === Number.POSITIVE_INFINITY && this.layer === Number.POSITIVE_INFINITY && -1 === this.sign ? Number.NEGATIVE_INFINITY : Number.isFinite(this.layer) ? 0 === this.layer ? this.sign * this.mag : 1 === this.layer ? this.sign * Math.pow(10, this.mag) : this.mag > 0 ? this.sign > 0 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : 0 : Number.NaN;
    }
    mantissaWithDecimalPlaces(places) {
        return isNaN(this.m) ? Number.NaN : 0 === this.m ? 0 : decimalPlaces(this.m, places);
    }
    magnitudeWithDecimalPlaces(places) {
        return isNaN(this.mag) ? Number.NaN : 0 === this.mag ? 0 : decimalPlaces(this.mag, places);
    }
    toString() {
        return isNaN(this.layer) || isNaN(this.sign) || isNaN(this.mag) ? "NaN" : this.mag === Number.POSITIVE_INFINITY || this.layer === Number.POSITIVE_INFINITY ? 1 === this.sign ? "Infinity" : "-Infinity" : 0 === this.layer ? this.mag < 1e21 && this.mag > 1e-7 || 0 === this.mag ? (this.sign * this.mag).toString() : this.m + "e" + this.e : 1 === this.layer ? this.m + "e" + this.e : this.layer <= 5 ? (-1 === this.sign ? "-" : "") + "e".repeat(this.layer) + this.mag : (-1 === this.sign ? "-" : "") + "(e^" + this.layer + ")" + this.mag;
    }
    toExponential(places) {
        return 0 === this.layer ? (this.sign * this.mag).toExponential(places) : this.toStringWithDecimalPlaces(places);
    }
    toFixed(places) {
        return 0 === this.layer ? (this.sign * this.mag).toFixed(places) : this.toStringWithDecimalPlaces(places);
    }
    toPrecision(places) {
        return this.e <= -7 ? this.toExponential(places - 1) : places > this.e ? this.toFixed(places - this.exponent - 1) : this.toExponential(places - 1);
    }
    valueOf() {
        return this.toString();
    }
    toJSON() {
        return this.toString();
    }
    toStringWithDecimalPlaces(places) {
        return 0 === this.layer ? this.mag < 1e21 && this.mag > 1e-7 || 0 === this.mag ? (this.sign * this.mag).toFixed(places) : decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places) : 1 === this.layer ? decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places) : this.layer <= 5 ? (-1 === this.sign ? "-" : "") + "e".repeat(this.layer) + decimalPlaces(this.mag, places) : (-1 === this.sign ? "-" : "") + "(e^" + this.layer + ")" + decimalPlaces(this.mag, places);
    }
    abs() {
        return FC_NN(0 === this.sign ? 0 : 1, this.layer, this.mag);
    }
    neg() {
        return FC_NN(-this.sign, this.layer, this.mag);
    }
    negate() {
        return this.neg();
    }
    negated() {
        return this.neg();
    }
    sgn() {
        return this.sign;
    }
    round() {
        return this.mag < 0 ? FC_NN(0, 0, 0) : 0 === this.layer ? FC(this.sign, 0, Math.round(this.mag)) : new Decimal(this);
    }
    floor() {
        return this.mag < 0 ? -1 === this.sign ? FC_NN(-1, 0, 1) : FC_NN(0, 0, 0) : -1 === this.sign ? this.neg().ceil().neg() : 0 === this.layer ? FC(this.sign, 0, Math.floor(this.mag)) : new Decimal(this);
    }
    ceil() {
        return this.mag < 0 ? 1 === this.sign ? FC_NN(1, 0, 1) : FC_NN(0, 0, 0) : -1 === this.sign ? this.neg().floor().neg() : 0 === this.layer ? FC(this.sign, 0, Math.ceil(this.mag)) : new Decimal(this);
    }
    trunc() {
        return this.mag < 0 ? FC_NN(0, 0, 0) : 0 === this.layer ? FC(this.sign, 0, Math.trunc(this.mag)) : new Decimal(this);
    }
    add(value) {
        let a, b;
        let decimal = D(value);
        if (this.eq(Decimal.dInf) && decimal.eq(Decimal.dNegInf) || this.eq(Decimal.dNegInf) && decimal.eq(Decimal.dInf)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        if (!Number.isFinite(this.layer)) return new Decimal(this);
        if (!Number.isFinite(decimal.layer) || 0 === this.sign) return new Decimal(decimal);
        if (0 === decimal.sign) return new Decimal(this);
        if (this.sign === -decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag) return FC_NN(0, 0, 0);
        if (this.layer >= 2 || decimal.layer >= 2) return this.maxabs(decimal);
        if (Decimal.cmpabs(this, decimal) > 0 ? (a = new Decimal(this), b = new Decimal(decimal)) : (a = new Decimal(decimal), b = new Decimal(this)), 0 === a.layer && 0 === b.layer) return Decimal.fromNumber(a.sign * a.mag + b.sign * b.mag);
        let layera = a.layer * Math.sign(a.mag), layerb = b.layer * Math.sign(b.mag);
        if (layera - layerb >= 2) return a;
        if (0 === layera && -1 === layerb) {
            if (Math.abs(b.mag - Math.log10(a.mag)) > 17) return a;
            {
                let magdiff = Math.pow(10, Math.log10(a.mag) - b.mag), mantissa = b.sign + a.sign * magdiff;
                return FC(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
            }
        }
        if (1 === layera && 0 === layerb) {
            if (Math.abs(a.mag - Math.log10(b.mag)) > 17) return a;
            {
                let magdiff = Math.pow(10, a.mag - Math.log10(b.mag)), mantissa = b.sign + a.sign * magdiff;
                return FC(Math.sign(mantissa), 1, Math.log10(b.mag) + Math.log10(Math.abs(mantissa)));
            }
        }
        if (Math.abs(a.mag - b.mag) > 17) return a;
        {
            let magdiff = Math.pow(10, a.mag - b.mag), mantissa = b.sign + a.sign * magdiff;
            return FC(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
        }
    }
    plus(value) {
        return this.add(value);
    }
    sub(value) {
        return this.add(D(value).neg());
    }
    subtract(value) {
        return this.sub(value);
    }
    minus(value) {
        return this.sub(value);
    }
    mul(value) {
        let a, b;
        let decimal = D(value);
        if (this.eq(Decimal.dInf) && decimal.eq(Decimal.dNegInf) || this.eq(Decimal.dNegInf) && decimal.eq(Decimal.dInf)) return FC_NN(-1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        if (this.mag == Number.POSITIVE_INFINITY && decimal.eq(Decimal.dZero) || this.eq(Decimal.dZero) && this.mag == Number.POSITIVE_INFINITY) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        if (!Number.isFinite(this.layer)) return new Decimal(this);
        if (!Number.isFinite(decimal.layer)) return new Decimal(decimal);
        if (0 === this.sign || 0 === decimal.sign) return FC_NN(0, 0, 0);
        if (this.layer === decimal.layer && this.mag === -decimal.mag) return FC_NN(this.sign * decimal.sign, 0, 1);
        if (this.layer > decimal.layer || this.layer == decimal.layer && Math.abs(this.mag) > Math.abs(decimal.mag) ? (a = new Decimal(this), b = new Decimal(decimal)) : (a = new Decimal(decimal), b = new Decimal(this)), 0 === a.layer && 0 === b.layer) return Decimal.fromNumber(a.sign * b.sign * a.mag * b.mag);
        if (a.layer >= 3 || a.layer - b.layer >= 2) return FC(a.sign * b.sign, a.layer, a.mag);
        if (1 === a.layer && 0 === b.layer) return FC(a.sign * b.sign, 1, a.mag + Math.log10(b.mag));
        if (1 === a.layer && 1 === b.layer) return FC(a.sign * b.sign, 1, a.mag + b.mag);
        if (2 === a.layer && 1 === b.layer || 2 === a.layer && 2 === b.layer) {
            let newmag = FC(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(FC(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag)));
            return FC(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
        }
        throw Error("Bad arguments to mul: " + this + ", " + value);
    }
    multiply(value) {
        return this.mul(value);
    }
    times(value) {
        return this.mul(value);
    }
    div(value) {
        let decimal = D(value);
        return this.mul(decimal.recip());
    }
    divide(value) {
        return this.div(value);
    }
    divideBy(value) {
        return this.div(value);
    }
    dividedBy(value) {
        return this.div(value);
    }
    recip() {
        return 0 === this.mag ? FC_NN(Number.NaN, Number.NaN, Number.NaN) : this.mag === Number.POSITIVE_INFINITY ? FC_NN(0, 0, 0) : 0 === this.layer ? FC(this.sign, 0, 1 / this.mag) : FC(this.sign, this.layer, -this.mag);
    }
    reciprocal() {
        return this.recip();
    }
    reciprocate() {
        return this.recip();
    }
    mod(value, floored = !1) {
        let vd = D(value), decimal = vd.abs();
        if (this.eq(Decimal.dZero) || decimal.eq(Decimal.dZero)) return FC_NN(0, 0, 0);
        if (floored) {
            let absmod = this.abs().mod(decimal);
            return -1 == this.sign != (-1 == vd.sign) && (absmod = vd.abs().sub(absmod)), absmod.mul(vd.sign);
        }
        let num_this = this.toNumber(), num_decimal = decimal.toNumber();
        return isFinite(num_this) && isFinite(num_decimal) && 0 != num_this && 0 != num_decimal ? new Decimal(num_this % num_decimal) : this.sub(decimal).eq(this) ? FC_NN(0, 0, 0) : decimal.sub(this).eq(decimal) ? new Decimal(this) : -1 == this.sign ? this.abs().mod(decimal).neg() : this.sub(this.div(decimal).floor().mul(decimal));
    }
    modulo(value, floored = !1) {
        return this.mod(value, floored);
    }
    modular(value, floored = !1) {
        return this.mod(value, floored);
    }
    cmp(value) {
        let decimal = D(value);
        return this.sign > decimal.sign ? 1 : this.sign < decimal.sign ? -1 : this.sign * this.cmpabs(value);
    }
    cmpabs(value) {
        let decimal = D(value), layera = this.mag > 0 ? this.layer : -this.layer, layerb = decimal.mag > 0 ? decimal.layer : -decimal.layer;
        return layera > layerb ? 1 : layera < layerb ? -1 : this.mag > decimal.mag ? 1 : this.mag < decimal.mag ? -1 : 0;
    }
    compare(value) {
        return this.cmp(value);
    }
    isNan() {
        return isNaN(this.sign) || isNaN(this.layer) || isNaN(this.mag);
    }
    isFinite() {
        return isFinite(this.sign) && isFinite(this.layer) && isFinite(this.mag);
    }
    eq(value) {
        let decimal = D(value);
        return this.sign === decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag;
    }
    equals(value) {
        return this.eq(value);
    }
    neq(value) {
        return !this.eq(value);
    }
    notEquals(value) {
        return this.neq(value);
    }
    lt(value) {
        return -1 === this.cmp(value);
    }
    lte(value) {
        return !this.gt(value);
    }
    gt(value) {
        return 1 === this.cmp(value);
    }
    gte(value) {
        return !this.lt(value);
    }
    max(value) {
        let decimal = D(value);
        return new Decimal(this.lt(decimal) ? decimal : this);
    }
    min(value) {
        let decimal = D(value);
        return new Decimal(this.gt(decimal) ? decimal : this);
    }
    maxabs(value) {
        let decimal = D(value);
        return new Decimal(0 > this.cmpabs(decimal) ? decimal : this);
    }
    minabs(value) {
        let decimal = D(value);
        return new Decimal(this.cmpabs(decimal) > 0 ? decimal : this);
    }
    clamp(min, max) {
        return this.max(min).min(max);
    }
    clampMin(min) {
        return this.max(min);
    }
    clampMax(max) {
        return this.min(max);
    }
    cmp_tolerance(value, tolerance) {
        let decimal = D(value);
        return this.eq_tolerance(decimal, tolerance) ? 0 : this.cmp(decimal);
    }
    compare_tolerance(value, tolerance) {
        return this.cmp_tolerance(value, tolerance);
    }
    eq_tolerance(value, tolerance) {
        let decimal = D(value);
        if (null == tolerance && (tolerance = 1e-7), this.sign !== decimal.sign || Math.abs(this.layer - decimal.layer) > 1) return !1;
        let magA = this.mag, magB = decimal.mag;
        return this.layer > decimal.layer && (magB = f_maglog10(magB)), this.layer < decimal.layer && (magA = f_maglog10(magA)), Math.abs(magA - magB) <= tolerance * Math.max(Math.abs(magA), Math.abs(magB));
    }
    equals_tolerance(value, tolerance) {
        return this.eq_tolerance(value, tolerance);
    }
    neq_tolerance(value, tolerance) {
        return !this.eq_tolerance(value, tolerance);
    }
    notEquals_tolerance(value, tolerance) {
        return this.neq_tolerance(value, tolerance);
    }
    lt_tolerance(value, tolerance) {
        let decimal = D(value);
        return !this.eq_tolerance(decimal, tolerance) && this.lt(decimal);
    }
    lte_tolerance(value, tolerance) {
        let decimal = D(value);
        return this.eq_tolerance(decimal, tolerance) || this.lt(decimal);
    }
    gt_tolerance(value, tolerance) {
        let decimal = D(value);
        return !this.eq_tolerance(decimal, tolerance) && this.gt(decimal);
    }
    gte_tolerance(value, tolerance) {
        let decimal = D(value);
        return this.eq_tolerance(decimal, tolerance) || this.gt(decimal);
    }
    pLog10() {
        return this.lt(Decimal.dZero) ? FC_NN(0, 0, 0) : this.log10();
    }
    absLog10() {
        return 0 === this.sign ? FC_NN(Number.NaN, Number.NaN, Number.NaN) : this.layer > 0 ? FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag)) : FC(1, 0, Math.log10(this.mag));
    }
    log10() {
        return this.sign <= 0 ? FC_NN(Number.NaN, Number.NaN, Number.NaN) : this.layer > 0 ? FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag)) : FC(this.sign, 0, Math.log10(this.mag));
    }
    log(base) {
        return (base = D(base), this.sign <= 0 || base.sign <= 0) ? FC_NN(Number.NaN, Number.NaN, Number.NaN) : 1 === base.sign && 0 === base.layer && 1 === base.mag ? FC_NN(Number.NaN, Number.NaN, Number.NaN) : 0 === this.layer && 0 === base.layer ? FC(this.sign, 0, Math.log(this.mag) / Math.log(base.mag)) : Decimal.div(this.log10(), base.log10());
    }
    log2() {
        return this.sign <= 0 ? FC_NN(Number.NaN, Number.NaN, Number.NaN) : 0 === this.layer ? FC(this.sign, 0, Math.log2(this.mag)) : 1 === this.layer ? FC(Math.sign(this.mag), 0, 3.321928094887362 * Math.abs(this.mag)) : 2 === this.layer ? FC(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.5213902276543247) : FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    }
    ln() {
        return this.sign <= 0 ? FC_NN(Number.NaN, Number.NaN, Number.NaN) : 0 === this.layer ? FC(this.sign, 0, Math.log(this.mag)) : 1 === this.layer ? FC(Math.sign(this.mag), 0, 2.302585092994046 * Math.abs(this.mag)) : 2 === this.layer ? FC(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.36221568869946325) : FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    }
    logarithm(base) {
        return this.log(base);
    }
    pow(value) {
        let decimal = D(value), a = new Decimal(this), b = new Decimal(decimal);
        if (0 === a.sign) return b.eq(0) ? FC_NN(1, 0, 1) : a;
        if (1 === a.sign && 0 === a.layer && 1 === a.mag) return a;
        if (0 === b.sign) return FC_NN(1, 0, 1);
        if (1 === b.sign && 0 === b.layer && 1 === b.mag) return a;
        let result = a.absLog10().mul(b).pow10();
        return -1 === this.sign ? Math.abs(b.toNumber() % 2) % 2 == 1 ? result.neg() : Math.abs(b.toNumber() % 2) % 2 == 0 ? result : FC_NN(Number.NaN, Number.NaN, Number.NaN) : result;
    }
    pow10() {
        if (this.eq(Decimal.dInf)) return FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        if (this.eq(Decimal.dNegInf)) return FC_NN(0, 0, 0);
        if (!Number.isFinite(this.layer) || !Number.isFinite(this.mag)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        let a = new Decimal(this);
        if (0 === a.layer) {
            let newmag = Math.pow(10, a.sign * a.mag);
            if (Number.isFinite(newmag) && Math.abs(newmag) >= 0.1) return FC(1, 0, newmag);
            if (0 === a.sign) return FC_NN(1, 0, 1);
            a = FC_NN(a.sign, a.layer + 1, Math.log10(a.mag));
        }
        return a.sign > 0 && a.mag >= 0 ? FC(a.sign, a.layer + 1, a.mag) : a.sign < 0 && a.mag >= 0 ? FC(-a.sign, a.layer + 1, -a.mag) : FC_NN(1, 0, 1);
    }
    pow_base(value) {
        return D(value).pow(this);
    }
    root(value) {
        let decimal = D(value);
        return this.pow(decimal.recip());
    }
    factorial() {
        return this.mag < 0 || 0 === this.layer ? this.add(1).gamma() : 1 === this.layer ? Decimal.exp(Decimal.mul(this, Decimal.ln(this).sub(1))) : Decimal.exp(this);
    }
    gamma() {
        if (this.mag < 0) return this.recip();
        if (0 === this.layer) {
            let l;
            if (this.lt(FC_NN(1, 0, 24))) return Decimal.fromNumber(f_gamma(this.sign * this.mag));
            let t = this.mag - 1;
            l = 0.9189385332046727 + (t + 0.5) * Math.log(t) - t;
            let n2 = t * t, np = t, lm = 12 * np, adj = 1 / lm, l2 = l + adj;
            if (l2 === l || (l = l2, np *= n2, (l2 = l - (adj = 1 / (lm = 360 * np))) === l)) return Decimal.exp(l);
            l = l2, np *= n2;
            let lt = 1 / (lm = 1260 * np);
            return l += lt, np *= n2, l -= lt = 1 / (lm = 1680 * np), Decimal.exp(l);
        }
        return 1 === this.layer ? Decimal.exp(Decimal.mul(this, Decimal.ln(this).sub(1))) : Decimal.exp(this);
    }
    lngamma() {
        return this.gamma().ln();
    }
    exp() {
        return this.mag < 0 ? FC_NN(1, 0, 1) : 0 === this.layer && this.mag <= 709.7 ? Decimal.fromNumber(Math.exp(this.sign * this.mag)) : 0 === this.layer ? FC(1, 1, this.sign * Math.log10(Math.E) * this.mag) : 1 === this.layer ? FC(1, 2, this.sign * (Math.log10(0.4342944819032518) + this.mag)) : FC(1, this.layer + 1, this.sign * this.mag);
    }
    sqr() {
        return this.pow(2);
    }
    sqrt() {
        if (0 === this.layer) return Decimal.fromNumber(Math.sqrt(this.sign * this.mag));
        if (1 === this.layer) return FC(1, 2, Math.log10(this.mag) - 0.3010299956639812);
        {
            let result = Decimal.div(FC_NN(this.sign, this.layer - 1, this.mag), FC_NN(1, 0, 2));
            return result.layer += 1, result.normalize(), result;
        }
    }
    cube() {
        return this.pow(3);
    }
    cbrt() {
        return this.pow(1 / 3);
    }
    tetrate(height = 2, payload = FC_NN(1, 0, 1), linear = !1) {
        if (1 === height) return Decimal.pow(this, payload);
        if (0 === height) return new Decimal(payload);
        if (this.eq(Decimal.dOne)) return FC_NN(1, 0, 1);
        if (this.eq(-1)) return Decimal.pow(this, payload);
        if (height === Number.POSITIVE_INFINITY) {
            let this_num = this.toNumber();
            if (this_num <= 1.44466786100976613366 && this_num >= 0.06598803584531253708) {
                let negln = Decimal.ln(this).neg(), lower = negln.lambertw().div(negln);
                if (this_num < 1) return lower;
                let upper = negln.lambertw(!1).div(negln);
                return (this_num > 1.444667861009099 && (lower = upper = Decimal.fromNumber(Math.E)), (payload = D(payload)).eq(upper)) ? upper : payload.lt(upper) ? lower : FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
            }
            return this_num > 1.44466786100976613366 ? FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY) : FC_NN(Number.NaN, Number.NaN, Number.NaN);
        }
        if (this.eq(Decimal.dZero)) {
            let result = Math.abs((height + 1) % 2);
            return result > 1 && (result = 2 - result), Decimal.fromNumber(result);
        }
        if (height < 0) return Decimal.iteratedlog(payload, this, -height, linear);
        payload = new Decimal(payload);
        let oldheight = height, fracheight = oldheight - (height = Math.trunc(height));
        if (this.gt(Decimal.dZero) && (this.lt(1) || this.lte(1.44466786100976613366) && payload.lte(Decimal.ln(this).neg().lambertw(!1).div(Decimal.ln(this).neg()))) && (oldheight > 10000 || !linear)) {
            let limitheight = Math.min(10000, height);
            payload = payload.eq(Decimal.dOne) ? this.pow(fracheight) : this.lt(1) ? payload.pow(1 - fracheight).mul(this.pow(payload).pow(fracheight)) : payload.layeradd(fracheight, this);
            for(let i = 0; i < limitheight; ++i){
                let old_payload = payload;
                if (payload = this.pow(payload), old_payload.eq(payload)) return payload;
            }
            return oldheight > 10000 && Math.ceil(oldheight) % 2 == 1 ? this.pow(payload) : payload;
        }
        0 !== fracheight && (payload.eq(Decimal.dOne) ? this.gt(10) || linear ? payload = this.pow(fracheight) : (payload = Decimal.fromNumber(Decimal.tetrate_critical(this.toNumber(), fracheight)), this.lt(2) && (payload = payload.sub(1).mul(this.minus(1)).plus(1))) : payload = this.eq(10) ? payload.layeradd10(fracheight, linear) : this.lt(1) ? payload.pow(1 - fracheight).mul(this.pow(payload).pow(fracheight)) : payload.layeradd(fracheight, this, linear));
        for(let i = 0; i < height; ++i){
            if (!isFinite((payload = this.pow(payload)).layer) || !isFinite(payload.mag)) return payload.normalize();
            if (payload.layer - this.layer > 3) return FC_NN(payload.sign, payload.layer + (height - i - 1), payload.mag);
            if (i > 10000) break;
        }
        return payload;
    }
    iteratedexp(height = 2, payload = FC_NN(1, 0, 1), linear = !1) {
        return this.tetrate(height, payload, linear);
    }
    iteratedlog(base = 10, times = 1, linear = !1) {
        if (times < 0) return Decimal.tetrate(base, -times, this, linear);
        base = D(base);
        let result = Decimal.fromDecimal(this), fraction = times - (times = Math.trunc(times));
        if (result.layer - base.layer > 3) {
            let layerloss = Math.min(times, result.layer - base.layer - 3);
            times -= layerloss, result.layer -= layerloss;
        }
        for(let i = 0; i < times; ++i){
            if (!isFinite((result = result.log(base)).layer) || !isFinite(result.mag)) return result.normalize();
            if (i > 10000) return result;
        }
        return fraction > 0 && fraction < 1 && (result = base.eq(10) ? result.layeradd10(-fraction, linear) : result.layeradd(-fraction, base, linear)), result;
    }
    slog(base = 10, iterations = 100, linear = !1) {
        let step_size = 0.001, has_changed_directions_once = !1, previously_rose = !1, result = this.slog_internal(base, linear).toNumber();
        for(let i = 1; i < iterations; ++i){
            let currently_rose = new Decimal(base).tetrate(result, Decimal.dOne, linear).gt(this);
            if (i > 1 && previously_rose != currently_rose && (has_changed_directions_once = !0), previously_rose = currently_rose, has_changed_directions_once ? step_size /= 2 : step_size *= 2, result += step_size = Math.abs(step_size) * (currently_rose ? -1 : 1), 0 === step_size) break;
        }
        return Decimal.fromNumber(result);
    }
    slog_internal(base = 10, linear = !1) {
        if ((base = D(base)).lte(Decimal.dZero) || base.eq(Decimal.dOne)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        if (base.lt(Decimal.dOne)) return this.eq(Decimal.dOne) ? FC_NN(0, 0, 0) : this.eq(Decimal.dZero) ? FC_NN(-1, 0, 1) : FC_NN(Number.NaN, Number.NaN, Number.NaN);
        if (this.mag < 0 || this.eq(Decimal.dZero)) return FC_NN(-1, 0, 1);
        if (base.lt(1.44466786100976613366)) {
            let negln = Decimal.ln(base).neg(), infTower = negln.lambertw().div(negln);
            if (this.eq(infTower)) return FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
            if (this.gt(infTower)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        }
        let result = 0, copy = Decimal.fromDecimal(this);
        if (copy.layer - base.layer > 3) {
            let layerloss = copy.layer - base.layer - 3;
            result += layerloss, copy.layer -= layerloss;
        }
        for(let i = 0; i < 100; ++i)if (copy.lt(Decimal.dZero)) copy = Decimal.pow(base, copy), result -= 1;
        else if (copy.lte(Decimal.dOne)) {
            if (linear) return Decimal.fromNumber(result + copy.toNumber() - 1);
            return Decimal.fromNumber(result + Decimal.slog_critical(base.toNumber(), copy.toNumber()));
        } else result += 1, copy = Decimal.log(copy, base);
        return Decimal.fromNumber(result);
    }
    static slog_critical(base, height) {
        return base > 10 ? height - 1 : Decimal.critical_section(base, height, critical_slog_values);
    }
    static tetrate_critical(base, height) {
        return Decimal.critical_section(base, height, critical_tetr_values);
    }
    static critical_section(base, height, grid, linear = !1) {
        (height *= 10) < 0 && (height = 0), height > 10 && (height = 10), base < 2 && (base = 2), base > 10 && (base = 10);
        let lower = 0, upper = 0;
        for(let i = 0; i < critical_headers.length; ++i){
            if (critical_headers[i] == base) {
                lower = grid[i][Math.floor(height)], upper = grid[i][Math.ceil(height)];
                break;
            }
            if (critical_headers[i] < base && critical_headers[i + 1] > base) {
                let basefrac = (base - critical_headers[i]) / (critical_headers[i + 1] - critical_headers[i]);
                lower = grid[i][Math.floor(height)] * (1 - basefrac) + grid[i + 1][Math.floor(height)] * basefrac, upper = grid[i][Math.ceil(height)] * (1 - basefrac) + grid[i + 1][Math.ceil(height)] * basefrac;
                break;
            }
        }
        let frac = height - Math.floor(height);
        return lower <= 0 || upper <= 0 ? lower * (1 - frac) + upper * frac : Math.pow(base, Math.log(lower) / Math.log(base) * (1 - frac) + Math.log(upper) / Math.log(base) * frac);
    }
    layeradd10(diff, linear = !1) {
        diff = Decimal.fromValue_noAlloc(diff).toNumber();
        let result = Decimal.fromDecimal(this);
        if (diff >= 1) {
            result.mag < 0 && result.layer > 0 ? (result.sign = 0, result.mag = 0, result.layer = 0) : -1 === result.sign && 0 == result.layer && (result.sign = 1, result.mag = -result.mag);
            let layeradd = Math.trunc(diff);
            diff -= layeradd, result.layer += layeradd;
        }
        if (diff <= -1) {
            let layeradd = Math.trunc(diff);
            if (diff -= layeradd, result.layer += layeradd, result.layer < 0) for(let i = 0; i < 100; ++i){
                if (result.layer++, result.mag = Math.log10(result.mag), !isFinite(result.mag)) return 0 === result.sign && (result.sign = 1), result.layer < 0 && (result.layer = 0), result.normalize();
                if (result.layer >= 0) break;
            }
        }
        for(; result.layer < 0;)result.layer++, result.mag = Math.log10(result.mag);
        return (0 === result.sign && (result.sign = 1, 0 === result.mag && result.layer >= 1 && (result.layer -= 1, result.mag = 1)), result.normalize(), 0 !== diff) ? result.layeradd(diff, 10, linear) : result;
    }
    layeradd(diff, base, linear = !1) {
        let baseD = D(base);
        if (baseD.gt(1) && baseD.lte(1.44466786100976613366)) {
            let excessSlog = Decimal.excess_slog(this, base, linear), slogthis = excessSlog[0].toNumber(), range = excessSlog[1], slogdest = slogthis + diff, negln = Decimal.ln(base).neg(), lower = negln.lambertw().div(negln), upper = negln.lambertw(!1).div(negln), slogzero = Decimal.dOne;
            1 == range ? slogzero = lower.mul(upper).sqrt() : 2 == range && (slogzero = upper.mul(2));
            let slogone = baseD.pow(slogzero), wholeheight = Math.floor(slogdest), fracheight = slogdest - wholeheight, towertop = slogzero.pow(1 - fracheight).mul(slogone.pow(fracheight));
            return Decimal.tetrate(baseD, wholeheight, towertop, linear);
        }
        let slogdest = this.slog(base, 100, linear).toNumber() + diff;
        return slogdest >= 0 ? Decimal.tetrate(base, slogdest, Decimal.dOne, linear) : Number.isFinite(slogdest) ? slogdest >= -1 ? Decimal.log(Decimal.tetrate(base, slogdest + 1, Decimal.dOne, linear), base) : Decimal.log(Decimal.log(Decimal.tetrate(base, slogdest + 2, Decimal.dOne, linear), base), base) : FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    static excess_slog(value, base, linear = !1) {
        value = D(value);
        let baseD = base = D(base);
        if (1 == (base = base.toNumber()) || base <= 0) return [
            FC_NN(Number.NaN, Number.NaN, Number.NaN),
            0
        ];
        if (base > 1.44466786100976613366) return [
            value.slog(base, 100, linear),
            0
        ];
        let negln = Decimal.ln(base).neg(), lower = negln.lambertw().div(negln), upper = Decimal.dInf;
        if (base > 1 && (upper = negln.lambertw(!1).div(negln)), base > 1.444667861009099 && (lower = upper = Decimal.fromNumber(Math.E)), value.lt(lower)) return [
            value.slog(base, 100, linear),
            0
        ];
        if (value.eq(lower)) return [
            FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
            0
        ];
        if (value.eq(upper)) return [
            FC_NN(1, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY),
            2
        ];
        if (value.gt(upper)) {
            let slogzero = upper.mul(2), slogone = baseD.pow(slogzero), estimate = 0;
            if (value.gte(slogzero) && value.lt(slogone)) estimate = 0;
            else if (value.gte(slogone)) {
                let payload = slogone;
                for(estimate = 1; payload.lt(value);)if (payload = baseD.pow(payload), estimate += 1, payload.layer > 3) {
                    let layersleft = Math.floor(value.layer - payload.layer + 1);
                    payload = baseD.iteratedexp(layersleft, payload, linear), estimate += layersleft;
                }
                payload.gt(value) && (payload = payload.log(base), estimate -= 1);
            } else if (value.lt(slogzero)) {
                let payload = slogzero;
                for(estimate = 0; payload.gt(value);)payload = payload.log(base), estimate -= 1;
            }
            let fracheight = 0, tested = 0, step_size = 0.5, towertop = slogzero, guess = Decimal.dZero;
            for(; step_size > 1e-16;){
                if (tested = fracheight + step_size, towertop = slogzero.pow(1 - tested).mul(slogone.pow(tested)), (guess = Decimal.iteratedexp(base, estimate, towertop)).eq(value)) return [
                    new Decimal(estimate + tested),
                    2
                ];
                guess.lt(value) && (fracheight += step_size), step_size /= 2;
            }
            return guess.neq_tolerance(value, 1e-7) ? [
                FC_NN(Number.NaN, Number.NaN, Number.NaN),
                0
            ] : [
                new Decimal(estimate + fracheight),
                2
            ];
        }
        if (value.lt(upper) && value.gt(lower)) {
            let slogzero = lower.mul(upper).sqrt(), slogone = baseD.pow(slogzero), estimate = 0;
            if (value.lte(slogzero) && value.gt(slogone)) estimate = 0;
            else if (value.lte(slogone)) {
                let payload = slogone;
                for(estimate = 1; payload.gt(value);)payload = baseD.pow(payload), estimate += 1;
                payload.lt(value) && (payload = payload.log(base), estimate -= 1);
            } else if (value.gt(slogzero)) {
                let payload = slogzero;
                for(estimate = 0; payload.lt(value);)payload = payload.log(base), estimate -= 1;
            }
            let fracheight = 0, tested = 0, step_size = 0.5, towertop = slogzero, guess = Decimal.dZero;
            for(; step_size > 1e-16;){
                if (tested = fracheight + step_size, towertop = slogzero.pow(1 - tested).mul(slogone.pow(tested)), (guess = Decimal.iteratedexp(base, estimate, towertop)).eq(value)) return [
                    new Decimal(estimate + tested),
                    1
                ];
                guess.gt(value) && (fracheight += step_size), step_size /= 2;
            }
            return guess.neq_tolerance(value, 1e-7) ? [
                FC_NN(Number.NaN, Number.NaN, Number.NaN),
                0
            ] : [
                new Decimal(estimate + fracheight),
                1
            ];
        }
        throw Error("Unhandled behavior in excess_slog");
    }
    lambertw(principal = !0) {
        if (this.lt(-0.3678794411710499)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        if (principal) return this.abs().lt("1e-300") ? new Decimal(this) : this.mag < 0 ? Decimal.fromNumber(f_lambertw(this.toNumber())) : 0 === this.layer ? Decimal.fromNumber(f_lambertw(this.sign * this.mag)) : this.lt("eee15") ? d_lambertw(this) : this.ln();
        return 1 === this.sign ? FC_NN(Number.NaN, Number.NaN, Number.NaN) : 0 === this.layer ? Decimal.fromNumber(f_lambertw(this.sign * this.mag, 1e-10, !1)) : 1 == this.layer ? d_lambertw(this, 1e-10, !1) : this.neg().recip().lambertw().neg();
    }
    ssqrt() {
        return this.linear_sroot(2);
    }
    linear_sroot(degree) {
        if (1 == degree) return this;
        if (this.eq(Decimal.dInf)) return FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        if (!this.isFinite()) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        if (degree > 0 && degree < 1) return this.root(degree);
        if (degree > -2 && degree < -1) return Decimal.fromNumber(degree).add(2).pow(this.recip());
        if (degree <= 0) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        if (degree == Number.POSITIVE_INFINITY) {
            let this_num = this.toNumber();
            return this_num < Math.E && this_num > 0.36787944117144232159553 ? this.pow(this.recip()) : FC_NN(Number.NaN, Number.NaN, Number.NaN);
        }
        if (this.eq(1)) return FC_NN(1, 0, 1);
        if (this.lt(0)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        if (this.lte("1ee-16")) return degree % 2 == 1 ? new Decimal(this) : FC_NN(Number.NaN, Number.NaN, Number.NaN);
        if (this.gt(1)) {
            let upperBound = Decimal.dTen;
            this.gte(Decimal.tetrate(10, degree, 1, !0)) && (upperBound = this.iteratedlog(10, degree - 1, !0)), degree <= 1 && (upperBound = this.root(degree));
            let lower = Decimal.dZero, layer = upperBound.layer, upper = upperBound.iteratedlog(10, layer, !0), previous = upper, guess = upper.div(2), loopGoing = !0;
            for(; loopGoing;)guess = lower.add(upper).div(2), Decimal.iteratedexp(10, layer, guess, !0).tetrate(degree, 1, !0).gt(this) ? upper = guess : lower = guess, guess.eq(previous) ? loopGoing = !1 : previous = guess;
            return Decimal.iteratedexp(10, layer, guess, !0);
        }
        {
            let stage = 1, minimum = FC(1, 10, 1), maximum = FC(1, 10, 1), lower = FC(1, 10, 1), upper = FC(1, 1, -16), prevspan = Decimal.dZero, difference = FC(1, 10, 1), upperBound = upper.pow10().recip(), distance = Decimal.dZero, prevPoint = upperBound, nextPoint = upperBound, evenDegree = Math.ceil(degree) % 2 == 0, range = 0, lastValid = FC(1, 10, 1), infLoopDetector = !1, previousUpper = Decimal.dZero, decreasingFound = !1;
            for(; stage < 4;){
                if (2 == stage) {
                    if (evenDegree) break;
                    lower = FC(1, 10, 1), upper = minimum, stage = 3, difference = FC(1, 10, 1), lastValid = FC(1, 10, 1);
                }
                for(infLoopDetector = !1; upper.neq(lower);){
                    if (previousUpper = upper, upper.pow10().recip().tetrate(degree, 1, !0).eq(1) && upper.pow10().recip().lt(0.4)) upperBound = upper.pow10().recip(), prevPoint = upper.pow10().recip(), nextPoint = upper.pow10().recip(), distance = Decimal.dZero, range = -1, 3 == stage && (lastValid = upper);
                    else if (upper.pow10().recip().tetrate(degree, 1, !0).eq(upper.pow10().recip()) && !evenDegree && upper.pow10().recip().lt(0.4)) upperBound = upper.pow10().recip(), prevPoint = upper.pow10().recip(), nextPoint = upper.pow10().recip(), distance = Decimal.dZero, range = 0;
                    else if (upper.pow10().recip().tetrate(degree, 1, !0).eq(upper.pow10().recip().mul(2).tetrate(degree, 1, !0))) upperBound = upper.pow10().recip(), prevPoint = Decimal.dZero, nextPoint = upperBound.mul(2), distance = upperBound, range = evenDegree ? -1 : 0;
                    else {
                        for(prevspan = upper.mul(1.2e-16), upperBound = upper.pow10().recip(), prevPoint = upper.add(prevspan).pow10().recip(), distance = upperBound.sub(prevPoint), nextPoint = upperBound.add(distance); prevPoint.tetrate(degree, 1, !0).eq(upperBound.tetrate(degree, 1, !0)) || nextPoint.tetrate(degree, 1, !0).eq(upperBound.tetrate(degree, 1, !0)) || prevPoint.gte(upperBound) || nextPoint.lte(upperBound);)prevspan = prevspan.mul(2), prevPoint = upper.add(prevspan).pow10().recip(), distance = upperBound.sub(prevPoint), nextPoint = upperBound.add(distance);
                        if ((1 == stage && nextPoint.tetrate(degree, 1, !0).gt(upperBound.tetrate(degree, 1, !0)) && prevPoint.tetrate(degree, 1, !0).gt(upperBound.tetrate(degree, 1, !0)) || 3 == stage && nextPoint.tetrate(degree, 1, !0).lt(upperBound.tetrate(degree, 1, !0)) && prevPoint.tetrate(degree, 1, !0).lt(upperBound.tetrate(degree, 1, !0))) && (lastValid = upper), nextPoint.tetrate(degree, 1, !0).lt(upperBound.tetrate(degree, 1, !0))) range = -1;
                        else if (evenDegree) range = 1;
                        else if (3 == stage && upper.gt_tolerance(minimum, 1e-8)) range = 0;
                        else {
                            for(; prevPoint.tetrate(degree, 1, !0).eq_tolerance(upperBound.tetrate(degree, 1, !0), 1e-8) || nextPoint.tetrate(degree, 1, !0).eq_tolerance(upperBound.tetrate(degree, 1, !0), 1e-8) || prevPoint.gte(upperBound) || nextPoint.lte(upperBound);)prevspan = prevspan.mul(2), prevPoint = upper.add(prevspan).pow10().recip(), distance = upperBound.sub(prevPoint), nextPoint = upperBound.add(distance);
                            range = nextPoint.tetrate(degree, 1, !0).sub(upperBound.tetrate(degree, 1, !0)).lt(upperBound.tetrate(degree, 1, !0).sub(prevPoint.tetrate(degree, 1, !0))) ? 0 : 1;
                        }
                    }
                    if (-1 == range && (decreasingFound = !0), 1 == stage && 1 == range || 3 == stage && 0 != range) {
                        if (lower.eq(FC(1, 10, 1))) upper = upper.mul(2);
                        else {
                            let cutOff = !1;
                            if (infLoopDetector && (1 == range && 1 == stage || -1 == range && 3 == stage) && (cutOff = !0), upper = upper.add(lower).div(2), cutOff) break;
                        }
                    } else if (lower.eq(FC(1, 10, 1))) lower = upper, upper = upper.div(2);
                    else {
                        let cutOff = !1;
                        if (infLoopDetector && (1 == range && 1 == stage || -1 == range && 3 == stage) && (cutOff = !0), lower = lower.sub(difference), upper = upper.sub(difference), cutOff) break;
                    }
                    if (lower.sub(upper).div(2).abs().gt(difference.mul(1.5)) && (infLoopDetector = !0), difference = lower.sub(upper).div(2).abs(), upper.gt("1e18") || upper.eq(previousUpper)) break;
                }
                if (upper.gt("1e18") || !decreasingFound || lastValid == FC(1, 10, 1)) break;
                1 == stage ? minimum = lastValid : 3 == stage && (maximum = lastValid), stage++;
            }
            lower = minimum;
            let previous = upper = FC(1, 1, -18), guess = Decimal.dZero, loopGoing = !0;
            for(; loopGoing;)if (guess = lower.eq(FC(1, 10, 1)) ? upper.mul(2) : lower.add(upper).div(2), Decimal.pow(10, guess).recip().tetrate(degree, 1, !0).gt(this) ? upper = guess : lower = guess, guess.eq(previous) ? loopGoing = !1 : previous = guess, upper.gt("1e18")) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
            if (!guess.eq_tolerance(minimum, 1e-15)) return guess.pow10().recip();
            if (maximum.eq(FC(1, 10, 1))) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
            for(lower = FC(1, 10, 1), previous = upper = maximum, guess = Decimal.dZero, loopGoing = !0; loopGoing;)if (guess = lower.eq(FC(1, 10, 1)) ? upper.mul(2) : lower.add(upper).div(2), Decimal.pow(10, guess).recip().tetrate(degree, 1, !0).gt(this) ? upper = guess : lower = guess, guess.eq(previous) ? loopGoing = !1 : previous = guess, upper.gt("1e18")) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
            return guess.pow10().recip();
        }
    }
    static increasingInverse(func, decreasing = !1, iterations = 120, minX = Decimal.dLayerMax.neg(), maxX = Decimal.dLayerMax, minY = Decimal.dLayerMax.neg(), maxY = Decimal.dLayerMax) {
        return function(value) {
            let reciprocal;
            if (value = new Decimal(value), minX = new Decimal(minX), maxX = new Decimal(maxX), minY = new Decimal(minY), maxY = new Decimal(maxY), value.isNan() || maxX.lt(minX) || value.lt(minY) || value.gt(maxY)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
            let rangeApply = function(value) {
                return new Decimal(value);
            }, currentCheck = !0;
            if (maxX.lt(0)) currentCheck = !1;
            else if (minX.gt(0)) currentCheck = !0;
            else {
                let valCheck = func(Decimal.dZero);
                if (valCheck.eq(value)) return FC_NN(0, 0, 0);
                currentCheck = value.gt(valCheck), decreasing && (currentCheck = !currentCheck);
            }
            let positive = currentCheck;
            if (currentCheck) {
                if (maxX.lt(FIRST_NEG_LAYER)) currentCheck = !0;
                else if (minX.gt(FIRST_NEG_LAYER)) currentCheck = !1;
                else {
                    let valCheck = func(new Decimal(FIRST_NEG_LAYER));
                    currentCheck = value.lt(valCheck), decreasing && (currentCheck = !currentCheck);
                }
                if (currentCheck) {
                    reciprocal = !0;
                    let limit = Decimal.pow(10, 9e15).recip();
                    if (maxX.lt(limit)) currentCheck = !1;
                    else if (minX.gt(limit)) currentCheck = !0;
                    else {
                        let valCheck = func(new Decimal(limit));
                        currentCheck = value.gt(valCheck), decreasing && (currentCheck = !currentCheck);
                    }
                    if (currentCheck) rangeApply = function(value) {
                        return Decimal.pow(10, value).recip();
                    };
                    else {
                        let limit = Decimal.tetrate(10, 9e15);
                        if (maxX.lt(limit)) currentCheck = !1;
                        else if (minX.gt(limit)) currentCheck = !0;
                        else {
                            let valCheck = func(new Decimal(limit));
                            currentCheck = value.gt(valCheck), decreasing && (currentCheck = !currentCheck);
                        }
                        rangeApply = currentCheck ? function(value) {
                            return Decimal.tetrate(10, new Decimal(value).toNumber()).recip();
                        } : function(value) {
                            return new Decimal(value).gt(Math.log10(Number.MAX_VALUE)) ? Decimal.dZero : Decimal.tetrate(10, Decimal.pow(10, value).toNumber()).recip();
                        };
                    }
                } else {
                    if (reciprocal = !1, maxX.lt(9e15)) currentCheck = !0;
                    else if (minX.gt(9e15)) currentCheck = !1;
                    else {
                        let valCheck = func(new Decimal(9e15));
                        currentCheck = value.lt(valCheck), decreasing && (currentCheck = !currentCheck);
                    }
                    if (currentCheck) rangeApply = function(value) {
                        return new Decimal(value);
                    };
                    else {
                        let limit = Decimal.pow(10, 9e15);
                        if (maxX.lt(limit)) currentCheck = !0;
                        else if (minX.gt(limit)) currentCheck = !1;
                        else {
                            let valCheck = func(new Decimal(limit));
                            currentCheck = value.lt(valCheck), decreasing && (currentCheck = !currentCheck);
                        }
                        if (currentCheck) rangeApply = function(value) {
                            return Decimal.pow(10, value);
                        };
                        else {
                            let limit = Decimal.tetrate(10, 9e15);
                            if (maxX.lt(limit)) currentCheck = !0;
                            else if (minX.gt(limit)) currentCheck = !1;
                            else {
                                let valCheck = func(new Decimal(limit));
                                currentCheck = value.lt(valCheck), decreasing && (currentCheck = !currentCheck);
                            }
                            rangeApply = currentCheck ? function(value) {
                                return Decimal.tetrate(10, new Decimal(value).toNumber());
                            } : function(value) {
                                return new Decimal(value).gt(Math.log10(Number.MAX_VALUE)) ? Decimal.dInf : Decimal.tetrate(10, Decimal.pow(10, value).toNumber());
                            };
                        }
                    }
                }
            } else {
                if (reciprocal = !0, maxX.lt(-FIRST_NEG_LAYER)) currentCheck = !1;
                else if (minX.gt(-FIRST_NEG_LAYER)) currentCheck = !0;
                else {
                    let valCheck = func(new Decimal(-FIRST_NEG_LAYER));
                    currentCheck = value.gt(valCheck), decreasing && (currentCheck = !currentCheck);
                }
                if (currentCheck) {
                    let limit = Decimal.pow(10, 9e15).recip().neg();
                    if (maxX.lt(limit)) currentCheck = !0;
                    else if (minX.gt(limit)) currentCheck = !1;
                    else {
                        let valCheck = func(new Decimal(limit));
                        currentCheck = value.lt(valCheck), decreasing && (currentCheck = !currentCheck);
                    }
                    if (currentCheck) rangeApply = function(value) {
                        return Decimal.pow(10, value).recip().neg();
                    };
                    else {
                        let limit = Decimal.tetrate(10, 9e15).neg();
                        if (maxX.lt(limit)) currentCheck = !0;
                        else if (minX.gt(limit)) currentCheck = !1;
                        else {
                            let valCheck = func(new Decimal(limit));
                            currentCheck = value.lt(valCheck), decreasing && (currentCheck = !currentCheck);
                        }
                        rangeApply = currentCheck ? function(value) {
                            return Decimal.tetrate(10, new Decimal(value).toNumber()).recip().neg();
                        } : function(value) {
                            return new Decimal(value).gt(Math.log10(Number.MAX_VALUE)) ? Decimal.dZero : Decimal.tetrate(10, Decimal.pow(10, value).toNumber()).recip().neg();
                        };
                    }
                } else {
                    if (reciprocal = !1, maxX.lt(-9000000000000000)) currentCheck = !1;
                    else if (minX.gt(-9000000000000000)) currentCheck = !0;
                    else {
                        let valCheck = func(new Decimal(-9000000000000000));
                        currentCheck = value.gt(valCheck), decreasing && (currentCheck = !currentCheck);
                    }
                    if (currentCheck) rangeApply = function(value) {
                        return Decimal.neg(value);
                    };
                    else {
                        let limit = Decimal.pow(10, 9e15).neg();
                        if (maxX.lt(limit)) currentCheck = !1;
                        else if (minX.gt(limit)) currentCheck = !0;
                        else {
                            let valCheck = func(new Decimal(limit));
                            currentCheck = value.gt(valCheck), decreasing && (currentCheck = !currentCheck);
                        }
                        if (currentCheck) rangeApply = function(value) {
                            return Decimal.pow(10, value).neg();
                        };
                        else {
                            let limit = Decimal.tetrate(10, 9e15).neg();
                            if (maxX.lt(limit)) currentCheck = !1;
                            else if (minX.gt(limit)) currentCheck = !0;
                            else {
                                let valCheck = func(new Decimal(limit));
                                currentCheck = value.gt(valCheck), decreasing && (currentCheck = !currentCheck);
                            }
                            rangeApply = currentCheck ? function(value) {
                                return Decimal.tetrate(10, new Decimal(value).toNumber()).neg();
                            } : function(value) {
                                return new Decimal(value).gt(Math.log10(Number.MAX_VALUE)) ? Decimal.dNegInf : Decimal.tetrate(10, Decimal.pow(10, value).toNumber()).neg();
                            };
                        }
                    }
                }
            }
            let searchIncreasing = positive != reciprocal != decreasing, comparative = searchIncreasing ? function(a, b) {
                return Decimal.gt(a, b);
            } : function(a, b) {
                return Decimal.lt(a, b);
            }, step_size = 0.001, has_changed_directions_once = !1, previously_rose = !1, result = 1, appliedResult = Decimal.dOne, oldresult = 0, critical = !1;
            for(var i = 1; i < iterations; ++i){
                critical = !1, oldresult = result, (appliedResult = rangeApply(result)).gt(maxX) && (appliedResult = maxX, critical = !0), appliedResult.lt(minX) && (appliedResult = minX, critical = !0);
                let new_decimal = func(appliedResult);
                if (new_decimal.eq(value) && !critical) break;
                let currently_rose = comparative(new_decimal, value);
                if (i > 1 && previously_rose != currently_rose && (has_changed_directions_once = !0), previously_rose = currently_rose, has_changed_directions_once ? step_size /= 2 : step_size *= 2, currently_rose != searchIncreasing && appliedResult.eq(maxX) || currently_rose == searchIncreasing && appliedResult.eq(minX)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
                if (result += step_size = Math.abs(step_size) * (currently_rose ? -1 : 1), 0 === step_size || oldresult == result) break;
            }
            return rangeApply(result);
        };
    }
    pentate(height = 2, payload = FC_NN(1, 0, 1), linear = !1) {
        payload = new Decimal(payload);
        let oldheight = height, fracheight = oldheight - (height = Math.floor(height)), prevpayload = Decimal.dZero, prevtwopayload = Decimal.dZero;
        if (0 !== fracheight) {
            if (!payload.eq(Decimal.dOne)) return this.pentate(payload.penta_log(this, void 0, linear).plus(oldheight).toNumber(), 1, linear);
            ++height, payload = Decimal.fromNumber(fracheight);
        }
        if (height > 0) for(let i = 0; i < height;){
            if (prevtwopayload = prevpayload, prevpayload = payload, payload = this.tetrate(payload.toNumber(), Decimal.dOne, linear), ++i, this.gt(0) && this.lte(1) && payload.gt(0) && payload.lte(1)) return this.tetrate(height - i, payload, linear);
            if (payload.eq(prevpayload) || payload.eq(prevtwopayload) && i % 2 == height % 2 || !isFinite(payload.layer) || !isFinite(payload.mag)) return payload.normalize();
            if (i > 10000) break;
        }
        else for(let i = 0; i < -height; ++i){
            if (prevpayload = payload, (payload = payload.slog(this, void 0, linear)).eq(prevpayload) || !isFinite(payload.layer) || !isFinite(payload.mag)) return payload.normalize();
            if (i > 100) break;
        }
        return payload;
    }
    penta_log(base = 10, iterations = 100, linear = !1) {
        if ((base = new Decimal(base)).lte(1)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        if (this.eq(1)) return FC_NN(0, 0, 0);
        if (this.eq(Decimal.dInf)) return FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        let value = new Decimal(1), result = 0, step_size = 1;
        if (this.lt(-1)) {
            if (this.lte(-2)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
            let limitcheck = base.tetrate(this.toNumber(), 1, linear);
            if (this.eq(limitcheck)) return FC_NN(-1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
            if (this.gt(limitcheck)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        }
        if (this.gt(1)) {
            for(; value.lt(this);)if (result++, value = Decimal.tetrate(base, value.toNumber(), 1, linear), result > 1000) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        } else for(; value.gt(this);)if (result--, value = Decimal.slog(value, base, linear), result > 100) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        for(var i = 1; i < iterations; ++i){
            let new_decimal = base.pentate(result, Decimal.dOne, linear);
            if (new_decimal.eq(this) || (result += step_size = Math.abs(step_size) * (new_decimal.gt(this) ? -1 : 1), 0 == (step_size /= 2))) break;
        }
        return Decimal.fromNumber(result);
    }
    linear_penta_root(degree) {
        return 1 == degree ? this : degree < 0 ? FC_NN(Number.NaN, Number.NaN, Number.NaN) : this.eq(Decimal.dInf) ? FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY) : this.isFinite() ? degree > 0 && degree < 1 ? this.root(degree) : this.eq(1) ? FC_NN(1, 0, 1) : this.lt(0) ? FC_NN(Number.NaN, Number.NaN, Number.NaN) : this.lt(1) ? this.linear_sroot(degree) : Decimal.increasingInverse(function(value) {
            return Decimal.pentate(value, degree, 1, !0);
        })(this) : FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    sin() {
        return this.mag < 0 ? new Decimal(this) : 0 === this.layer ? Decimal.fromNumber(Math.sin(this.sign * this.mag)) : FC_NN(0, 0, 0);
    }
    cos() {
        return this.mag < 0 ? FC_NN(1, 0, 1) : 0 === this.layer ? Decimal.fromNumber(Math.cos(this.sign * this.mag)) : FC_NN(0, 0, 0);
    }
    tan() {
        return this.mag < 0 ? new Decimal(this) : 0 === this.layer ? Decimal.fromNumber(Math.tan(this.sign * this.mag)) : FC_NN(0, 0, 0);
    }
    asin() {
        return this.mag < 0 ? new Decimal(this) : 0 === this.layer ? Decimal.fromNumber(Math.asin(this.sign * this.mag)) : FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    acos() {
        return this.mag < 0 ? Decimal.fromNumber(Math.acos(this.toNumber())) : 0 === this.layer ? Decimal.fromNumber(Math.acos(this.sign * this.mag)) : FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    atan() {
        return this.mag < 0 ? new Decimal(this) : 0 === this.layer ? Decimal.fromNumber(Math.atan(this.sign * this.mag)) : Decimal.fromNumber(Math.atan(1.8e308 * this.sign));
    }
    sinh() {
        return this.exp().sub(this.negate().exp()).div(2);
    }
    cosh() {
        return this.exp().add(this.negate().exp()).div(2);
    }
    tanh() {
        return this.sinh().div(this.cosh());
    }
    asinh() {
        return Decimal.ln(this.add(this.sqr().add(1).sqrt()));
    }
    acosh() {
        return Decimal.ln(this.add(this.sqr().sub(1).sqrt()));
    }
    atanh() {
        return this.abs().gte(1) ? FC_NN(Number.NaN, Number.NaN, Number.NaN) : Decimal.ln(this.add(1).div(Decimal.fromNumber(1).sub(this))).div(2);
    }
    ascensionPenalty(ascensions) {
        return 0 === ascensions ? new Decimal(this) : this.root(Decimal.pow(10, ascensions));
    }
    egg() {
        return this.add(9);
    }
    lessThanOrEqualTo(other) {
        return 1 > this.cmp(other);
    }
    lessThan(other) {
        return 0 > this.cmp(other);
    }
    greaterThanOrEqualTo(other) {
        return this.cmp(other) > -1;
    }
    greaterThan(other) {
        return this.cmp(other) > 0;
    }
    static smoothDamp(current, target, smoothing, deltaTime) {
        return new Decimal(current).add(new Decimal(target).minus(new Decimal(current)).times(new Decimal(smoothing)).times(new Decimal(deltaTime)));
    }
    clone() {
        return this;
    }
    static clone(x) {
        return Decimal.fromComponents(x.sign, x.layer, x.mag);
    }
    softcap(start, power, mode) {
        let x = this.clone();
        return x.gte(start) && ([
            0,
            "pow"
        ].includes(mode) && (x = x.div(start).pow(power).mul(start)), [
            1,
            "mul"
        ].includes(mode) && (x = x.sub(start).div(power).add(start))), x;
    }
    static softcap(value, start, power, mode) {
        return new Decimal(value).softcap(start, power, mode);
    }
    scale(s, p, mode, rev = !1) {
        s = new Decimal(s), p = new Decimal(p);
        let x = this.clone();
        return x.gte(s) && ([
            0,
            "pow"
        ].includes(mode) && (x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)))), [
            1,
            "exp"
        ].includes(mode) && (x = rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p, x.sub(s)).mul(s))), x;
    }
    static scale(value, s, p, mode, rev = !1) {
        return new Decimal(value).scale(s, p, mode, rev);
    }
    format(acc = 2, max = 9, type = "mixed_sc") {
        return formats.format(this.clone(), acc, max, type);
    }
    static format(e, acc = 2, max = 9, type = "mixed_sc") {
        return formats.format(new Decimal(e), acc, max, type);
    }
    formatST(acc = 2, max = 9, type = "st") {
        return formats.format(this.clone(), acc, max, type);
    }
    static formatST(value, acc = 2, max = 9, type = "st") {
        return formats.format(new Decimal(value), acc, max, type);
    }
    formatGain(gain, type = "mixed_sc", acc, max) {
        return formats.formatGain(this.clone(), gain, type, acc, max);
    }
    static formatGain(value, gain, type = "mixed_sc", acc, max) {
        return formats.formatGain(new Decimal(value), gain, type, acc, max);
    }
    toRoman(max = 5000) {
        max = new Decimal(max);
        let num = this.clone();
        if (num.gte(max) || num.lt(1)) return num;
        let newNum = num.toNumber(), roman = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1
        }, str = "";
        for (let i of Object.keys(roman)){
            let q = Math.floor(newNum / roman[i]);
            newNum -= q * roman[i], str += i.repeat(q);
        }
        return str;
    }
    static toRoman(value, max) {
        return new Decimal(value).toRoman(max);
    }
    static random(min = 0, max = 1) {
        return min = new Decimal(min), max = new Decimal(max), min = min.lt(max) ? min : max, max = max.gt(min) ? max : min, new Decimal(Math.random()).mul(max.sub(min)).add(min);
    }
    static randomProb(rng) {
        return new Decimal(Math.random()).lt(rng);
    }
    constructor(value){
        this.sign = 0, this.mag = 0, this.layer = 0, value instanceof Decimal ? this.fromDecimal(value) : "number" == typeof value ? this.fromNumber(value) : "string" == typeof value && this.fromString(value);
    }
}
Decimal.dZero = FC_NN(0, 0, 0), Decimal.dOne = FC_NN(1, 0, 1), Decimal.dNegOne = FC_NN(-1, 0, 1), Decimal.dTwo = FC_NN(1, 0, 2), Decimal.dTen = FC_NN(1, 0, 10), Decimal.dNaN = FC_NN(Number.NaN, Number.NaN, Number.NaN), Decimal.dInf = FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), Decimal.dNegInf = FC_NN(-1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), Decimal.dNumberMax = FC(1, 0, Number.MAX_VALUE), Decimal.dNumberMin = FC(1, 0, Number.MIN_VALUE), Decimal.dLayerSafeMax = FC(1, Number.MAX_SAFE_INTEGER, 9e15 - 1), Decimal.dLayerSafeMin = FC(1, Number.MAX_SAFE_INTEGER, -(9e15 - 1)), Decimal.dLayerMax = FC(1, Number.MAX_VALUE, 9e15 - 1), Decimal.dLayerMin = FC(1, Number.MAX_VALUE, -(9e15 - 1)), Decimal.fromStringCache = new LRUCache(1023), _ts_decorate$3([
    Expose()
], Decimal.prototype, "sign", void 0), _ts_decorate$3([
    Expose()
], Decimal.prototype, "mag", void 0), _ts_decorate$3([
    Expose()
], Decimal.prototype, "layer", void 0), Decimal = _ts_decorate$3([
    Exclude(),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [
        "undefined" == typeof DecimalSource ? Object : DecimalSource
    ])
], Decimal);
let { formats, FORMATS } = decimalFormatGenerator(Decimal);
Decimal.formats = formats;

class BoostObject {
    get desc() {
        return this.description;
    }
    get description() {
        return this.descriptionFn();
    }
    constructor(init){
        this.id = init.id, this.name = init.name ?? "", this.value = init.value, this.order = init.order ?? 99, this.descriptionFn = init.description ? "function" == typeof init.description ? init.description : ()=>init.description : ()=>"";
    }
}
class Boost {
    getBoosts(id, index) {
        let boostList = [], indexList = [];
        for(let i = 0; i < this.boostArray.length; i++)("string" == typeof id && id === this.boostArray[i].id || id instanceof RegExp && id.test(this.boostArray[i].id)) && (boostList.push(this.boostArray[i]), indexList.push(i));
        return index ? [
            boostList,
            indexList
        ] : boostList;
    }
    getBoost(id) {
        return this.getBoosts(id)[0] ?? null;
    }
    removeBoost(id) {
        for(let i = 0; i < this.boostArray.length; i++)if (id === this.boostArray[i].id) {
            this.boostArray.splice(i, 1);
            break;
        }
    }
    setBoost(arg1, arg2, arg3, arg4, arg5) {
        if (arg1) {
            if ("string" == typeof arg1) {
                let id = arg1, name = arg2 ?? "", description = arg3 ?? "", value = arg4 ?? ((e)=>e), bCheck = this.getBoosts(id, !0);
                bCheck[0][0] ? this.boostArray[bCheck[1][0]] = new BoostObject({
                    id,
                    name,
                    description,
                    value,
                    order: arg5
                }) : this.boostArray.push(new BoostObject({
                    id,
                    name,
                    description,
                    value,
                    order: arg5
                }));
            } else for (let boost of arg1 = Array.isArray(arg1) ? arg1 : [
                arg1
            ]){
                let bCheck = this.getBoosts(boost.id, !0);
                bCheck[0][0] ? this.boostArray[bCheck[1][0]] = new BoostObject(boost) : this.boostArray.push(new BoostObject(boost));
            }
        }
    }
    clearBoosts() {
        this.boostArray.length = 0;
    }
    calculate(base = this.baseEffect) {
        let output = new Decimal(base), boosts = this.boostArray;
        for (let boost of boosts = boosts.sort((a, b)=>a.order - b.order))output = boost.value(output);
        return output;
    }
    constructor(baseEffect = 1, boosts){
        this.addBoost = this.setBoost.bind(this), boosts = boosts ? Array.isArray(boosts) ? boosts : [
            boosts
        ] : void 0, this.baseEffect = new Decimal(baseEffect), this.boostArray = [], boosts && boosts.forEach((boostObj)=>{
            this.boostArray.push(new BoostObject(boostObj));
        });
    }
}

let DEFAULT_ITERATIONS = 30, DEFAULT_TOLERANCE = 0.001;
function mean(a, b, mode = "geometric") {
    switch(a = new Decimal(a), b = new Decimal(b), mode){
        case "arithmetic":
        case 1:
            return a.add(b).div(2);
        case "geometric":
        case 2:
        default:
            return a.mul(b).sqrt();
        case "harmonic":
        case 3:
            return Decimal.dTwo.div(a.reciprocal().add(b.reciprocal()));
        case "logarithmic":
        case 4:
            return Decimal.pow(10, a.log10().mul(b.log10()).sqrt());
    }
}
function equalsTolerance(a, b, tolerance, config) {
    let diff, result;
    return config = Object.assign({}, {
        verbose: !1,
        mode: "geometric"
    }, config), a = new Decimal(a), b = new Decimal(b), tolerance = new Decimal(tolerance), result = "geometric" === config.mode ? (diff = a.sub(b).abs().div(a.abs().add(b.abs()).div(2))).lte(tolerance) : (diff = a.sub(b).abs()).lte(tolerance), !0 !== config.verbose && ("onlyOnFail" !== config.verbose || result) || console.log({
        a,
        b,
        tolerance,
        config,
        diff,
        result
    }), result;
}
function roundingBase(x, base = 10, acc = 0, max = 1000) {
    if (x = new Decimal(x), base = new Decimal(base), acc = new Decimal(acc), max = new Decimal(max), base.lt(1) || acc.lt(1)) return Decimal.dNaN;
    let xSign = x.sign;
    if ((x = x.abs()).gte(Decimal.pow(base, max))) return x;
    let powerN = Decimal.floor(Decimal.log(x, base)), out = x.div(Decimal.pow(base, powerN));
    return (out = (out = out.mul(Decimal.pow(base, acc)).round()).div(Decimal.pow(base, acc))).mul(Decimal.pow(base, powerN)).mul(xSign);
}

function calculateInverseFunction(f, n, options = {}) {
    let { iterations, tolerance, lowerBound, upperBound, round, mode } = options;
    return inverseFunctionApprox(f, n, mode, iterations, tolerance, lowerBound, upperBound, round);
}
function inverseFunctionApprox(f, n, mode = "geometric", iterations = DEFAULT_ITERATIONS, tolerance = DEFAULT_TOLERANCE, lowerBound = 1, upperBound = n, round = !1) {
    if (lowerBound = new Decimal(lowerBound), lowerBound = round ? lowerBound.floor() : lowerBound, upperBound = new Decimal(upperBound), upperBound = round ? upperBound.ceil() : upperBound, lowerBound.gt(upperBound) && ([lowerBound, upperBound] = [
        upperBound,
        lowerBound
    ]), f(upperBound).eq(0)) return {
        value: Decimal.dZero,
        lowerBound: Decimal.dZero,
        upperBound: Decimal.dZero
    };
    if (f(lowerBound).gt(n)) return (console.warn("The interval does not contain the value. (f(lowerBound) > n)", {
        lowerBound,
        upperBound,
        n,
        "f(lowerBound)": f(lowerBound),
        "f(upperBound)": f(upperBound)
    }), lowerBound.eq(0)) ? {
        value: upperBound,
        lowerBound: upperBound,
        upperBound: upperBound
    } : inverseFunctionApprox(f, n, mode, iterations, tolerance, 0, upperBound, round);
    if (f(upperBound).lt(n)) return (console.warn("The interval does not contain the value. (f(upperBound) < n)", {
        lowerBound,
        upperBound,
        n,
        "f(lowerBound)": f(lowerBound),
        "f(upperBound)": f(upperBound)
    }), upperBound.eq(n)) ? {
        value: upperBound,
        lowerBound: upperBound,
        upperBound: upperBound
    } : inverseFunctionApprox(f, n, mode, iterations, tolerance, lowerBound, n, round);
    for(let i = 0; i < iterations; i++){
        let mid = mean(lowerBound, upperBound, mode), midValue = f(mid = round ? mid.floor() : mid);
        if (midValue.lt(n) ? lowerBound = mid : upperBound = mid, midValue.eq(n)) return {
            value: mid,
            lowerBound: mid,
            upperBound: mid
        };
        if (round && upperBound.sub(lowerBound).lte(5)) {
            let closest = upperBound, closestDiff = f(upperBound).sub(n).abs();
            for(let j = lowerBound; j.lte(upperBound); j = j.add(1)){
                let diff = f(j).sub(n).abs();
                diff.lt(closestDiff) && (closest = new Decimal(j), closestDiff = diff);
            }
            return {
                value: closest,
                lowerBound: lowerBound,
                upperBound: upperBound
            };
        }
    }
    return {
        value: lowerBound,
        lowerBound,
        upperBound
    };
}

function calculateSumLoop(f, b, a = 0, epsilon = DEFAULT_TOLERANCE) {
    let sum = new Decimal(), n = new Decimal(b);
    for(; n.gte(a); n = n.sub(1)){
        let initSum = sum, value = f(n);
        sum = sum.add(value);
        let diff = initSum.div(sum);
        if (diff.lte(1) && diff.gt(Decimal.dOne.sub(epsilon))) break;
    }
    return sum;
}
function calculateSumApproxOld(f, b, a = 0, iterations = DEFAULT_ITERATIONS, tolerance = 2 * DEFAULT_TOLERANCE) {
    a = new Decimal(a), b = new Decimal(b);
    let sum = Decimal.dZero, intervalWidth = b.sub(a).div(iterations);
    for(let i = iterations - 1; i >= 0; i--){
        let x0 = a.add(intervalWidth.mul(i)), x1 = a.add(intervalWidth.mul(i + 1));
        sum = sum.add(f(x0).add(f(x1)));
    }
    return sum.div(2).mul(intervalWidth);
}
function calculateSumApprox(f, b, a = 0, iterations = DEFAULT_ITERATIONS - 10) {
    a = new Decimal(a), b = new Decimal(b);
    let sum = Decimal.dZero, intervalWidth = b.sub(a).div(iterations);
    for(let i = iterations - 1; i >= 0; i--)sum = sum.add(f(a.add(intervalWidth.mul(i))));
    return sum.mul(intervalWidth);
}
function calculateSum(f, b, a = 0, epsilon, iterations) {
    return (a = new Decimal(a), (b = new Decimal(b)).sub(a).lte(DEFAULT_ITERATIONS)) ? calculateSumLoop(f, b, a, epsilon) : calculateSumApprox(f, b, a, iterations);
}

function _ts_decorate$2(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)(d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function calculateUpgrade(value, upgrade, start, end = Decimal.dInf, mode, iterations, el = !1) {
    value = new Decimal(value), start = new Decimal(start ?? upgrade.level);
    let target = (end = new Decimal(end)).sub(start);
    if (target.lt(0)) return console.warn("eMath.js: Invalid target for calculateItem: ", target), [
        Decimal.dZero,
        Decimal.dZero
    ];
    if (el = ("function" == typeof upgrade.el ? upgrade.el() : upgrade.el) ?? el, target.eq(1)) {
        let cost = upgrade.cost(upgrade.level), canAfford = value.gte(cost), out = [
            Decimal.dZero,
            Decimal.dZero
        ];
        return el ? (out[0] = canAfford ? Decimal.dOne : Decimal.dZero, out) : out = [
            canAfford ? Decimal.dOne : Decimal.dZero,
            canAfford ? cost : Decimal.dZero
        ];
    }
    if (upgrade.costBulk) {
        let [amount, cost] = upgrade.costBulk(value, upgrade.level, target), canAfford = value.gte(cost);
        return [
            canAfford ? amount : Decimal.dZero,
            canAfford && !el ? cost : Decimal.dZero
        ];
    }
    if (el) return [
        Decimal.min(end, calculateInverseFunction((level)=>upgrade.cost(level.add(start)), value, {
            mode,
            iterations
        }).value.floor()),
        Decimal.dZero
    ];
    let maxLevelAffordable = calculateInverseFunction((x)=>calculateSum(upgrade.cost, x, start), value, {
        mode,
        iterations
    }).value.floor().min(start.add(target).sub(1)), cost = calculateSum(upgrade.cost, maxLevelAffordable, start);
    return [
        maxLevelAffordable.sub(start).add(1).max(0),
        cost
    ];
}
function decimalToJSONString(n) {
    return n = new Decimal(n), `${n.sign}/${n.mag}/${n.layer}`;
}
function upgradeToCacheNameEL(level) {
    return `el/${decimalToJSONString(level)}`;
}
class UpgradeData {
    constructor(init){
        init = init ?? {}, this.id = init.id, this.level = init.level ? new Decimal(init.level) : Decimal.dOne;
    }
}
_ts_decorate$2([
    Expose(),
    function(k, v) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
    }("design:type", String)
], UpgradeData.prototype, "id", void 0), _ts_decorate$2([
    Type(()=>Decimal)
], UpgradeData.prototype, "level", void 0);
class UpgradeStatic {
    get data() {
        return this.dataPointerFn();
    }
    get description() {
        return this.descriptionFn(this.level, this, this.currencyPointerFn());
    }
    set description(value) {
        this.descriptionFn = "function" == typeof value ? value : ()=>value;
    }
    get level() {
        return ((this ?? {
            data: {
                level: Decimal.dOne
            }
        }).data ?? {
            level: Decimal.dOne
        }).level;
    }
    set level(n) {
        this.data.level = new Decimal(n);
    }
    constructor(init, dataPointer, currencyPointer, cacheSize){
        let data = "function" == typeof dataPointer ? dataPointer() : dataPointer;
        this.dataPointerFn = "function" == typeof dataPointer ? dataPointer : ()=>data, this.currencyPointerFn = "function" == typeof currencyPointer ? currencyPointer : ()=>currencyPointer, this.cache = new LRUCache(cacheSize ?? UpgradeStatic.cacheSize), this.id = init.id, this.name = init.name ?? init.id, this.descriptionFn = init.description ? "function" == typeof init.description ? init.description : ()=>init.description : ()=>"", this.cost = init.cost, this.costBulk = init.costBulk, this.maxLevel = init.maxLevel, this.effect = init.effect, this.el = init.el, this.defaultLevel = init.level ?? Decimal.dOne, this.bounds = init.bounds;
    }
}
UpgradeStatic.cacheSize = 15;

function _ts_decorate$1(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)(d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function calculateItem(value, item, tier = Decimal.dOne, target = Decimal.dInf) {
    if (value = new Decimal(value), tier = new Decimal(tier), (target = new Decimal(target)).lt(0)) return console.warn("eMath.js: Invalid target for calculateItem: ", target), [
        Decimal.dZero,
        Decimal.dZero
    ];
    if (target.eq(1)) {
        let cost = item.cost(tier);
        return [
            value.gte(cost) ? Decimal.dOne : Decimal.dZero,
            value.gte(cost) ? cost : Decimal.dZero
        ];
    }
    let maxLevelAffordable = value.div(item.cost(tier)).floor().min(target), cost = item.cost(tier).mul(maxLevelAffordable);
    return [
        maxLevelAffordable,
        cost
    ];
}
class Item {
    get data() {
        return this.dataPointerFn();
    }
    get description() {
        return this.descriptionFn(this.amount, this, this.currencyPointerFn());
    }
    set description(value) {
        this.descriptionFn = "function" == typeof value ? value : ()=>value;
    }
    get amount() {
        return ((this ?? {
            data: {
                amount: Decimal.dOne
            }
        }).data ?? {
            amount: Decimal.dOne
        }).amount;
    }
    set amount(n) {
        this.data.amount = new Decimal(n);
    }
    constructor(init, dataPointer, currencyPointer){
        this.defaultAmount = Decimal.dZero;
        let data = "function" == typeof dataPointer ? dataPointer() : dataPointer;
        this.dataPointerFn = "function" == typeof dataPointer ? dataPointer : ()=>data, this.currencyPointerFn = "function" == typeof currencyPointer ? currencyPointer : ()=>currencyPointer, this.id = init.id, this.name = init.name ?? init.id, this.cost = init.cost, this.effect = init.effect, this.descriptionFn = init.description ? "function" == typeof init.description ? init.description : ()=>init.description : ()=>"", this.defaultAmount = init.amount ?? Decimal.dZero;
    }
}
class ItemData {
    constructor(init){
        init = init ?? {}, this.id = init.id, this.amount = init.amount ?? Decimal.dZero;
    }
}
_ts_decorate$1([
    Expose(),
    function(k, v) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
    }("design:type", String)
], ItemData.prototype, "id", void 0), _ts_decorate$1([
    Type(()=>Decimal)
], ItemData.prototype, "amount", void 0);

function _ts_decorate(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)(d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
}
class Currency {
    constructor(){
        this.value = Decimal.dZero, this.upgrades = {}, this.items = {};
    }
}
_ts_decorate([
    Type(()=>Decimal),
    _ts_metadata("design:type", void 0 === Decimal ? Object : Decimal)
], Currency.prototype, "value", void 0), _ts_decorate([
    Type(()=>UpgradeData),
    _ts_metadata("design:type", "undefined" == typeof Record ? Object : Record)
], Currency.prototype, "upgrades", void 0), _ts_decorate([
    Type(()=>ItemData),
    _ts_metadata("design:type", "undefined" == typeof Record ? Object : Record)
], Currency.prototype, "items", void 0);
class CurrencyStatic {
    get pointer() {
        return this.pointerFn();
    }
    get value() {
        return this.pointer.value;
    }
    set value(value) {
        this.pointer.value = value;
    }
    onLoadData() {
        for (let upgrade of Object.values(this.upgrades))this.runUpgradeEffect(upgrade);
    }
    reset(resetCurrencyOrResetObj, resetUpgradeLevels, runUpgradeEffect) {
        let resetObj = {
            resetCurrency: !0,
            resetUpgradeLevels: !0,
            resetItemAmounts: !0,
            runUpgradeEffect: !0
        };
        if ("object" == typeof resetCurrencyOrResetObj ? Object.assign(resetObj, resetCurrencyOrResetObj) : Object.assign(resetObj, {
            resetCurrency: resetCurrencyOrResetObj,
            resetUpgradeLevels: resetUpgradeLevels,
            runUpgradeEffect: runUpgradeEffect
        }), resetObj.resetCurrency && (this.value = this.defaultVal), resetObj.resetUpgradeLevels) for (let upgrade of Object.values(this.upgrades))upgrade.level = new Decimal(upgrade.defaultLevel), resetObj.runUpgradeEffect && this.runUpgradeEffect(upgrade);
        if (resetObj.resetItemAmounts) for (let item of Object.values(this.items))item.amount = new Decimal(item.defaultAmount), resetObj.runUpgradeEffect && this.runItemEffect(item);
    }
    gain(dt = 1000) {
        let toAdd = this.boost.calculate().mul(new Decimal(dt).div(1000));
        return this.pointer.value = this.pointer.value.add(toAdd), toAdd;
    }
    pointerAddUpgrade(upgrades) {
        let upgradesToAdd = new UpgradeData(upgrades);
        return this.pointer.upgrades[upgradesToAdd.id] = upgradesToAdd, upgradesToAdd;
    }
    pointerGetUpgrade(id) {
        return this.pointer.upgrades[id] ?? null;
    }
    getUpgrade(id) {
        return this.upgrades[id] ?? null;
    }
    queryUpgrade(id) {
        let allUpgradeIds = Object.keys(this.upgrades);
        if (id instanceof RegExp) {
            let regex = id;
            return allUpgradeIds.filter((upgrade)=>regex.test(upgrade)).map((matchedId)=>this.upgrades[matchedId]);
        }
        return "string" == typeof id && (id = [
            id
        ]), allUpgradeIds.filter((upgrade)=>id.includes(upgrade)).map((matchedId)=>this.upgrades[matchedId]);
    }
    addUpgrade(upgrades, runEffectInstantly = !0) {
        Array.isArray(upgrades) || (upgrades = [
            upgrades
        ]);
        let addedUpgradeList = [];
        for (let upgrade of upgrades){
            this.pointerAddUpgrade(upgrade);
            let addedUpgradeStatic = new UpgradeStatic(upgrade, ()=>this.pointerGetUpgrade(upgrade.id), ()=>this);
            runEffectInstantly && this.runUpgradeEffect(addedUpgradeStatic), this.upgrades[upgrade.id] = addedUpgradeStatic, addedUpgradeList.push(addedUpgradeStatic);
        }
        return addedUpgradeList;
    }
    updateUpgrade(id, newUpgrade) {
        let oldUpgrade = this.getUpgrade(id);
        null !== oldUpgrade && Object.assign(oldUpgrade, newUpgrade);
    }
    runUpgradeEffect(upgrade) {
        upgrade.effect?.(upgrade.level, upgrade, this);
    }
    runItemEffect(item, tier = Decimal.dOne) {
        tier = new Decimal(tier), item.effect?.(item.amount, tier, item, this);
    }
    calculateUpgrade(id, target = 1 / 0, mode, iterations) {
        let upgrade = this.getUpgrade(id);
        return null === upgrade ? (console.warn(`eMath.js: Upgrade "${id}" not found.`), [
            Decimal.dZero,
            Decimal.dZero
        ]) : (target = upgrade.level.add(target), void 0 !== upgrade.maxLevel && (target = Decimal.min(target, upgrade.maxLevel)), calculateUpgrade(this.value, upgrade, upgrade.level, target, mode, iterations));
    }
    getNextCost(id, target = 1, mode, iterations) {
        let upgrade = this.getUpgrade(id);
        if (null === upgrade) return console.warn(`eMath.js: Upgrade "${id}" not found.`), Decimal.dZero;
        let amount = this.calculateUpgrade(id, target, mode, iterations)[0];
        return upgrade.cost(upgrade.level.add(amount));
    }
    getNextCostMax(id, target = 1, mode, iterations) {
        let upgrade = this.getUpgrade(id);
        if (null === upgrade) return console.warn(`eMath.js: Upgrade "${id}" not found.`), Decimal.dZero;
        let upgCalc = this.calculateUpgrade(id, target, mode, iterations);
        return upgrade.cost(upgrade.level.add(upgCalc[0])).add(upgCalc[1]);
    }
    buyUpgrade(id, target, mode, iterations) {
        let upgrade = this.getUpgrade(id);
        if (null === upgrade) return console.warn(`eMath.js: Upgrade "${id}" not found.`), !1;
        let [amount, cost] = this.calculateUpgrade(id, target, mode, iterations);
        return !amount.lte(0) && (this.pointer.value = this.pointer.value.sub(cost), upgrade.level = upgrade.level.add(amount), this.runUpgradeEffect(upgrade), !0);
    }
    pointerAddItem(items) {
        let itemToAdd = new ItemData(items);
        return this.pointer.items[items.id] = itemToAdd, itemToAdd;
    }
    pointerGetItem(id) {
        return this.pointer.items[id] ?? null;
    }
    addItem(items, runEffectInstantly = !0) {
        for (let item of (Array.isArray(items) || (items = [
            items
        ]), items)){
            this.pointerAddItem(item);
            let addedUpgradeStatic = new Item(item, ()=>this.pointerGetItem(item.id), ()=>this);
            runEffectInstantly && this.runItemEffect(addedUpgradeStatic), this.items[item.id] = addedUpgradeStatic;
        }
    }
    getItem(id) {
        return this.items[id] ?? null;
    }
    calculateItem(id, tier, target) {
        let item = this.getItem(id);
        return null === item ? (console.warn(`eMath.js: Item "${id}" not found.`), [
            Decimal.dZero,
            Decimal.dZero
        ]) : calculateItem(this.value, item, tier, target);
    }
    buyItem(id, tier, target) {
        let item = this.getItem(id);
        if (null === item) return console.warn(`eMath.js: Item "${id}" not found.`), !1;
        let [amount, cost] = this.calculateItem(id, tier, target);
        return !amount.lte(0) && (this.pointer.value = this.pointer.value.sub(cost), item.amount = item.amount.add(amount), this.runItemEffect(item, tier), !0);
    }
    constructor(pointer = new Currency(), upgrades, items, defaults = {
        defaultVal: Decimal.dZero,
        defaultBoost: Decimal.dOne
    }){
        this.defaultVal = defaults.defaultVal, this.defaultBoost = defaults.defaultBoost, this.pointerFn = "function" == typeof pointer ? pointer : ()=>pointer, this.boost = new Boost(this.defaultBoost), this.pointer.value = this.defaultVal, this.upgrades = {}, upgrades && this.addUpgrade(upgrades), this.items = {}, items && this.addItem(items);
    }
}

class Attribute {
    constructor(initial = 0){
        this.value = new Decimal(initial);
    }
}
!function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)(d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    c > 3 && r && Object.defineProperty(target, key, r);
}([
    Type(()=>Decimal),
    function(k, v) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
    }("design:type", void 0 === Decimal ? Object : Decimal)
], Attribute.prototype, "value", void 0);
class AttributeStatic {
    get pointer() {
        return this.pointerFn();
    }
    update() {
        console.warn("eMath.js: AttributeStatic.update is deprecated and will be removed in the future. The value is automatically updated when accessed."), this.boost && (this.pointer.value = this.boost.calculate());
    }
    get value() {
        return this.boost && (this.pointer.value = this.boost.calculate()), this.pointer.value;
    }
    set value(value) {
        if (this.boost) throw Error("Cannot set value of attributeStatic when boost is enabled.");
        this.pointer.value = value;
    }
    constructor(pointer, useBoost = !0, initial = 0){
        this.initial = new Decimal(initial), pointer ?? (pointer = new Attribute(this.initial)), this.pointerFn = "function" == typeof pointer ? pointer : ()=>pointer, this.boost = useBoost ? new Boost(this.initial) : null;
    }
}

class GridCell {
    get grid() {
        return Grid.getInstance(this.gridSymbol);
    }
    set(name, value) {
        return this.properties[name] = value, value;
    }
    get(name) {
        return this.properties[name];
    }
    translate(x = 0, y = 0) {
        return Grid.getInstance(this.gridSymbol).getCell(this.x + x, this.y + y);
    }
    direction(direction, distance = 1, fill) {
        let grid = this.grid;
        return (()=>{
            switch(direction){
                case "up":
                    return grid.getCell(this.x, this.y - distance);
                case "right":
                    return grid.getCell(this.x + distance, this.y);
                case "down":
                    return grid.getCell(this.x, this.y + distance);
                case "left":
                    return grid.getCell(this.x - distance, this.y);
                case "adjacent":
                    return grid.getAdjacent(this.x, this.y, distance, fill);
                case "diagonal":
                    return grid.getDiagonal(this.x, this.y, distance, fill);
                case "encircling":
                    return grid.getEncircling(this.x, this.y, distance, fill);
                default:
                    throw Error("Invalid direction");
            }
        })();
    }
    up(distance = 1) {
        return this.direction("up", distance);
    }
    right(distance = 1) {
        return this.direction("right", distance);
    }
    down(distance = 1) {
        return this.direction("down", distance);
    }
    left(distance = 1) {
        return this.direction("left", distance);
    }
    constructor(x, y, props = {}, gridSymbol){
        this.setValue = this.set.bind(this), this.getValue = this.get.bind(this), this.x = x, this.y = y, this.properties = "function" == typeof props ? props(this) : {
            ...props
        }, this.gridSymbol = gridSymbol;
    }
}
function validateCoordinates(x, y, isSize = !0) {
    let message = isSize ? "Size" : "Coordinates";
    if ("number" != typeof x || "number" != typeof y) throw RangeError(`${message} must be numbers: ${x}, ${y}`);
    if (!Number.isInteger(x) || !Number.isInteger(y)) throw RangeError(`${message} must be integers: ${x}, ${y}`);
    if (x < 0 || y < 0) throw RangeError(`${message} must be positive: ${x}, ${y}`);
    if (!Number.isFinite(x) || !Number.isFinite(y)) throw RangeError(`${message} must be finite: ${x}, ${y}`);
    if (!Number.isSafeInteger(x) || !Number.isSafeInteger(y)) throw RangeError(`${message} must be safe integers: ${x}, ${y}`);
}
class GridCellCollection extends Array {
    removeDuplicates() {
        let duplicatedIndexes = [];
        this.forEach((cell, index)=>{
            this.indexOf(cell) !== index && duplicatedIndexes.push(index);
        }), duplicatedIndexes.forEach((index)=>this.splice(index, 1));
    }
    translate(x = 0, y = 0) {
        return new GridCellCollection(this.map((cell)=>cell.translate(x, y)));
    }
    direction(direction, distance, fill) {
        return new GridCellCollection(this.flatMap((cell)=>cell.direction(direction, distance, fill)));
    }
    up(distance) {
        return this.direction("up", distance);
    }
    right(distance) {
        return this.direction("right", distance);
    }
    down(distance) {
        return this.direction("down", distance);
    }
    left(distance) {
        return this.direction("left", distance);
    }
    adjacent(distance, fill) {
        return this.direction("adjacent", distance, fill);
    }
    diagonal(distance, fill) {
        return this.direction("diagonal", distance, fill);
    }
    encircling(distance, fill) {
        return this.direction("encircling", distance, fill);
    }
    constructor(cells){
        super(...cells = (cells = Array.isArray(cells) ? cells : [
            cells
        ]).filter((cell)=>void 0 !== cell)), this.removeDuplicates();
    }
}
class Grid {
    static getInstance(key) {
        return Grid.instances[key];
    }
    resize(xSize, ySize) {
        let oldXSize = this.xSize, oldYSize = this.ySize;
        this.xSize = xSize, this.ySize = ySize ?? xSize, validateCoordinates(this.xSize, this.ySize, !0), (()=>{
            if (this.ySize !== oldYSize && (this.ySize < oldYSize && (this.cells.length = this.ySize), this.ySize > oldYSize)) for(let y = oldYSize; y < this.ySize; y++){
                this.cells[y] = [];
                for(let x = 0; x < oldXSize; x++)this.cells[y][x] = new GridCell(x, y, this.starterProps, this.gridSymbol);
            }
        })(), (()=>{
            if (this.xSize !== oldXSize) {
                if (this.xSize < oldXSize) for(let y = 0; y < this.ySize; y++)this.cells[y].length = this.xSize;
                if (this.xSize > oldXSize) for(let y = 0; y < this.ySize; y++)for(let x = oldXSize; x < this.xSize; x++)this.cells[y][x] = new GridCell(x, y, this.starterProps, this.gridSymbol);
            }
        })();
    }
    getAll() {
        return new GridCellCollection(this.cells.flat());
    }
    getAllX(x) {
        let output = [];
        for(let i = 0; i < this.ySize; i++)output.push(this.cells[i][x]);
        return new GridCellCollection(output);
    }
    getAllY(y) {
        return new GridCellCollection(this.cells[y]);
    }
    getCell(x, y, overflow = !0) {
        let out;
        x = overflow ? (x + this.xSize) % this.xSize : x, y = overflow ? (y + this.ySize) % this.ySize : y;
        try {
            out = this.cells[y][x];
        } catch (e) {
            return;
        }
        if (out) return out;
    }
    setCell(x, y, value) {
        this.cells[y][x] = value;
    }
    getAdjacent(x, y, distance = 1, fill = !1, overflow = !0) {
        if (1 === distance) return new GridCellCollection([
            this.getCell(x, y + 1, overflow),
            this.getCell(x + 1, y, overflow),
            this.getCell(x, y - 1, overflow),
            this.getCell(x - 1, y, overflow)
        ]);
        if (!fill) return new GridCellCollection([
            this.getCell(x, y + distance, overflow),
            this.getCell(x + distance, y, overflow),
            this.getCell(x, y - distance, overflow),
            this.getCell(x - distance, y, overflow)
        ]);
        let output = [
            this.getCell(x, y)
        ];
        for(let i = 1; i <= distance; i++)output.push(...new GridCellCollection([
            this.getCell(x, y + i, overflow),
            this.getCell(x + i, y, overflow),
            this.getCell(x, y - i, overflow),
            this.getCell(x - i, y, overflow)
        ]));
        return new GridCellCollection(output);
    }
    getDiagonal(x, y, distance = 1, fill = !1, overflow = !0) {
        if (1 === distance) return new GridCellCollection([
            this.getCell(x - 1, y + 1, overflow),
            this.getCell(x + 1, y + 1, overflow),
            this.getCell(x + 1, y - 1, overflow),
            this.getCell(x - 1, y - 1, overflow)
        ]);
        if (!fill) return new GridCellCollection([
            this.getCell(x - distance, y + distance, overflow),
            this.getCell(x + distance, y + distance, overflow),
            this.getCell(x + distance, y - distance, overflow),
            this.getCell(x - distance, y - distance, overflow)
        ]);
        let output = [
            this.getCell(x, y)
        ];
        for(let i = 1; i <= distance; i++)output.push(...new GridCellCollection([
            this.getCell(x - i, y + i, overflow),
            this.getCell(x + i, y + i, overflow),
            this.getCell(x + i, y - i, overflow),
            this.getCell(x - i, y - i, overflow)
        ]));
        return new GridCellCollection(output);
    }
    getEncirclingAtDistance(x, y, distance, overflow = !0) {
        if (distance <= 1) return new GridCellCollection([
            ...this.getAdjacent(x, y, 1, !1, overflow),
            ...this.getDiagonal(x, y, 1, !1, overflow)
        ]);
        let output = [];
        for(let i = 1; i < 2 * distance; i++)output.push(...new GridCellCollection([
            this.getCell(x - distance + i, y - distance, overflow),
            this.getCell(x + distance, y - distance + i, overflow),
            this.getCell(x + distance - i, y + distance, overflow),
            this.getCell(x - distance, y + distance - i, overflow)
        ]));
        return output.push(...this.getDiagonal(x, y, distance, !1, overflow)), new GridCellCollection(output);
    }
    getEncircling(x, y, distance = 1, fill = !1, overflow = !0) {
        if (1 === distance || !fill) return this.getEncirclingAtDistance(x, y, distance, overflow);
        let output = [
            this.getCell(x, y)
        ];
        for(let i = 1; i <= distance; i++)output.push(...this.getEncirclingAtDistance(x, y, i, overflow));
        return new GridCellCollection(output);
    }
    static getDistance(x1, y1, x2, y2) {
        return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
    }
    constructor(xSize, ySize, starterProps){
        this.cells = [], this.gridSymbol = Symbol(), this.all = this.getAll.bind(this), this.allX = this.getAllX.bind(this), this.allY = this.getAllY.bind(this), this.get = this.getCell.bind(this), this.set = this.setCell.bind(this), Grid.instances[this.gridSymbol] = this, this.starterProps = starterProps ?? {}, this.xSize = xSize, this.ySize = ySize ?? xSize, validateCoordinates(this.xSize, this.ySize, !0);
        for(let y = 0; y < this.ySize; y++){
            this.cells[y] = [];
            for(let x = 0; x < this.xSize; x++)this.cells[y][x] = new GridCell(x, y, starterProps, this.gridSymbol);
        }
    }
}
Grid.instances = {};

let E = (()=>{
    let shownWarning = !1, out = (x)=>(shownWarning || (console.warn("eMath.js: The E function is deprecated. Use the Decimal class directly."), shownWarning = !0), new Decimal(x));
    return Object.getOwnPropertyNames(Decimal).filter((b)=>!Object.getOwnPropertyNames(class {
        }).includes(b)).forEach((prop)=>{
        out[prop] = Decimal[prop];
    }), out;
})();

"undefined" == typeof window || window.Decimal || (window.Decimal = Decimal);

export { Attribute, AttributeStatic, Boost, BoostObject, Currency, CurrencyStatic, DEFAULT_ITERATIONS, DEFAULT_TOLERANCE, Decimal, E, FORMATS, formatTypeList as FormatTypeList, Grid, GridCell, GridCellCollection, Item, ItemData, LRUCache, ListNode, ST_NAMES, UpgradeData, UpgradeStatic, calculateInverseFunction, calculateItem, calculateSum, calculateSumApprox, calculateSumApproxOld, calculateSumLoop, calculateUpgrade, decimalToJSONString, eMathMetadata, equalsTolerance, formats, inverseFunctionApprox, mean, roundingBase, upgradeToCacheNameEL };
//# sourceMappingURL=eMath.mjs.map
