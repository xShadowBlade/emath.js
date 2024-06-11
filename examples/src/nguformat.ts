/**
 * @file Format big numbers that go up
 */
import { Decimal } from "emath.js";

const f = (x: Decimal): Decimal => x.pow(1.005).mul(2);
// const f = (x: Decimal): Decimal => x.pow(2).mul(1.35);

let a = Decimal.dTwo;

let interval: ReturnType<typeof setInterval>;

const button = document.getElementById("nguformatStart");

const stop = document.getElementById("nguformatStop");
stop?.addEventListener("click", () => { clearInterval(interval); });

const reset = document.getElementById("nguformatReset");
reset?.addEventListener("click", () => { a = new Decimal(1000); });

const display = document.getElementById("nguformatDisplay");

button?.addEventListener("click", () => {
    interval = setInterval(() => {
        // a = a.pow(1.002).mul(1.35);
        a = f(a);
        const tier = a.absLog10().div(3).sub(1).floor();
        let ct = 1;
        let txt = `${tier.format()} <br> ${/* a.format(2, 9, "st") */ a.format()} <br> ${Decimal.formats.alphabet.getAbbreviation(a)}`; // .match(/\d*[a-zA-Z\-]+/
        // let txt = `${tier.toString()} <br> ${a.toString()}`;
        // while (tier.div(E.pow(1000, ct - 1)).gte(1)) {
        //     txt += `<br>Tier ${ct}: ${tier.div(E.pow(1000, ct - 1)).mod(1000).floor()}`;
        //     ct++;
        // }
        display!.innerHTML = txt;
    }, 50);
});
