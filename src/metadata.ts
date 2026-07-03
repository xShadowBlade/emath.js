/**
 * @file Declares the metadata for

/**
 * Metadata for the project.
 */
const eMathMetadata = {
    /**
     * The version of the library
     * @example "10.0.0"
     */
    version: ((): string => {
        // Get the version
        try {
            // @ts-expect-error - Replaced by build
            return PKG_VERSION as string;
        } catch (error) {
            return "10.0.0";
        }
    })(),

    /**
     * The data about the Break Eternity library
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "break_eternity.js": {
        /**
         * The version of the Break Eternity library
         * @example "2.1.0"
         */
        version: "2.1.0",
    },
};

export { eMathMetadata };
