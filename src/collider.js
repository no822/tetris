import * as AD from "./add.js";
import * as M from "./move.js";
import * as R from "./rotate.js";
import * as L from "./list.js";
import * as A from "./area.js";

// addNewBlock :: (Area -> Block) -> Area
// add_collider :: (Area, Block) -> Area
export function add_collider(area, block, gameOver) {
  const areaAfterAdd = AD.addNewBlock(area, block);
  if (is_collide(areaAfterAdd)) {
    gameOver();
    return afea;
  }

  return areaAfterAdd;
}

// moveBlock :: (Area -> Direction) -> Area
// move_collider :: (Area, Direction) -> Area
export function move_collider(area, direction) {
  const areaAfterMove = M.moveBlock(area, direction);
  return is_collide(areaAfterMove) ? area : areaAfterMove;
}

// rotateBlock :: (Area -> Direction -> Coord) -> Area
// rotate_collider :: (Area, Direction, Coords) -> Area
export function rotate_collider(area, direction, axisCoord) {
  const areaAfterRotate = R.rotateBlock(area, direction, axisCoord);
  return is_collide(areaAfterRotate) ? area : areaAfterRotate;
}

// is_collide :: Area -> boolean
function is_collide(afterArea) {
  const listArea = L.listToArray(afterArea);

  const activeBlockValues = listArea.flat().filter((n) => A.is_active(n));
  if (activeBlockValues.length !== 4) return true;

  const isCollectX = listArea.every((x) => x.length === 10);
  const isCollectY = listArea.length === 20;
  if (!isCollectX || !isCollectY) return true;

  return false;
}
