import { useEffect, useState } from "react";

function getPath(sep, jsonTree, current){
    let res = null
    if(jsonTree.id === current.id){
        return `${sep}${jsonTree.text}`;
    }
    jsonTree.boxes.forEach((box) => {
        let path = getPath(sep, box, current);
        res = path === null ? null : `${sep}${jsonTree.text}${path}`;
    })
    return res;
}

export default function NavigationInput({ jsonTree, current}){
    const [path, setPath] = useState(getPath("/", jsonTree, current));
    
    useEffect(() => {
        setPath(getPath("/",jsonTree, current));
    })

    return (
        <div>
            <input 
                className="full-width" 
                type="text" 
                value={path}
                onChange={(evt) => setPath(evt.target.value)}/>
        </div>
    )
}