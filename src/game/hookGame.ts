/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import eMathMain from "../hookMain";
import * as eMathGame from "./index";

const eMath = {
    ...eMathMain,
    ...eMathGame,
};

// export { eMathGameWeb as eMath };
export default eMath;
