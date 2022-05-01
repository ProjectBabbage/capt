import React, { useState } from "react";
import { ArrowTip, Arrow_, buildArrow, hookOnBox } from "./arrow";

export default function Arrows({box}){
    const [currentBox, setCurrentBox] = useState(box);
    const arrows = currentBox.arrows.map((arrow) => buildArrow(arrow, currentBox.boxes))

    return(
        <React.Fragment>
            {arrows.map(a => (
              <Arrow_
                startTip={a.start}
                endTip={a.end}
                key={"arrow"+a.id}
              />
            ))}
            {arrows.flatMap(({ id, start, end }) => [
              <ArrowTip
                x={start.x}
                y={start.y}
                key={"tips"+id}
                onMove={(x, y) => {
                  const rootBox = { ...box };
                  const arrow = rootBox.arrows.find(a => a.id === id);
                  arrow.start.x = x;
                  arrow.start.y = y;
                  arrow.start.box = undefined;
                  setCurrentBox(rootBox);
                }}
                onMoveEnd={() => {
                  const candidate = hookOnBox(start, box)
                  if (candidate) {
                    const rootBox = { ...box };
                    const arrow = rootBox.arrows.find(a => a.id === id);
                    arrow.start = candidate;
                    setCurrentBox(rootBox);
                  }
                }}
              />,
              <ArrowTip
                x={end.x}
                y={end.y}
                key={"tipe"+id}
                onMove={(x, y) => {
                  const rootBox = { ...box };
                  const arrow = rootBox.arrows.find(a => a.id === id);
                  arrow.end.x = x;
                  arrow.end.y = y;
                  arrow.end.box = undefined;
                  setCurrentBox(rootBox);
                }}
                onMoveEnd={() => {
                  const candidate = hookOnBox(end, box)
                  if (candidate) {
                    const rootBox = { ...box };
                    const arrow = rootBox.arrows.find(a => a.id === id);
                    arrow.end = candidate;
                    setCurrentBox(rootBox);
                  }
                }}
              />,
            ])}
        </React.Fragment>
    )
}