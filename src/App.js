import { Stage, Layer, Text } from "react-konva";
import Box from "./components/box";
import Arrow from "./components/arrow";
import diagram from "./diagram.json";

function App() {
  let box_map = {};
  diagram.boxes.forEach((box) => {
    box_map[box.id] = box;
  });
  const boxes = diagram.boxes.map((box) => (
    <Box
      x={box.x}
      y={box.y}
      width={100}
      height={100}
      text={box.text}
      key={"box" + box.id}
    />
  ));

  const arrows = diagram.arrows.map((arrow) => (
    <Arrow origin={box_map[arrow.start]} target={box_map[arrow.end]} key={arrow.id}/>
  ));

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Capt, in progress.." fontSize={100}></Text>
        {boxes}
        {arrows}
      </Layer>
    </Stage>
  );
}

export default App;
