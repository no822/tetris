import * as AD from "./add.js";
import * as M from "./move.js";
import * as R from "./rotate.js";
import * as L from "./list.js";
import * as A from "./area.js";

// addNewBlock :: (Area -> Block) -> Area
// add_collider :: (Area, Block) -> Area
export function add_collider(area, block, gameOver) {
  const areaAfterAdd = AD.addNewBlock(area, block);
  if (is_collide_boundary(areaAfterAdd)) return area;
  if (is_already_block(area, areaAfterAdd)) {
    gameOver();
    return area;
  }

  return areaAfterAdd;
}

// moveBlock :: (Area -> Direction) -> Area
// move_collider :: (Area, Direction) -> Area
export function move_collider(area, direction) {
  const areaAfterMove = M.moveBlock(area, direction);
  if (is_collide_boundary(areaAfterMove)) return area;
  if (is_collide_before_move(area, direction)) return area;
  if (is_already_block(area, areaAfterMove)) return area;

  return areaAfterMove;
}

// rotateBlock :: (Area -> Direction -> Coord) -> Area
// rotate_collider :: (Area, Direction, Coords) -> Area
export function rotate_collider(area, direction, axisCoord) {
  const areaAfterRotate = R.rotateBlock(area, direction, axisCoord);
  if (is_collide_boundary(areaAfterRotate)) return area;
  if (is_already_block(area, areaAfterRotate)) return area;

  return areaAfterRotate;
}

// is_collide_boundary :: Area -> boolean
function is_collide_boundary(afterArea) {
  const listArea = L.listToArray(afterArea);

  // x축 범위 벗어난 경우
  const activeBlockValues = listArea.flat().filter((n) => A.is_active(n));
  if (activeBlockValues.length !== 4) return true;

  // y축 범위 벗어난 경우
  const isCollectX = listArea.every((x) => x.length === 10);
  const isCollectY = listArea.length === 20;
  if (!isCollectX || !isCollectY) return true;

  return false;
}

// is_collide_before_move :: (Area, Direction) -> boolean
function is_collide_before_move(beforeArea, direction) {
  function filter_current_coords(coords, currentCoords) {
    return coords.filter((coord) => {
      return (
        currentCoords.find((c) => c[0] === coord[0] && c[1] && coord[1]) ===
        undefined
      );
    });
  }

  const currentActiveCoords = A.find_active_coords(beforeArea);
  if (direction === "up") true;

  if (direction === "right") {
    const rightBlockCoords = filter_current_coords(
      currentActiveCoords.map(([x, y]) => {
        return [x + 1, y];
      }),
      currentActiveCoords,
    );

    for (let i = 0; i < rightBlockCoords.length; i++) {
      const [x, y] = rightBlockCoords[i];
      const targetPoint = L.point(x, y, beforeArea);
      if (A.is_inactive(targetPoint) || targetPoint === null) {
        return true;
      }
    }
  }

  if (direction === "left") {
    const leftBlockCoords = filter_current_coords(
      currentActiveCoords.map(([x, y]) => {
        return [x - 1, y];
      }),
      currentActiveCoords,
    );

    for (let i = 0; i < leftBlockCoords.length; i++) {
      const [x, y] = leftBlockCoords[i];
      const targetPoint = L.point(x, y, beforeArea);
      if (A.is_inactive(targetPoint) || targetPoint === null) {
        return true;
      }
    }
  }

  return false;
}

function is_already_block(beforeArea, afterArea) {
  const afterActiveCoordInBeforeArea = A.find_active_coords(afterArea).map(
    ([x, y]) => {
      return L.point(x, y, beforeArea);
    },
  );

  for (let i = 0; i < afterActiveCoordInBeforeArea.length; i++) {
    if (A.is_inactive(afterActiveCoordInBeforeArea[i])) return true;
  }

  return false;
}
