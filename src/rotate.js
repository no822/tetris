import * as L from "./list.js";
import * as A from "./area.js";

// type Direction = 'right' | 'left'
// type DirectionFromAxis = 'above' | 'below' | 'right' | 'left'
// rotateBlock :: Area -> Direction -> Coord -> Area
export function rotateBlock(area, direction, axisCoord) {
  if (axisCoord === null) return area;
  const movePoints = L.move_points(area);

  const above = find_rotateInfos(area, direction, "above", axisCoord);
  const right = find_rotateInfos(area, direction, "right", axisCoord);
  const left = find_rotateInfos(area, direction, "left", axisCoord);
  const below = find_rotateInfos(area, direction, "below", axisCoord);

  const moveInfos = [...above, ...right, ...left, ...below];

  const isOverY = moveInfos.map(([_, y]) => y).some((n) => n < 0 || n > 19);
  const isOverX = moveInfos.map(([x]) => x).some((n) => n < 0 || n > 9);
  if (isOverX || isOverY) return area;

  return movePoints(moveInfos);
}

/*
find_rotateInfos ::
(
  area,
  directionFromAxis,
  currentAxisCoord,
  nextAxisCoord,
  accMoveInfo
) -> Array<[number, number, number, number]>
*/
function find_rotateInfos(
  area,
  rotateDirection,
  directionFromAxis,
  currentAxisCoord,
  nextAxisCoord = null,
  accMoveInfo = [],
) {
  const axisCoordArray = L.listToArray(currentAxisCoord);
  const nextCoordArray =
    nextAxisCoord === null ? null : L.listToArray(nextAxisCoord);

  const currentSrcCoord = currentSrcCoordinate(
    axisCoordArray,
    directionFromAxis,
  );
  const currentDestBlockCoord = currentDestCoordinate(
    nextCoordArray ?? axisCoordArray,
    directionFromAxis,
    rotateDirection,
  );

  const currentMoveInfo = [
    ...accMoveInfo,
    [...currentSrcCoord, ...currentDestBlockCoord],
  ];

  const currentBlockValue = L.point(
    currentSrcCoord[0],
    currentSrcCoord[1],
    area,
  );

  if (currentBlockValue === A.empty()) return [];

  const nextDirection = find_next_block_direction(
    area,
    L.arrayToList(currentSrcCoord),
    directionFromAxis,
  );

  if (nextDirection) {
    return find_rotateInfos(
      area,
      rotateDirection,
      nextDirection,
      L.arrayToList(currentSrcCoord),
      L.arrayToList(currentDestBlockCoord),
      currentMoveInfo,
    );
  }

  return currentMoveInfo;
}

function currentSrcCoordinate(axisCoordArray, directionFromAxis) {
  return axisCoordArray.map((coord, index) => {
    if (directionFromAxis === "above") return index === 1 ? coord - 1 : coord;
    if (directionFromAxis === "right") return index === 0 ? coord + 1 : coord;
    if (directionFromAxis === "left") return index === 0 ? coord - 1 : coord;
    if (directionFromAxis === "below") return index === 1 ? coord + 1 : coord;
    else throw new Error("invalid directionFromAxis");
  });
}

function currentDestCoordinate(
  axisCoordArray,
  directionFromAxis,
  rotateDirection,
) {
  return axisCoordArray.map((coord, index) => {
    if (rotateDirection === "right") {
      if (directionFromAxis === "above") return index === 0 ? coord + 1 : coord;
      if (directionFromAxis === "right") return index === 1 ? coord + 1 : coord;
      if (directionFromAxis === "left") return index === 1 ? coord - 1 : coord;
      if (directionFromAxis === "below") return index === 0 ? coord - 1 : coord;
    }

    if (rotateDirection === "left") {
      if (directionFromAxis === "above") return index === 0 ? coord - 1 : coord;
      if (directionFromAxis === "right") return index === 1 ? coord - 1 : coord;
      if (directionFromAxis === "left") return index === 1 ? coord + 1 : coord;
      if (directionFromAxis === "below") return index === 0 ? coord + 1 : coord;
    }
  });
}

function find_next_block_direction(area, axisCoord, fromParentAxis) {
  const parentBlockDirection =
    fromParentAxis === "above"
      ? "below"
      : fromParentAxis === "below"
        ? "above"
        : fromParentAxis === "right"
          ? "left"
          : "right";

  const possibleDirections = ["above", "below", "right", "left"].filter(
    (i) => i !== parentBlockDirection,
  ); // 부모의 방향은 제외

  const axisArray = L.listToArray(axisCoord);

  // 각 방향을 탐색
  for (const direction of possibleDirections) {
    const [x, y] = axisArray;
    if (
      (direction === "above" && A.is_active(L.point(x, y - 1, area))) ||
      (direction === "below" && A.is_active(L.point(x, y + 1, area))) ||
      (direction === "right" && A.is_active(L.point(x + 1, y, area))) ||
      (direction === "left" && A.is_active(L.point(x - 1, y, area)))
    ) {
      return direction;
    }
  }

  // 유효한 좌표가 없으면 null 반환
  return null;
}
