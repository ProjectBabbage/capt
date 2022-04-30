import { useRef } from "react";
import { Rect, Text, Group } from "react-konva";

function Box({ box, onClickHandleBoxTransition, onMove }) {
  let { x, y, w, h, text, id } = box;
  let boxCanvas = useRef();
  return (
    <Group draggable x={x} y={y} onDragMove={obj => onMove(id, obj.target.attrs.x, obj.target.attrs.y)}
      ref={boxCanvas} >
      <Rect width={w} height={h} fill="lightblue" stroke="black" strokeWidth={2} />
      <Text
        width={w}
        height={h}
        text={text}
        align="center"
        verticalAlign="middle"
        fontSize={30}
        onClick={(evt) => {
        if(evt.evt.detail === 2) 
          onClickHandleBoxTransition(boxCanvas.current, box);
        }}/>
    </Group>
  );
}

export default Box;
