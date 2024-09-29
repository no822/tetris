import * as L from "./list.js";
import * as B from "./block.js";
import * as A from "./area.js";

// addNewBlock :: Area -> Block -> Area
export function addNewBlock(area, block) {
  const blockCoordinate = B.coords(block);
  const initCoordinate = initialCoordinate();
  return internal_addBlock(area, initCoordinate, blockCoordinate);
}

// addBlock :: Area -> point -> blockCoords -> Area
function internal_addBlock(area, initialPoint, newBlockCoords) {
  return (function recur(nextCoordInfos, currentArea) {
    if (nextCoordInfos.length === 0) return currentArea;

    const [[x, y, point], ...rest] = nextCoordInfos;
    const newArea = L.set_point(x, y, point, currentArea);

    return recur(rest, newArea);
  })(A.activeMap(newBlockCoords, initialPoint("x"), initialPoint("y")), area);
}

function initialCoordinate() {
  const coordinate = L.pair(3, 0);

  return function dispatch(id) {
    return id === "x"
      ? L.head(coordinate)
      : id === "y"
        ? L.tail(coordinate)
        : "error";
  };
}
