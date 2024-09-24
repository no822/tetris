import * as L from './list.js';
import * as B from './block.js';
import * as A from './area.js';

// addNewBlock :: area -> block -> area
export function addNewBlock(area, block) {
  const blockCoordinate = B.coords(block);
  const initCoordinate = initialCoordinate();
  return internal_addBlock(area, initCoordinate, blockCoordinate);
}


export function activeCoords(list) {
  return L.listToArray(list)
      .flat()
      .filter(i => {
        return !Number.isNaN(i);
      })
}

export function initialCoordinate() {
  const coordinate =  L.pair(3, 0);

  return function dispatch(id){
    return id === 'x'
      ? L.head(coordinate)
      : id === 'y'
      ? L.tail(coordinate)
      : "error";
  };
}


export function xyMap(list, x, y) {
  return L.map(
      list,
      (item, xIndex, yIndex) => {
        return !A.is_active(item)
          ? NaN
          : L.list( xIndex + x,
              yIndex + y,
              item
        )
      }
  )
}

// addBlock :: area -> point -> blockCoords -> area
function internal_addBlock(area, initialPoint, newCoords) {
  return (function recur(array, area) {
    if (array.length === 0) return area;

    const [[x, y, point], ...rest] = array;
    const newArea =  L.set_point(x, y, point, area);

    return recur(rest, newArea);
  })(activeCoords(
      xyMap(
          newCoords,
          initialPoint('x'),
          initialPoint('y')
      )
  ), area);
}
