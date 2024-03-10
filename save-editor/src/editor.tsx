/**
 * @file Defines the editor for a key-value store.
 */

import React, { useState, useEffect } from "react";

import type { UnknownObject, ClassType } from "emath.js/game";

interface EditorProps {
    name: string;
    value: unknown;
}

type OptionType = {
    name: string;
    // type: unknown;
    check: (value: unknown) => boolean;
    behavior: (name: string, value: unknown) => React.ReactNode;
}

const optionTypes: OptionType[] = [
    // Recursive types
    {
        name: "array",
        check: (value) => Array.isArray(value),
        behavior: (name, value) => {
            if (!Array.isArray(value)) return null;
            console.log("array");
            return (<>
                {name}: [
                <div>
                    {value.map((item: unknown, index: number) => {
                        return (<>
                            <Editor key={index} name={`${name}[${index}]`} value={item} />
                            , <br />
                        </>);
                    })}
                </div>
                ]
            </>);
        },
    },
    {
        name: "object",
        check: (value) => typeof value === "object" && !Array.isArray(value),
        behavior: (name, value) => {
            if (typeof value !== "object" || Array.isArray(value) || !value) return null;
            console.log("object");
            return (<>
                {name}: {"{"}
                <div>
                    {Object.keys(value).map((key) => {
                        return (<>
                            <Editor key={key} name={`${name}.${key}`} value={(value as UnknownObject)[key]} />
                            , <br />
                        </>);
                    })}
                </div>
                {"}"}
            </>);
        },
    },

    // Primitive types
    {
        name: "string",
        check: (value) => typeof value === "string",
        behavior: (name, value) => {
            if (typeof value !== "string") return null;
            console.log("string");
            return (<>
                {name}: <input type="text" value={value} />
            </>);
        },
    },
    {
        name: "number",
        check: (value) => typeof value === "number",
        behavior: (name, value) => {
            if (typeof value !== "number") return null;
            console.log("number");
            return (<>
                {name}: <input type="number" value={value} />
            </>);
        },
    },
    {
        name: "boolean",
        check: (value) => typeof value === "boolean",
        behavior: (name, value) => {
            if (typeof value !== "boolean") return null;
            console.log("boolean");
            return (<>
                {name}: <input type="checkbox" checked={value} />
            </>);
        },
    },
];

/**
 * @returns The editor for a key-value store.
 * @param props - The props for the editor.
 */
function Editor (props: EditorProps) {
    const { name, value } = props;
    return (
        <>{optionTypes.find((optionType) => optionType.check(optionType))?.behavior(name, value)}</>
    );
}

export default Editor;