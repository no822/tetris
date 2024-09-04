import * as L from "./list.js";
import * as B from './block.js';

const initialCoordinate = function() {
  const coordinate =  L.pair(3, 0);

  function dispatch(id){
    return id === 'x'
      ? L.head(coordinate)
      : id === 'y'
      ? L.tail(coordinate)
      : "error";
  }

  return dispatch;
};

function active() {
  return 2;
};

function is_empty(n) {
  return n === 0;
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


// addBlock :: Area -> Coordinate -> Block -> Area
export function addBlock(area, initialPoint, newCoords) {
  const updatedCoords = L.listToArray(
          L.map(
              newCoords,
              (item, xIndex, yIndex) => {
                if (is_empty(item)) return NaN;
                return L.list(
                  xIndex + initialPoint('x'),
                  yIndex + initialPoint('y')
                )
              }
          )
      )
      .flat()
      .filter(i => !Number.isNaN(i));

  return (function recur(list, area) {
    if (list.length === 0) return area;

    const [[x, y], ...rest] = list;
    // TODO 충돌판정 로직 추가
    const newArea =  L.set_point(x, y, active(), area);

    return recur(rest, newArea);
  })(updatedCoords, area);
}

// addNewBlock :: Area -> Block -> Area
export function addNewBlock(area, block) {
  const blockCoordinate = B.coords(block);
  const initCoordinate = initialCoordinate();
  return addBlock(area, initCoordinate, blockCoordinate);
};

// aliveBlock :: Area -> coordinate -> Block
// moveBlock :: Direction -> Area
// rotateBlock :: Direction -> Area

