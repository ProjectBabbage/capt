import { useRef } from "react";
import { Rect, Text, Group } from "react-konva";
import { boxConfig } from "../config";
import { Box } from "../types/box";

export function BoxElement({box, onClickHandleBoxTransition, onMove}: {box: Box; onClickHandleBoxTransition: Function, onMove: Function}) {
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
          if (evt.evt.detail === 2)
            onClickHandleBoxTransition(boxCanvas.current, box);
        }} />
    </Group>
  );
}
