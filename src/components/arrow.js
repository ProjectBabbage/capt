import { Arrow, Group } from "react-konva";

const Side = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  TOP: "TOP",
  BOTTOM: "BOTTOM",
}

function retrievePoint(target) {
  if (target.box === undefined) {
    return target;
  }
  const { x, y, h, w } = target.box;
  const p = target.percentage;
  switch (target.side) {
    case Side.LEFT:
      return { x: x, y: y + p * h };
    case Side.RIGHT:
      return { x: x + w, y: y + p * h };
    case Side.TOP:
      return { x: x + p * w, y: y };
    case Side.BOTTOM:
      return { x: x + p * w, y: y + h };
    default:
      break;
  }
}

export default function Arrow_({ origin, target }) {
  const originPoint = retrievePoint(origin);
  const targetPoint = retrievePoint(target);
  return (
    <Group>
      <Arrow
        points={[originPoint.x, originPoint.y, targetPoint.x, targetPoint.y]}
        strokeWidth={5}
        stroke="black"
      />
      {/* <Line points={[origin.x, origin.y, target.x, target.y]}  strokeWidth={5} stroke="blue" /> */}
    </Group>
  );
}
