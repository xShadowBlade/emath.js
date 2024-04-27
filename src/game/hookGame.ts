/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import { eMath } from "../hookMain";
import * as eMathGame from "./index";

const eMathGameWeb = {
    ...eMath,
    ...eMathGame,
};

export { eMathGameWeb as eMath };