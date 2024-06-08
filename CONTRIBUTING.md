# Contributing to eMath.js

Thank you for considering contributing to eMath.js! This project is open to contributions from everyone, whether you're fixing a bug, improving documentation, or adding new features.

Before you start contributing, please take a moment to read the guidelines below.

## Reporting Issues

If you encounter any issues with eMath.js or have suggestions for improvements, please feel free to open an issue on the [GitHub Issues](https://github.com/xShadowBlade/emath.js/issues) page.
When reporting issues, please include as much detail as possible, including steps to reproduce the problem and your environment setup.

## Contributing Code

### Getting Started

1. Fork the repository and clone it to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Create a new branch for your contribution: `git checkout -b feature/new-feature`.
4. Make your changes and ensure they adhere to the project's coding standards.
5. Test your changes locally to ensure they work as expected.
6. Commit your changes: `git commit -m "Add new feature"`
7. Push to the branch: `git push origin feature/new-feature`
8. Submit a pull request to the `main` branch of the main repository.

### Codebase Overview

The project is structured as follows:

#### Files

- [`.eslintrc.json`](./.eslintrc.json): Contains the ESLint configuration for the project.
- [`tsconfig.json`](./tsconfig.json): Contains the TypeScript configuration for the project.
- [`tsconfig.eslint.json`](./tsconfig.eslint.json): Contains the TypeScript configuration for ESLint.
- [`typedoc.json`](./typedoc.json): Contains the TypeDoc configuration for generating documentation.
- [`package.json`](./package.json): Contains the project metadata and dependencies.

#### Directories

- [`/src/`](./src): Contains the source code for the library. It is written in TypeScript and compiled to JavaScript. See the [corresponding README](./src/README.md) for more details.
- [`/dist/`](./dist): Contains the compiled JavaScript files and TypeScript declaration files. Once you've made changes to the source code, you can compile it using `npm run build`.
- [`/bin/build/`](./bin/build): Contains the build scripts used to compile the TypeScript source code.
- [`/documentation/`](./documentation): Contains the documentation files for the project. The built documentation automatically generated from the source code using TypeDoc and built by GitHub actions.
- [`/test/`](./test): Contains the test files for the project. See the [corresponding README](./test/README.md) for more details.
- [`/examples/`](./examples): Contains example files and demos showcasing the usage of the library. It is not regularly updated and may be out of date.

### Code Style

Please follow the existing code style and conventions used throughout the project. This project uses ESLint to enforce code quality and consistency. You can run ESLint using `npm run lint` or `npm run lint:fix` to automatically fix some issues. 

> [!NOTE]
> Prettier is not currently used in this project, despite the presence of a `.prettierrc` file. This may change in the future.

Additionally, ensure that your code is well-documented and includes appropriate comments (including JSDoc comments for functions and classes).

### Testing

If you're introducing new features or making significant changes, please include tests to ensure the reliability and stability of the codebase.
Run existing tests using `npm test` and add new tests as needed.

### Documentation

Improvements to the documentation are always welcome. If you notice any errors or have suggestions for clarifications or additions, please update the relevant documentation files or create new ones as needed.

## Code of Conduct

Please note that this project is governed by the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

## Credits

This project would not be possible without the contributions of its community members. Special thanks to [Patashu](https://github.com/Patashu) for making [break_eternity.js](https://github.com/Patashu/break_eternity.js) and [MrRedShark77](https://github.com/MrRedShark77/) for the formats.

---

**Note:** This package is currently in development and is subject to major changes. If you have any questions or need further assistance, feel free to reach out to the project maintainers.

![Made by: xShadowBlade#2720](https://img.shields.io/badge/Made%20by%3A-xShadowBlade%232720-blue?style=social&logo=discord)
