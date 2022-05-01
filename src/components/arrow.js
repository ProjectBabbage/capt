import { Side, norm, arrowConfig } from "../util";
import { Arrow, Circle } from "react-konva";

function projection(tip, side, id, x1, y1, x2, y2) {
  let x = x2 - x1;
  let y = y2 - y1;
  let normSeg = norm(x, y);
  let ux = x / normSeg;
  let uy = y / normSeg;
  let dx = tip.x - x1;
  let dy = tip.y - y1;
  let scal = dx * ux + dy * uy;
  let px = scal * ux + x1;
  let py = scal * uy + y1;
  let inside = scal < normSeg && scal > 0;
  let dist = norm(tip.x - px, tip.y - py);
  let percentage = scal / normSeg;
  return { inside, dist, id, percentage, px, py, side };
}

function reduceProj(prev, next) {
  if (next.inside && (!prev.inside || next.dist < prev.dist)) {
    return next;
  }
  return prev;
}

export function hookOnBox(tip, box) {
  var acc = { inside: false };
  for (let i = 0; i < box.boxes.length; i++) {
    let { id, x, y, h, w } = box.boxes[i];
    let projs = [
      projection(tip, Side.LEFT, id, x, y, x, y + h),
      projection(tip, Side.TOP, id, x, y, x + w, y),
      projection(tip, Side.RIGHT, id, x + w, y, x + w, y + h),
      projection(tip, Side.BOTTOM, id, x, y + h, x + w, y + h)
    ];
    for (let j = 0; j < projs.length; j++) {
      acc = reduceProj(acc, projs[j]);
    }
  }
  if (acc.inside && acc.dist < arrowConfig.snapRange) {
    return { box: acc.id, side: acc.side, percentage: acc.percentage };
  }
}

function buildTip(tip, boxes) {
  if (!tip.box) {
    return { x: tip.x, y: tip.y };
  }
  const { x, y, h, w } = boxes.find(b => b.id === tip.box);
  const p = tip.percentage;
  switch (tip.side) {
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

export function ArrowTip({ x, y, onMove, onMoveEnd }) {
  return (
    <Circle draggable x={x} y={y} radius={arrowConfig.hitboxSize} fill="" onDragMove={obj => onMove(obj.target.attrs.x, obj.target.attrs.y)} onDragEnd={onMoveEnd} />
  );
}

export function buildArrow(arrow, boxes) {
  return { id: arrow.id, start: buildTip(arrow.start, boxes), end: buildTip(arrow.end, boxes) }
}

export function Arrow_({ startTip, endTip }) {
  return (
    <Arrow
      points={[startTip.x, startTip.y, endTip.x, endTip.y]}
      strokeWidth={arrowConfig.strokeWidth}
      stroke={arrowConfig.strokeColor}
    />
  );
}