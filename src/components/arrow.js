import { Arrow, Line, Group } from "react-konva";

export default function Arrow_({ origin, target }) {

  return (
    <Group>
      <Arrow
        points={[
          origin.x + 50,
          origin.y + 50,
          target.x + 50,
          target.y + 50,
        ]}
        strokeWidth={5}
        stroke="blue"
      />
      {/* <Line points={[origin.x, origin.y, target.x, target.y]}  strokeWidth={5} stroke="blue" /> */}
    </Group>
  );
}
