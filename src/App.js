import Konva from "konva";
import { Stage, Layer, Text } from "react-konva";
import Box from "./components/box";
import Arrow from "./components/arrow";
import rootBox from "./diagram.json";
import { useState, useEffect, useTransition } from "react";
import NavigationInput from "./components/navigationInput";
import ArrowTip from "./components/arrowTip";


function App() {
  const canvasSize = Math.min(window.innerWidth, window.innerHeight);

  const [, startTransition] = useTransition();
  const [currentBox, setCurrentBox] = useState(rootBox);

  let box_map = {};
  currentBox.boxes.forEach((box) => {
    box_map[box.id] = box;
  });
  const [boxMap, setBoxMap] = useState(box_map);

  function handleBoxTransition(canvasObj, box) {
    startTransition(() => {
      canvasObj.moveToTop();
      canvasObj.to({
        x: 0,
        y: 0,
        scaleX: canvasSize / box.w,
        scaleY: canvasSize / box.h,
        duration: 0.35,
        easing: Konva.Easings.EaseInOut,
        onFinish: () => {
          let box_map = {};
          box.boxes.forEach((b) => {
            box_map[b.id] = b;
          });

          setBoxMap(box_map);
          setCurrentArrowTipsMap(buildTips(box.arrows, box_map))
          setCurrentBox(box);
        }
      })
    })
  }

  const [currentArrowTipsMap, setCurrentArrowTipsMap] = useState(buildTips(currentBox.arrows, boxMap));

  useEffect(() => {
    setCurrentArrowTipsMap(buildTips(currentBox.arrows, boxMap));
  }, [boxMap])

  const boxes = currentBox.boxes.map((box) => (
    <Box
      box={box}
      onClickSetCurrent={setCurrentBox}
      onMove={(x, y) => {
        setBoxMap({ ...boxMap, [box.id]: { ...boxMap[box.id], x, y } })
      }}
      onClickHandleBoxTransition={handleBoxTransition}
      key={"box" + box.id}
    />
  ));

  const arrows = currentBox.arrows.map((arrow) => (
    currentArrowTipsMap[arrow.id] &&
    <Arrow
      startTip={currentArrowTipsMap[arrow.id].start}
      endTip={currentArrowTipsMap[arrow.id].end}
      key={arrow.id}
    />
  ));

  return (
    <div>
      <NavigationInput jsonTree={rootBox} current={currentBox} />
      <h2>Capt</h2>
      <Stage
        width={canvasSize}
        height={canvasSize}
        style={{ backgroundColor: "white", width: canvasSize, height: canvasSize }}
      >
        <Layer>
          {boxes}
          {arrows}
          {Object.entries(currentArrowTipsMap).flatMap(([id, value]) => [
            <ArrowTip x={value.start.x} y={value.start.y} onMove={(x, y) => setCurrentArrowTipsMap({ ...currentArrowTipsMap, [id]: { ...currentArrowTipsMap[id], start: { x, y } } })} />,
            <ArrowTip x={value.end.x} y={value.end.y} onMove={(x, y) => setCurrentArrowTipsMap({ ...currentArrowTipsMap, [id]: { ...currentArrowTipsMap[id], end: { x, y } } })} />
          ])}
        </Layer>
      </Stage>
    </div>
  );
}

function retrievePoint(tip, box) {
  const { x, y, h, w } = box;
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

const Side = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  TOP: "TOP",
  BOTTOM: "BOTTOM",
}

function buildTips(arrows, boxMap) {
  const buildTip = (tip) => {
    if (tip.box) {
      return retrievePoint(tip, boxMap[tip.box])
    }
    return { x: tip.x, y: tip.y };
  }
  return Object.fromEntries(arrows.map(a => [a.id, { start: buildTip(a.start), end: buildTip(a.end) }]));
}

export default App;

