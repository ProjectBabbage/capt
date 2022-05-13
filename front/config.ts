export const Side = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  TOP: "TOP",
  BOTTOM: "BOTTOM",
}

export const canvasConfig = {
  size: Math.min(window.innerWidth, window.innerHeight),
  strokeColor: "black",
  strokeWidth: 10,
  backgroundColor: "white"
}
  
export const boxConfig = {
  backgroundColor: "white",
  strokeColor: "black",
  strokeWidth: 4
}

export const arrowConfig = {
  strokeColor: "black",
  strokeWidth: 4,
  snapRange: 30,
  hitboxSize: 20
}
