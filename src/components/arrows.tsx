import React, { useEffect, useState } from "react";
import { Box } from "../types/box";
import { ArrowTip, ArrowElement, buildArrow, hookOnBox } from "./arrow";

export default function Arrows({box}: {box: Box}){
    const [currentBox, setCurrentBox] = useState(box);
    const arrows = currentBox.arrows.map((arrow) => buildArrow(arrow, currentBox.boxes))

    useEffect(() => {
        setCurrentBox(box);
    }, [box])

    return(
        <React.Fragment>
            {arrows.map(a => (
              <ArrowElement
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
                onMove={(x: number, y: number) => {
                  const rootBox = { ...box };
                  const arrow = rootBox.arrows.find(a => a.id === id)!;
                  arrow.start.x = x;
                  arrow.start.y = y;
                  arrow.start.box = undefined;
                  setCurrentBox(rootBox);
                }}
                onMoveEnd={() => {
                  const candidate = hookOnBox(start, box)
                  if (candidate) {
                    const rootBox = { ...box };
                    const arrow = rootBox.arrows.find(a => a.id === id)!;
                    arrow.start = candidate;
                    setCurrentBox(rootBox);
                  }
                }}
              />,
              <ArrowTip
                x={end.x}
                y={end.y}
                key={"tipe"+id}
                onMove={(x: number, y: number) => {
                  const rootBox = { ...box };
                  const arrow = rootBox.arrows.find(a => a.id === id)!;
                  arrow.end.x = x;
                  arrow.end.y = y;
                  arrow.end.box = undefined;
                  setCurrentBox(rootBox);
                }}
                onMoveEnd={() => {
                  const candidate = hookOnBox(end, box)
                  if (candidate) {
                    const rootBox = { ...box };
                    const arrow = rootBox.arrows.find(a => a.id === id)!;
                    arrow.end = candidate;
                    setCurrentBox(rootBox);
                  }
                }}
              />,
            ])}
        </React.Fragment>
    )
}