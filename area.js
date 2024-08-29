import * as L from "./list.js";
import * as B from './block.js';

const initialCoordinate = function() {
  return L.list(0, 4)
};

const y_coordinate = function(coordinate) {
  return L.head(coordinate);
};

const x_coordinate = function(coordinate) {
  return L.tail(coordinate);
};

export const GameArea = L.list(
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
    L.list(0,0,0,0,0,0,0,0,0,0),
);

// GameArea 는 현재 활성화된 블럭에 대한 상태 필요 -> 2

// addNewBlock :: Area -> Block -> Area
function addNewBlock(area, block) {
  const initialCoordinate = initialCoordinate();
  const blockCoordinate = B.coords(block);
  // 초기 좌표에 블록 요소를 추가한 새 area 요소를 생성하여 반환
  // 1. area 내에서 initialCoordinate 좌표로 이동
  // 2. 1에서 이동한 좌표를 기준으로 값 변경
};

// aliveBlock :: Area -> coordinate -> Block
// moveBlock :: Direction -> Area
// rotateBlock :: Direction -> Area

