import { Rect, Text, Group } from "react-konva";


function Box(props){
    return (
        <Group draggable>
        <Rect width={50} height={50} fill="blue"/>
        <Text text={props.text}/>
        </Group>   
    )
}

export default Box;