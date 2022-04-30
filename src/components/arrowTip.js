import { Circle } from "react-konva";

function ArrowTip({ x, y, onMove }) {
  return (
    <Circle draggable x={x} y={y} radius={10} fill="" onDragMove={obj => onMove(obj.target.attrs.x, obj.target.attrs.y)} />
  );
}

export default ArrowTip;
