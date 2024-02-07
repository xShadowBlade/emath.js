/**
 * @file Format big numbers that go up
 */
import { E } from "emath.js";

let a = E(1000);

let interval: ReturnType<typeof setInterval>;

const button = document.getElementById("nguformatStart");

const stop = document.getElementById("nguformatStop");
stop!.addEventListener("click", () => clearInterval(interval));

const reset = document.getElementById("nguformatReset");
reset!.addEventListener("click", () => (a = E(1000)));

const display = document.getElementById("nguformatDisplay");

button!.addEventListener("click", () => {
    interval = setInterval(() => {
        // a = a.pow(1.002).mul(1.35);
        a = a.pow(1.005).mul(1.25);
        const tier = a.absLog10().div(3).sub(1).floor();
        let ct = 1;
        let txt = `${tier.format()} <br> ${a.formatST()}`; // .match(/\d*[a-zA-Z\-]+/
        while (tier.div(E.pow(1000, ct - 1)).gte(1)) {
            txt += `<br>Tier ${ct}: ${tier.div(E.pow(1000, ct - 1)).mod(1000).floor()}`;
            ct++;
        }
            display!.innerHTML = txt;
    }, 50);
});