import { Circle } from "react-konva";


function norm_(x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function projection(tip, side, id, x1, y1, x2, y2) {
  let x = x2 - x1;
  let y = y2 - y1;
  let norm = norm_(x, y);
  let ux = x / norm;
  let uy = y / norm;
  let dx = tip.x - x1;
  let dy = tip.y - y1;
  let scal = dx * ux + dy * uy;
  let px = scal * ux + x1;
  let py = scal * uy + y1;
  let inside = scal < norm && scal > 0;
  let dist = norm_(tip.x - px, tip.y - py);
  let percentage = scal / norm;
  return { inside, dist, id, percentage, px, py, side };
}

function reduceProj(prev, next) {
  if (next.inside && (!prev.inside || next.dist < prev.dist)) {
    return next;
  }
  return prev;
}

export function hookOnBox(tip, box) {
  let accu = { inside: false };
  for (let i = 0; i < box.boxes.length; i++) {
    let { id, x, y, h, w } = box.boxes[i];
    let projs = [
      projection(tip, "LEFT", id, x, y, x, y + h),
      projection(tip, "TOP", id, x, y, x + w, y),
      projection(tip, "RIGHT", id, x + w, y, x + w, y + h),
      projection(tip, "BOTTOM", id, x, y + h, x + w, y + h)
    ];
    for (let j = 0; j < projs.length; j++) {
      accu = reduceProj(tip, projs[j]);
    }
  }
  if (accu.inside && accu.dist < 10) {
    return { box: accu.id, side: accu.side, percentage: accu.percentage };
  }
}

function ArrowTip({ x, y, onMove, onMoveEnd }) {
  return (
    <Circle draggable x={x} y={y} radius={10} fill="" onDragMove={obj => onMove(obj.target.attrs.x, obj.target.attrs.y)} onDragEnd={onMoveEnd} />
  );
}

export default ArrowTip;
