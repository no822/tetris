import * as AD from "./add.js";
import * as M from "./move.js";
import * as R from "./rotate.js";
import * as L from "./list.js";
import * as A from "./area.js";
import * as D from "./drop.js";

// addNewBlock :: (Area -> Block) -> Area
// add_collider :: (Area, Block) -> Area
export function add_collider(area, block, gameOver) {
  const areaAfterAdd = AD.addNewBlock(area, block);

  if (is_collide_boundary(areaAfterAdd)) return area;
  if (is_already_block(area, areaAfterAdd)) {
    gameOver();
    return area;
  }

  if (D.length_from_floor(areaAfterAdd) === 0) return areaAfterAdd;

  return D.length_from_ghost(A.add_ghost(areaAfterAdd)) <= 1
    ? areaAfterAdd
    : A.add_ghost(areaAfterAdd);
}

// move_active_block :: (Area -> Direction) -> Area
// move_collider :: (Area, Direction) -> Area
export function move_collider(area, direction, is_hide_ghost = false) {
  const areaAfterMove = M.move_active_block(area, direction);

  if (is_collide_boundary(areaAfterMove)) return area;
  if (is_collide_before_move(area, direction)) return area;
  if (is_already_block(area, areaAfterMove)) return area;

  if (is_hide_ghost) return A.removeGhost(areaAfterMove);

  return D.length_from_ghost(A.add_ghost(areaAfterMove)) <= 1
    ? A.removeGhost(areaAfterMove)
    : A.add_ghost(areaAfterMove);
}

// rotateBlock :: (Area -> Direction -> Coord) -> Area
// rotate_collider :: (Area, Direction, Coords) -> Area
export function rotate_collider(area, direction, axisCoord) {
  const areaAfterRotate = R.rotateBlock(area, direction, axisCoord);

  if (is_collide_boundary(areaAfterRotate)) return area;
  if (is_already_block(area, areaAfterRotate)) return area;

  if (D.length_from_floor(areaAfterRotate) === 0) return areaAfterRotate;

  return D.length_from_ghost(A.add_ghost(areaAfterRotate)) <= 1
    ? A.removeGhost(areaAfterRotate)
    : A.add_ghost(areaAfterRotate);
}

// is_collide_boundary :: Area -> boolean
function is_collide_boundary(afterArea) {
  const listArea = L.listToArray(afterArea);

  // x축 범위 벗어난 경우
  const activeBlockValues = listArea.flat().filter((n) => A.is_active(n));
  if (activeBlockValues.length !== 4) return true;

  // y축 범위 벗어난 경우
  const isRangeX = listArea.every((x) => x.length === 10);
  const isRangeY = listArea.length === 20;

  if (!isRangeX || !isRangeY) return true;

  return false;
}

// is_collide_before_move :: (Area, Direction) -> boolean
function is_collide_before_move(beforeArea, direction) {
  function filter_current_coords(currentCoords, nextCoords) {
    return nextCoords.filter((nc) => {
      return (
        currentCoords.find((cc) => cc[0] === nc[0] && cc[1] && nc[1]) ===
        undefined
      );
    });
  }

  const currentActiveCoords = A.find_active_coords(beforeArea);

  if (direction === "up") return true;

  if (direction === "right") {
    const rightBlockCoords = filter_current_coords(
      currentActiveCoords,
      currentActiveCoords.map(([x, y]) => {
        return [x + 1, y];
      }),
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
      currentActiveCoords,
      currentActiveCoords.map(([x, y]) => {
        return [x - 1, y];
      }),
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

// is_already_block :: Area -> Area -> boolean
function is_already_block(beforeArea, afterArea) {
  const pointsAfterMove = A.find_active_coords(afterArea).map(([x, y]) => {
    return L.point(x, y, beforeArea);
  });

  for (let i = 0; i < pointsAfterMove.length; i++) {
    if (A.is_inactive(pointsAfterMove[i])) return true;
  }

  return false;
}
