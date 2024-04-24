/**
 * @file Test converting LaTeX to a function.
 */
import { E } from "emath.js";
import evaluatex, { EvaluatexResult } from "evaluatex";

function latexToE (latex: string): ((variables: Record<string, E>) => E) {
    const baseFunction = evaluatex(latex);
    const baseNodes = baseFunction.ast;
}

function evaluateE (baseFunction: EvaluatexResult) {
    
}

// Test
const f = evaluatex("x^2 + 2x + 1");
// @ts-ignore
window.f = f;
console.log(f); // 9