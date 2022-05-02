import React, { useEffect } from "react";
import { Box } from "../types/box";
import { BoxElement } from "./box";

export default function Boxes({currentBox, onClickSetCurrent, onClickHandleBoxTransition, onFocus, onExplicitFocus}: {
    currentBox: Box, onClickSetCurrent: Function, onClickHandleBoxTransition: Function, onFocus: Function, onExplicitFocus: Function
}
){
    useEffect(() => {
        currentBox.boxes.forEach((box: Box) => {
            box.parent = currentBox;
          });
    }, [currentBox])

    return( <React.Fragment>
    {currentBox.boxes.map(box => (
        <BoxElement 
            box={box}
            onMove={(x: number, y: number) => {
                const b = { ...currentBox }
                const b1 = b.boxes.find(b2 => b2.id === box.id)
                if(b1){
                    b1.x = x;
                    b1.y = y;
                }
        
                onFocus(b);
              }}
              onDoubleClick={onClickHandleBoxTransition}
              onFocus={onFocus}
              onExplicitFocus={onExplicitFocus}
              key={"box" + box.id}
            />
    ))}
    </React.Fragment>)
}