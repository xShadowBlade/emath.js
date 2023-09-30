const { E, eMath } = require("../eMath.js");

const format = {
    metric: function(num, type) {
        num = E(num);
        const abb = [
            {
                name: "K",
                altName: "Kilo",
                value: E("1000")
            },
            {
                name: "M",
                altName: "Mega",
                value: E("1e6")
            },
            {
                name: "G",
                altName: "Giga",
                value: E("1e9")
            },
            {
                name: "T",
                altName: "Tera",
                value: E("1e12")
            },
            {
                name: "P",
                altName: "Peta",
                value: E("1e15")
            },
            {
                name: "E",
                altName: "Exa",
                value: E("1e18")
            },
            {
                name: "Z",
                altName: "Zetta",
                value: E("1e21")
            },
            {
                name: "Y",
                altName: "Yotta",
                value: E("1e24")
            },
            {
                name: "R",
                altName: "Ronna",
                value: E("1e27")
            },
            {
                name: "Q",
                altName: "Quetta",
                value: E("1e30")
            }
        ];
        for (i = 0; i < abb.length; i++) {
            if (num.greaterThanOrEqualTo(abb[i]["value"])) {
                if (i == abb.length - 1) {
                    switch(type) {
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
            } else {
                if (i == 0) {
                    switch(type) {
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
                    switch(type) {
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
    },
    eV: function(num, c2 = Game.settings.c2) {
        return `${this.metric(num, 2)} ${this.metric(num, 1)}eV${c2 ? "/c^2" : ""}`
    },
}

module.exports = { format }