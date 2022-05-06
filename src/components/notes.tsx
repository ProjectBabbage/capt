import { Box } from "../types/box";
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from "react";

export default function Notes({box}: {box: Box}){
    const [editMode, setEditMode] = useState(false);
    const [editValue, setEditValue] = useState(box.notes ?? '');

    useEffect(() => {
        setEditValue(box.notes ?? '');
    }, [box])

    useEffect(() => {
        box.notes = editValue;
    }, [editValue])

    return(
        <div className="fc sidebar_notes full-height flex-grow">
            <h1>{box.text}</h1>
            <button onClick={(evt) => setEditMode(!editMode)}>Edit</button>
                {!editMode && (
                <ReactMarkdown>{editValue}</ReactMarkdown>
                )}
                {editMode && (
                    <textarea  
                    value={editValue}
                    className="full-width flex-grow"
                    onChange={(evt) => {setEditValue(evt.target.value)}} ></textarea>
                )}
        </div>
    )
}