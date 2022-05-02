import { useState, useTransition, useRef, useEffect } from "react";
import Konva from "konva";
import { Stage, Layer, Group, Rect } from "react-konva";
import rootBox from "./diagram.json";
import { canvasConfig } from "./config";
import NavigationInput from "./components/navigationInput";
import Arrows from "./components/arrows";
import Notes from "./components/notes";
import Boxes from "./components/boxes";


function App() {
  const canvasSize = canvasConfig.size;
  const currentViewWrapper = useRef();
  
  const [, startTransition] = useTransition();
  const [currentBox, setCurrentBox] = useState(rootBox);
  const [focusedBox, setFocusedBox] = useState(rootBox);
  const [explicitelyFocusedBox, setExplicitelyFocusedBox] = useState(rootBox);

  currentBox.boxes.forEach((box) => {
    box.parent = currentBox;
  });

  useEffect(() => {
    
    setExplicitelyFocusedBox(currentBox);
  }, [currentBox])

  useEffect(() => {
    setFocusedBox(explicitelyFocusedBox)
  }, [explicitelyFocusedBox])

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

  return (
    <div id="app-root">
      <div className="flex-third">
        <NavigationInput jsonTree={rootBox} current={currentBox} handleBoxTransitionBack={handleBoxTransitionBack} />
      </div>
  
      <div className="flex-third">
        <Stage
          width={canvasSize}
          height={canvasSize}
          style={{ backgroundColor: canvasConfig.backgroundColor, width: canvasSize, height: canvasSize }}
        >
          <Layer>
            <Group ref={currentViewWrapper} >
              <Rect 
                width={canvasSize} 
                height={canvasSize} 
                stroke={canvasConfig.strokeColor} 
                strokeWidth={canvasConfig.strokeWidth}
                onClick={(evt) => evt.target === evt.currentTarget ? setExplicitelyFocusedBox(currentBox) : null}/>

              <Boxes
                currentBox={currentBox}
                onClickSetCurrent={setCurrentBox}
                onClickHandleBoxTransition={handleBoxTransition}
                onFocus={setFocusedBox}
                onExplicitFocus={setExplicitelyFocusedBox}
              />

              <Arrows box={currentBox}/>
            </Group>
          </Layer>
        </Stage>
        </div>
  
      <div className="flex-third">
        <Notes box={explicitelyFocusedBox.id === currentBox.id ? focusedBox : explicitelyFocusedBox}/> 
      </div>
    </div>
  );
}

export default App;