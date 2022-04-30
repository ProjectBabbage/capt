import { Stage, Layer, Text, Rect } from "react-konva";
import Box from "./components/box";
import Arrow from "./components/arrow";
import diagram from "./diagram.json";
import { useState, useEffect } from "react";

function App() {
  const [currentBox, setCurrentBox] = useState(0);

  useEffect(() => {
    console.log(currentBox, '- Has changed')
},[currentBox])

  let box_map = {};
  diagram.boxes.forEach((box) => {
    box_map[box.id] = box;
  });
  const boxes = diagram.boxes.map((box) => (
    <Box
      x={box.x}
      y={box.y}
      width={box.w}
      height={box.h}
      text={box.text}
      id={box.id}
      onClick={setCurrentBox}
      key={"box" + box.id}
    />
  ));

  const arrows = diagram.arrows.map((arrow) => (
    <Arrow
      origin={box_map[arrow.start]}
      target={box_map[arrow.end]}
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
