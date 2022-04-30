import { Arrow } from "react-konva";


export default function Arrow_({ startTip, endTip }) {
  return (
    <Arrow
      points={[startTip.x, startTip.y, endTip.x, endTip.y]}
      strokeWidth={5}
      stroke="black"
    />
  );
}
