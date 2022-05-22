import { useRef } from "react";
import { Rect, Text, Group } from "react-konva";
import { boxConfig } from "../config";
import { Box } from "../../common/types";

export function BoxElement({box, onDoubleClick, onMove, onFocus, onExplicitFocus}: {box: Box; onDoubleClick: Function, onMove: Function, onFocus: Function, onExplicitFocus: Function}) {
  let { x, y, w, h, text } = box;
  let boxCanvas = useRef(null);
  return (
    <Group draggable x={x} y={y} onDragMove={obj => onMove(obj.target.attrs.x, obj.target.attrs.y)} ref={boxCanvas} >
      <Rect width={w} height={h} fill={boxConfig.backgroundColor} stroke={boxConfig.strokeColor} strokeWidth={boxConfig.strokeWidth} />
      <Text
        width={w}
        height={h}
        text={text}
        align="center"
        verticalAlign="middle"
        fontSize={30}
        onClick={(evt) => {
          if (evt.evt.detail === 1)
            onExplicitFocus(box)
          if (evt.evt.detail === 2)
           onDoubleClick(boxCanvas.current, box);
        }} 
        onMouseEnter={(evt) => onFocus(box)}
        onMouseLeave={(evt) => onFocus(box.parent)}/>
    </Group>
  );
}
