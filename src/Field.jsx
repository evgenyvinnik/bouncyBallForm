import React from "react";
import { Group, Rect } from "react-konva";
import { WIDTH, HEIGHT } from "./constants";

export default function Field() {
  return (
    <Group>
      <Rect
        x={0}
        y={0}
        width={WIDTH}
        height={HEIGHT}
        fill="rgb(0,0,0)"
        shadowBlur={2}
      />
      <Rect
        x={2}
        y={2}
        width={WIDTH - 4}
        height={HEIGHT - 4}
        fill="rgb(255,255,255)"
      />
    </Group>
  );
}
