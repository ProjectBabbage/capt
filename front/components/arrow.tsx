import { Side, arrowConfig } from "../config";
import { norm } from "../../common/utils";
import { Arrow as ArrowKonva, Circle } from "react-konva";
import { Box, Arrow, builtTip, Tip, Projection} from "../../common/types";


function projection(tip: builtTip, side: string, id: number, x1: number, y1: number, x2: number, y2: number) {
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

function reduceProj(prev: Projection, next: Projection) {
  if (next.inside && (!prev.inside || next.dist < prev.dist)) {
    return next;
  }
  return prev;
}

export function hookOnBox(tip: builtTip, box: Box) {
  // var acc = { inside: false };
  var acc = { inside: false, dist: Number.MAX_SAFE_INTEGER, id: -1, percentage: 0, px: -1, py: -1, side: '' };
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
    return { box: acc.id, side: acc.side, percentage: acc.percentage, x: null, y: null };
  }
}

function buildTip(tip: Tip | builtTip, boxes: Box[]): builtTip {
  if (tip.x) {
    return tip as builtTip;
  }
  let tip_to_build = tip as Tip;
  const { x, y, h, w } = boxes.find(b => b.id === tip_to_build.box)!;
  const p = tip_to_build.percentage;
  let ret: builtTip = {x: -1, y: -1};
  switch (tip_to_build.side) {
    case Side.LEFT:
      ret = { x: x, y: y + p * h };
      break;
    case Side.RIGHT:
      ret =  { x: x + w, y: y + p * h };
      break;
    case Side.TOP:
      ret =  { x: x + p * w, y: y };
      break;
    case Side.BOTTOM:
      ret = {x: x + p * w, y: y + h };
      break;
    default:
      break;
  }
  return ret;
}

export function ArrowTip({ x, y, onMove, onMoveEnd }: {x: number, y: number, onMove: Function, onMoveEnd: Function}) {
  return (
    <Circle draggable x={x} y={y} radius={arrowConfig.hitboxSize} fill="" onDragMove={obj => onMove(obj.target.attrs.x, obj.target.attrs.y)} onDragEnd={(evt) => onMoveEnd(evt)} />
  );
}

export function buildArrow(arrow: Arrow, boxes: Box[]): {id: Number, start: builtTip, end: builtTip} {
  return { id: arrow.id, start: buildTip(arrow.start, boxes), end: buildTip(arrow.end, boxes) }
}

export function ArrowElement({ startTip, endTip }: {startTip: builtTip, endTip: builtTip}) {
  return (
    <ArrowKonva
      points={[startTip.x, startTip.y, endTip.x, endTip.y]}
      strokeWidth={arrowConfig.strokeWidth}
      stroke={arrowConfig.strokeColor}
    />
  );
}