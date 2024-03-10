/**
 * @file Handles file uploads and text input.
 */
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import { dataManager, UnknownObject } from "emath.js/game";

interface InputProps {
    saveData: UnknownObject;
    setSaveData: (saveData: UnknownObject) => void;
}

/**
 * @param saveData - The save data to parse.
 * @returns The parsed save data.
 */
function parseSaveData (saveData: string) {
    const parsedData = dataManager.prototype.parseData(dataManager.prototype.decompileData(saveData), false);
    return parsedData ?? {};
}

/**
 * @returns The main input component.
 * @param props - The props for the input component.
 */
function Input (props: InputProps) {
    const { saveData, setSaveData } = props;
    const [saveDataRaw, setSaveDataRaw] = useState("");
    return (
        <Form>
            <Form.Group>
                <Form.Label>Upload a file</Form.Label>
                <Form.Control
                    type="file"
                    onChange={e => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = e => {
                                if (e.target?.result) {
                                    setSaveDataRaw(e.target.result.toString());
                                    setSaveData(parseSaveData(e.target.result.toString()));
                                }
                            };
                            reader.readAsText(file);
                        }
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Or paste your save data here</Form.Label>
                <Form.Control
                    as="textarea"
                    value={saveDataRaw}
                    onChange={e => {
                        setSaveDataRaw(e.target.value);
                        setSaveData(parseSaveData(e.target.value));
                    }}
                />
            </Form.Group>
        </Form>
    );
}

export default Input;