
export type Projection = {
    inside: boolean,
    dist: number,
    id: number, 
    percentage: number,
    px: number,
    py: number,
    side: string
}

export type builtTip = {
  x: number,
  y: number
}

export type Tip = {
  box: number | Box | undefined,
  side: string,
  percentage: number,
  x: number | null,
  y: number | null
}

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

export type Arrow = {
    id: number,
    start: Tip,
    end: Tip
  }