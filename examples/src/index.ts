/**
 * @file This file is the entry point for your project.
 */

// import { E } from "emath.js";

// console.log(E(69420).format());
import * as lzstring from "lz-string";
import * as eMath from "emath.js";
(window as any).eMath = eMath;
(window as any).lzstring = lzstring;

import "./nguformat";
// import "./latexToE";
import "./coinGame/index";