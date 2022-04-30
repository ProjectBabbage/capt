import { Rect, Text, Group } from "react-konva";

function Box({ box, onClickSetCurrent }) {
    let {x, y, w, h, text, } = box;
    return (
        <Group draggable x={x} y={y}>
        <Rect width={w} height={h} fill="lightblue" />
        <Text
            width={w}
            height={h}
            text={text}
            align="center"
            verticalAlign="middle"
            fontSize={30}
            onClick={(evt) => {
            if(evt.evt.detail === 2) 
                onClickSetCurrent(box);
            }}/>
        </Group>
    );
}

export default Box;
