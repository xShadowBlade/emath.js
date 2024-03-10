/**
 * @file Defines the hierarchy view component.
 */

import React from "react";
import Form from "react-bootstrap/Form";

import Editor from "./editor";

import type { UnknownObject } from "emath.js/game";

interface HierarchyViewProps {
    data: UnknownObject;
    // onDataChange: (newData: UnknownObject) => void;
}

/**
 * @returns The hierarchy view component.
 * @param props - The props for the hierarchy view component.
 */
function HierarchyView (props: HierarchyViewProps) {
    const { data } = props;
    // const renderHierarchy = (data: UnknownObject) => {
    //     const keys = Object.keys(data);
    //     return keys.map((key) => {
    //         const value = data[key];
    //         if (typeof value === "object") {
    //             return (
    //                 <div key={key}>
    //                     <Form.Label>{key}</Form.Label>
    //                     <Form.Group>
    //                         {renderHierarchy(value as UnknownObject)}
    //                     </Form.Group>
    //                 </div>
    //             );
    //         } else {
    //             return (
    //                 <Form.Group key={key}>
    //                     <Form.Label>{key}</Form.Label>
    //                     <Form.Control type="text" value={value?.toString()} />
    //                 </Form.Group>
    //             );
    //         }
    //     });
    // };
    return (
        // <Form>
        //     {renderHierarchy(data)}
        // </Form>
        <Editor name="saveData" value={data} />
    );
}

export default HierarchyView;