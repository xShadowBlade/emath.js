# emath.js/src

This is the source code for the emath.js library. It is written in TypeScript and compiled to JavaScript.

If you want to contribute to the library, please read the [CONTRIBUTING.md](../CONTRIBUTING.md) file.

## Structure

- `/index.ts`: The entry point for the library. This file exports the main classes and functions.
- `/hookMain.ts`: The entry point for CDN usage. This file declares the `eMath` object and sets it to the `window` object.

- `/common/`: Contains common code used in the library. Currently only contains common types.
- `/classes/`: Contains the classes used in the library, exported by `emath.js`. Each class is in its own file.
- `/E/`: Contains code for the `Decimal` class. The code is ported from `break_eternity.js` and compiled from source.

- `/game/`: Contains the code that is exported by `emath.js/game`. This includes the `Game` class and other classes that are used in the game.
  - `/index.ts`: The entry point for the game code. This file exports the `Game` class and other classes.
  - `/hookGame.ts`: The entry point for CDN usage.
  - `/managers/`: Contains the managers used in the game. Each manager is in its own file.
- `/presets/`: Contains the code that is exported by `emath.js/presets`. This includes the `eMathPresets` object and other presets.
