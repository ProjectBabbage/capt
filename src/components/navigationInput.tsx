import { useEffect, useState } from "react";
import { Box } from "../types/box";

function getPath(sep: string, jsonTree: Box, current: Box): string | null{
    let res = null
    if(jsonTree.id === current.id){
        return `${sep}${jsonTree.text}`;
    }
    for(var i = 0 ; i < jsonTree.boxes.length ; i++) {
        let path = getPath(sep, jsonTree.boxes[i], current);
        res = path === null ? null : `${sep}${jsonTree.text}${path}`;
        if( res !== null)
            break;
    }
    return res;
}

export default function NavigationInput({ jsonTree, current, handleBoxTransitionBack}: {jsonTree: Box, current: Box, handleBoxTransitionBack: Function}){
    const [path, setPath] = useState(getPath("/", jsonTree, current));
    
    useEffect(() => {
        setPath(getPath("/",jsonTree, current));
    }, [jsonTree, current])

    return (
        <div className="fc">
            <input 
                className="" 
                type="text" 
                value={path as string}
                onChange={(evt) => {
                    // vérifier si le path actuel correspond a une box dans le jsonTree

                    // si oui, y naviguer
                }}
            />
            <button
                onClick={(evt) => {
                    // appeler handleBoxTransition avec le parent de current
                    handleBoxTransitionBack(current, current.parent);
                }}>Previous</button>
        </div>
    )
}