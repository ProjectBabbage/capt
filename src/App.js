import { Stage, Layer, Text } from "react-konva";
import Box from "./components/box";
import Arrow from "./components/arrow";
import rootBox from "./diagram.json";
import { useState, useEffect } from "react";
import NavigationInput from "./components/navigationInput";


function App() {
  const [currentBox, setCurrentBox] = useState(rootBox);

  useEffect(() => {
},[currentBox])

  let box_map = {};
  currentBox.boxes.forEach((box) => {
    box_map[box.id] = box;
  });

  const boxes = currentBox.boxes.map((box) => (
    <Box
      box={box}
      onClickSetCurrent={setCurrentBox}
      key={"box" + box.id}
    />
  ));

  const arrows = currentBox.arrows.map((arrow) => (
    <Arrow
      origin={{
        ...arrow.start,
        box: box_map[arrow.start.box]
      }}
      target={{
        ...arrow.end,
        box: box_map[arrow.end.box]
      }}
      key={arrow.id}
    />
  ));

  const minSize = Math.min(window.innerWidth, window.innerHeight);

  return (
    <div>
      <NavigationInput jsonTree={rootBox} current={currentBox}/>
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
    </div>
  );
}

export default App;
