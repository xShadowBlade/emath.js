/**
 * @file This file is the entry point for your project.
 */

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import "emath.js";
import "emath.js/game";

import type { UnknownObject } from "emath.js/game";

import Input from "./input";
import HierarchyView from "./hierarchy";

/**
 * @returns The main app component.
 */
function App () {
    const [saveData, setSaveData] = useState<UnknownObject>({});
    useEffect(() => {
        console.log({ saveData });
        (window as any).saveData = saveData;
    }, [saveData]);
    return (<>
        <Input
            saveData={saveData}
            setSaveData={setSaveData}
        />
        <hr />
        <HierarchyView
            data={saveData}
            // onDataChange={setSaveData}
        />
    </>);
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);