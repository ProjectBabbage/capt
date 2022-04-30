import { Rect, Text, Group } from "react-konva";

function Box({ x, y, width, height, text, id, onClick }) {
  return (
    <Group draggable x={x} y={y}>
      <Rect width={width} height={height} fill="lightblue" />
      <Text
        width={width}
        height={height}
        text={text}
        align="center"
        verticalAlign="middle"
        fontSize={30}
        onClick={(evt) => {
          if(evt.detail === 2) 
            onClick(id);
        }}/>
    </Group>
  );
}

export default Box;
