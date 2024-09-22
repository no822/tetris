import * as L from "./list.js";
import * as A from "./area.js";

// type direction = 'right' | 'left'
// type place = 'above' | 'below' | 'right' | 'left'
// rotateBlock :: area -> direction -> axisCoordinate -> area
export function rotateBlock(area, direction, axisCoord) {
  const above = find_dest_coords(area, direction, axisCoord, 'above');
  const right = find_dest_coords(area, direction, axisCoord, 'right');
  const left = find_dest_coords(area, direction, axisCoord, 'left');
  const below = find_dest_coords(area, direction, axisCoord, 'below');

  const movePoints = L.move_points(area);
  return movePoints([...above, ...right, ...left, ...below]);
}


// find_dest_coords :: area, direction, axisCoord, type, destCoords
// -> Array<[number, number, number, number]>
function find_dest_coords(
    area,
    rotateDirection,
    axisCoord,
    type,
    destCoords = [],
    nextAxisCoord = null
) {
  const coordArray = L.listToArray(axisCoord);
  const nextCoordArray = nextAxisCoord === null ? null : L.listToArray(nextAxisCoord);

  let currentBlockCoord;
  let currentDestBlockCoord;

  if (type === 'above') {
    currentBlockCoord = coordArray
        .map((coord, index) => index === 1 ? coord - 1 : coord);

    currentDestBlockCoord = (nextCoordArray === null ? coordArray : nextCoordArray)
        .map((coord, index) => {
          if (rotateDirection === 'right') return index === 0 ? coord + 1 : coord;
          if (rotateDirection === 'left') return index === 0 ? coord - 1 : coord;
        });

  } else if (type === 'right') {
    currentBlockCoord = coordArray
        .map((coord, index) => index === 0 ? coord + 1 : coord);

    currentDestBlockCoord = (nextCoordArray === null ? coordArray : nextCoordArray)
        .map((coord, index) => {
          if (rotateDirection === 'right') return index === 1 ? coord + 1 : coord;
          if (rotateDirection === 'left') return index === 1 ? coord - 1 : coord;
        });

  } else if (type === 'left') {
    currentBlockCoord = coordArray
        .map((coord, index) => index === 0 ? coord - 1 : coord);

    currentDestBlockCoord = (nextCoordArray === null ? coordArray : nextCoordArray)
        .map((coord, index) => {
          if (rotateDirection === 'right') return index === 1 ? coord - 1 : coord;
          if (rotateDirection === 'left') return index === 1 ? coord + 1 : coord;
        });

  } else if (type === 'below') {
    currentBlockCoord = coordArray
        .map((coord, index) => index === 1 ? coord + 1 : coord);

    currentDestBlockCoord = (nextCoordArray === null ? coordArray : nextCoordArray)
        .map((coord, index) => {
          if (rotateDirection === 'right') return index === 0 ? coord - 1 : coord;
          if (rotateDirection === 'left') return index === 0 ? coord + 1 : coord;
        });

  } else throw new Error(`not found type: ${type}`);

  const currentMoveInfo = [...destCoords, [...currentBlockCoord, ...currentDestBlockCoord]];
  const nestedDirection = find_nested_direction(
      area,
      L.arrayToList(currentBlockCoord),
      type
  );

  const currentBlockValue = L.point(
      currentBlockCoord[0],
      currentBlockCoord[1],
      area
  );

  if (currentBlockValue === A.empty()) {
    return [];
  }

  if (nestedDirection) {
    return find_dest_coords(
        area,
        rotateDirection,
        L.arrayToList(currentBlockCoord),
        nestedDirection,
        currentMoveInfo,
        L.arrayToList(currentDestBlockCoord)
    );
  } else {
    return currentMoveInfo;
  }
}

function find_nested_direction(area, axisCoord, fromParentAxis) {
  const exceptDirection = fromParentAxis === 'above'
      ? 'below'
      : fromParentAxis === 'below'
      ? 'above'
      : fromParentAxis === 'right'
      ? 'left'
      : 'right';

  const possibleDirections = ['above', 'below', 'right', 'left']
      .filter(i => i !== exceptDirection); // 부모의 방향은 제외

  const axisArray = L.listToArray(axisCoord);

  // 각 방향을 탐색
  for (const direction of possibleDirections) {
    const [x, y] = axisArray;
    if (direction === 'above' && L.point(x, y - 1, area) === A.active()) {
      return direction;
    } else if (direction === 'below' && L.point(x, y + 1, area) === A.active()) {
      return direction;
    } else if (direction === 'right' && L.point(x + 1, y, area) === A.active()) {
      return direction;
    } else if (direction === 'left' && L.point(x - 1, y, area) === A.active()) {
      return direction;
    }
  }

  // 유효한 좌표가 없으면 null 반환
  return null;
}

