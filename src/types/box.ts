import { Arrow } from "./arrow";

export type Box = {
  id: number,
  x: number,
  y: number,
  w: number,
  h: number,
  text: string,
  notes: string | null,
  boxes: Box[],
  arrows: Arrow[],
  parent: Box | null
}