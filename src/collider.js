import * as AD from "./add.js";
import * as M from "./move.js";
import * as R from "./rotate.js";

// collider.js
// objective: 블럭 충돌 기능을 추가하는 고차함수 구현

// <logic>
// - (생성, 이동, 회전) 직전의 Area 를 인자로 받는다
// - (생성, 이동, 회전) 직후의 Area 를 인자로 받는다
// - 해당 Area가 충돌상태인지 확인한다
//  -  만약 충돌상태라면 (생성, 이동, 회전) 직전의 Area 를 반환한다
//  -  충돌 상태가 아니라면 (생성, 이동, 회전) 직후의 Area 를 반환한다
// -> 위의 로직을 기존 로직에 추가할 수 있는 고차함수 구현

// <type siginature>
// - addNewBlock :: (Area -> Block) -> Area
// - moveBlock :: (Area -> Direction) -> Area
// - rotateBlock :: (Area -> Direction -> Coord) -> Area

// add_collider :: (Area, Block) -> Area
export function add_collider(area, block) {
  const areaAfterAdd = AD.addNewBlock(area, block);
  return is_collide(area, areaAfterAdd) ? area : areaAfterAdd;
}

// move_collider :: (Area, Direction) -> Area
export function move_collider(area, direction) {
  const areaAfterMove = M.moveBlock(area, direction);
  return is_collide(area, areaAfterMove) ? area : areaAfterMove;
}

// rotate_collider :: (Area, Direction, Coords) -> Area
export function rotate_collider(area, direction, axisCoord) {
  const areaAfterRotate = R.rotateBlock(area, direction, axisCoord);
  return is_collide(area, areaAfterRotate) ? area : areaAfterRotate;
}

// is_collide :: (Area -> Area) -> boolean
function is_collide(beforeArea, afterArea) {
  // TODO implementation
  // 어떻게 동작하는지 확인 필요
  // - 영역을 넘어갔을 때
  // - 안착한 블럭과 충돌했을때
  // A.active() 4개 있는지 여부 탐색
  return false;
}
