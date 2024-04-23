/**
 * @file This file is the entry point for your project.
 */

// import { Decimal } from "emath.js";

// console.log(new Decimal(69420).format());
import * as lzstring from "lz-string";
import * as eMath from "emath.js";
(window as any).eMath = eMath;
(window as any).lzstring = lzstring;

// import "./nguformat";
// import "./latexToE";
import "./coinGame/index";