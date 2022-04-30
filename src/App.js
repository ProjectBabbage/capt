import { Stage, Layer, Text } from "react-konva";
import Box from "./components/box";
import Arrow from "./components/arrow";
import rootBox from "./diagram.json";
import { useState, useEffect } from "react";


function App() {
  const [currentBox, setCurrentBox] = useState(rootBox);

  const box_map = {};
  currentBox.boxes.forEach((box) => {
    box_map[box.id] = box;
  });
  const [boxMap, setBoxMap] = useState(box_map);

  useEffect(() => {
    console.log(currentBox, '- Has changed')
  }, [currentBox])

  const boxes = currentBox.boxes.map((box) => (
    <Box
      box={box}
      onClickSetCurrent={setCurrentBox}
      onMove={(boxId, x, y) => {
        setBoxMap({ ...boxMap, [boxId]: { ...boxMap[boxId], x, y } })
      }}
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

  const minSize = Math.min(window.innerWidth, window.innerHeight);

  return (
    <Stage
      width={minSize}
      height={minSize}
      style={{ backgroundColor: "white", width: minSize, height: minSize }}
    >
      <Layer>
        <Text text="Capt, in progress.." fontSize={100}></Text>
        {boxes}
        {arrows}
      </Layer>
    </Stage>
  );
}

export default App;
