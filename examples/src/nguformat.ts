/**
 * @file Format big numbers that go up
 */
import { Decimal } from "emath.js";
import { formatOptions, gameFormat, gameFormatGain } from "emath.js/presets";

const f = (x: Decimal): Decimal => new Decimal(x).fromComponents(x.sign, x.layer, x.mag * 1.35);
// const f = (x: Decimal): Decimal => x.pow(2).mul(1.35);

let a = Decimal.dTwo;

let interval: ReturnType<typeof setInterval>;

const button = document.getElementById("nguformatStart");

const stop = document.getElementById("nguformatStop");
stop?.addEventListener("click", () => { clearInterval(interval); });

const reset = document.getElementById("nguformatReset");
reset?.addEventListener("click", () => { a = new Decimal(1000); });

const display = document.getElementById("nguformatDisplay");

const newFormatOptions = formatOptions.filter(option => option.value !== "omega" && option.value !== "omega_short");

button?.addEventListener("click", () => {
    interval = setInterval(() => {
        a = f(a);
        const deltaA = f(a).sub(a);

        const tier = a.absLog10().div(3).sub(1).floor();
        let txt = `layer: ${a.layer} <br> mag: ${a.mag.toFixed(2)} <br> ${tier.format()} <br> ${Decimal.formats.alphabet.getAbbreviation(a)}`;

        for (const formatOption of newFormatOptions) {
            const { name, value: formatType } = formatOption;
            txt += `<li> ${name}: ${gameFormat(a, { formatType })} (${gameFormatGain(a, deltaA, { formatType })})</li>`;
        }

        display!.innerHTML = `<ul>${txt}</ul>`;
    }, 100);
});

Object.assign(window, { a });
