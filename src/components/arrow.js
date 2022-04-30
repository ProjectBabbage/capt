import { Arrow, Group } from "react-konva";

const LEFT = 0;
const RIGHT = 1;
const TOP = 2;
const BOTTOM = 3;

function retrievePoint(target) {
  if (target.box !== undefined) {
    const { x, y, height: h, width: w } = target.box;
    const p = target.percentage;
    switch (target.side) {
      case LEFT:
        return { x: x, y: y + p * h };
      case RIGHT:
        return { x: x + w, y: y + p * h };
      case TOP:
        return { x: x + p * w, y: y };
      case BOTTOM:
        return { x: x + p * w, y: y + h };
      default:
        break;
    }
  }
}

export default function Arrow_({ origin, target, originBox, targetBox }) {
  origin = retrievePoint(originBox);
  target = retrievePoint(targetBox);
  return (
    <Group draggable>
      <Arrow
        points={[origin.x + 50, origin.y + 50, target.x + 50, target.y + 50]}
        strokeWidth={5}
        stroke="blue"
      />
      {/* <Line points={[origin.x, origin.y, target.x, target.y]}  strokeWidth={5} stroke="blue" /> */}
    </Group>
  );
}
