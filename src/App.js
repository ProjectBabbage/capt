import { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Box from './components/box';

function App() {
  const [ isDragging, setDragging ] = useState(false);
  const [ x, setX ] = useState(50);
  const [ y, setY ] = useState(50);


  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Box text="Text en prop"/>
        <Rect width={50} height={50} fill="red"
          onDragStart={() => {
            setDragging(true);
          }}
          draggable
          onDragEnd={(e) => {
            setDragging(false);
            setX(e.target.x());
            setY(e.target.y());
          }}/>
        <Text
            text="Text 1"
            x={x}
            y={y}
            fill={isDragging ? 'green' : 'black'}            
          />
      </Layer>
    </Stage>
  );
}

export default App;
