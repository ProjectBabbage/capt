import Konva from "konva";
import { Stage, Layer, Text} from "react-konva";
import Box from "./components/box";
import Arrow from "./components/arrow";
import rootBox from "./diagram.json";
import { useState, useEffect, useTransition } from "react";
import NavigationInput from "./components/navigationInput";


function App() {
  const canvasSize = Math.min(window.innerWidth, window.innerHeight);

  const [, startTransition] = useTransition();
  const [currentBox, setCurrentBox] = useState(rootBox);

  function handleBoxTransition(canvasObj, box) {
    startTransition(() => {
      canvasObj.to({
        x:0,
        y:0,
        scaleX: canvasSize/box.w,
        scaleY: canvasSize/box.h,
        duration: 0.35,
        easing: Konva.Easings.EaseInOut,
        onFinish: () => setCurrentBox(box)
      })
      
    })
  }

  let box_map = {};
  currentBox.boxes.forEach((box) => {
    box_map[box.id] = box;
  });
  const [boxMap, setBoxMap] = useState(box_map);

  const boxes = currentBox.boxes.map((box) => (
    <Box
      box={box}
      onClickSetCurrent={setCurrentBox}
      onMove={(boxId, x, y) => {
        setBoxMap({ ...boxMap, [boxId]: { ...boxMap[boxId], x, y } })
      }}
      onClickHandleBoxTransition={handleBoxTransition}
      key={"box" + box.id}
    />
  ));
  const arrows = currentBox.arrows.map((arrow) => (
    <Arrow
      origin={{
        ...arrow.start,
        box: boxMap[arrow.start.box]
      }}
      target={{
        ...arrow.end,
        box: boxMap[arrow.end.box]
      }}
      key={arrow.id}
    />
  ));

  return (
    <div>
      <NavigationInput jsonTree={rootBox} current={currentBox}/>
      <Stage
        width={canvasSize}
        height={canvasSize}
        style={{ backgroundColor: "white", width: canvasSize, height: canvasSize }}
      >
        <Layer>
          <Text text="Capt, in progress.." fontSize={100}></Text>
          {boxes}
          {arrows}
        </Layer>
    </Stage>
    </div>
  );
}

export default App;
