import { useEffect, useState } from "react";

function getPath(sep, jsonTree, current){
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

export default function NavigationInput({ jsonTree, current}){
    const [path, setPath] = useState(getPath("/", jsonTree, current));
    
    useEffect(() => {
        setPath(getPath("/",jsonTree, current));
    }, [jsonTree, current])

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