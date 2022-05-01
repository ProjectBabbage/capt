import { useState, useTransition, useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Group, Rect } from "react-konva";
import rootBox from "./diagram.json";
import { canvasConfig } from "./util";
import Box from "./components/box";
import {ArrowTip, Arrow_, buildArrow, hookOnBox } from "./components/arrow";
import NavigationInput from "./components/navigationInput";


function App() {
  const canvasSize = canvasConfig.size;
  const currentViewWrapper = useRef();
  
  const [, startTransition] = useTransition();
  const [currentBox, setCurrentBox] = useState(rootBox);

  currentBox.boxes.forEach((box) => {
    box.parent = currentBox;
  });

  function handleBoxTransitionBack(fromBox, parentBox) {
    // transition
    // parentBox.parentCanvas // we will need this later
    if(parentBox)
      currentViewWrapper.current.to({
        x: fromBox.x,
        y: fromBox.y,
        scaleX: 0.2,
        scaleY: 0.2,
        duration: 0.3,
        onFinish: () => {
          setCurrentBox(parentBox);
          currentViewWrapper.current.to({
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0,
          });
        }
      })
  }

  function handleBoxTransition(canvasObj, box) {
    box.parentCanvas = canvasObj;
    let avancement = 0;
    startTransition(() => {
      canvasObj.moveToTop();
      canvasObj.to({
        x: 0,
        y: 0,
        scaleX: canvasSize / box.w,
        scaleY: canvasSize / box.h,
        duration: 0.3,
        easing: Konva.Easings.EaseOut,
        onUpdate: () => {
          // called each frame during the transition
          avancement = canvasObj.scaleX()/ (canvasSize/box.w);
          if (avancement > 0.5) {
          }
        },
        onFinish: () => {
          setCurrentBox(box);
        }
      })
    })
  }

  const boxes = currentBox.boxes.map((box) => (
    <Box
      box={box}
      onClickSetCurrent={setCurrentBox}
      onMove={(x, y) => {
        const b = { ...currentBox }
        const b1 = b.boxes.find(b2 => b2.id === box.id)
        b1.x = x;
        b1.y = y;

        setCurrentBox(b);
      }}
      onClickHandleBoxTransition={handleBoxTransition}
      key={"box" + box.id}
    />
  ));

  const arrows = currentBox.arrows.map((arrow) => buildArrow(arrow, currentBox.boxes));


  return (
    <div id="app-root">
      <NavigationInput jsonTree={rootBox} current={currentBox} handleBoxTransitionBack={handleBoxTransitionBack} />
      <Stage
        width={canvasSize}
        height={canvasSize}
        style={{ backgroundColor: canvasConfig.backgroundColor, width: canvasSize, height: canvasSize }}
      >
        <Layer>
          <Group ref={currentViewWrapper} >
            <Rect width={canvasSize} height={canvasSize} stroke={canvasConfig.strokeColor} strokeWidth={canvasConfig.strokeWidth}></Rect>
            {boxes}
            {arrows.map(a => (
              <Arrow_
                startTip={a.start}
                endTip={a.end}
                key={a.id}
              />
            ))}
            {arrows.flatMap(({ id, start, end }) => [
              <ArrowTip
                x={start.x}
                y={start.y}
                onMove={(x, y) => {
                  const rootBox = { ...currentBox };
                  const arrow = rootBox.arrows.find(a => a.id === id);
                  arrow.start.x = x;
                  arrow.start.y = y;
                  arrow.start.box = undefined;
                  setCurrentBox(rootBox);
                }}
                onMoveEnd={() => {
                  const candidate = hookOnBox(start, currentBox)
                  if (candidate) {
                    const rootBox = { ...currentBox };
                    const arrow = rootBox.arrows.find(a => a.id === id);
                    arrow.start = candidate;
                    setCurrentBox(rootBox);
                  }
                }}
              />,
              <ArrowTip
                x={end.x}
                y={end.y}
                onMove={(x, y) => {
                  const rootBox = { ...currentBox };
                  const arrow = rootBox.arrows.find(a => a.id === id);
                  arrow.end.x = x;
                  arrow.end.y = y;
                  arrow.end.box = undefined;
                  setCurrentBox(rootBox);
                }}
                onMoveEnd={() => {
                  const candidate = hookOnBox(end, currentBox)
                  if (candidate) {
                    const rootBox = { ...currentBox };
                    const arrow = rootBox.arrows.find(a => a.id === id);
                    arrow.end = candidate;
                    setCurrentBox(rootBox);
                  }
                }}
              />,
            ])}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}

export default App;