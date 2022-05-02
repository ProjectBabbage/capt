import { Box } from "./box"

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