import * as L from "./list.js";

// rotate module

// rotateBlock :: area -> direction -> axisCoordinate -> area
export function rotateBlock(area, direction, axisCoordinate) {
  const aboveCoords = aboveBlockCoordinate(axisCoordinate);
  const belowCoords = belowBlockCoordinate(axisCoordinate);
  const rightCoords = rightBlockCoordinate(axisCoordinate);
  const leftCoords = leftBlockCoordinate(axisCoordinate);

  // TODO

  return append(
      rotateBlock(area, direction, aboveCoords),
      rotateBlock(area, direction, belowCoords),
      rotateBlock(area, direction, rightCoords),
      rotateBlock(area, direction, leftCoords),
  );
}

// append :: (...areas) -> area
function append(...areas) {
  // TODO implementation
  return areas.reduce((prevArea, nextArea) => {
    // mergeArea
  });
}

// aboveBlockCoordinate :: coordinates -> coordinates
export function aboveBlockCoordinate(axisBlockCoordinate) {
  return L.list(
      L.head(axisBlockCoordinate),
      L.head(L.tail(axisBlockCoordinate)) - 1
  );
}

// belowBlockCoordinate :: coordinates -> coordinates
export function belowBlockCoordinate(axisBlockCoordinate) {
  return L.list(
      L.head(axisBlockCoordinate),
      L.head(L.tail(axisBlockCoordinate)) + 1
  );
}

// rightBlockCoordinate :: coordinates -> coordinates
export function rightBlockCoordinate(axisBlockCoordinate) {
  return L.list(
      L.head(axisBlockCoordinate) + 1,
      L.head(L.tail(axisBlockCoordinate))
  );
}

// leftBlockCoordinate :: coordinates -> coordinates
export function leftBlockCoordinate(axisBlockCoordinate) {
  return L.list(
      L.head(axisBlockCoordinate) - 1,
      L.head(L.tail(axisBlockCoordinate))
  );
}
