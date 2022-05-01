import { useState, useTransition, useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Group, Rect } from "react-konva";
import rootBox from "./diagram.json";
import { canvasConfig } from "./config";
import { BoxElement } from "./components/box";
import NavigationInput from "./components/navigationInput";
import Arrows from "./components/arrows";


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
    <BoxElement
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
            <Arrows box={currentBox}/>
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}

export default App;