import * as L from "./list.js";
import * as B from './block.js';

function initialCoordinate() {
  const coordinate =  L.pair(3, 0);

  return function dispatch(id){
    return id === 'x'
      ? L.head(coordinate)
      : id === 'y'
      ? L.tail(coordinate)
      : "error";
  };
}

export function empty() {
  return 0;
}

export function active() {
  return 2;
}

function is_active(n){
  return n === 2 || is_axis(n);
}

function axis() {
  return 3;
}

function is_empty(n) {
  return n === 0;
}

function is_axis(n) {
  return n === 3;
}

function xyMap(list, x, y) {
  return L.map(
      list,
      (item, xIndex, yIndex) => {
        return !is_active(item)
          ? NaN
          : L.list( xIndex + x,
              yIndex + y,
              item
        )
      }
  )
}

function activeCoords(list) {
  return L.listToArray(list)
      .flat()
      .filter(i => {
        return !Number.isNaN(i);
      })
}

function removeActive(list) {
  return L.map(
      list,
      (item) => {
        if (is_active(item)) return empty();
        return item;
      }
  );
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

// internal_moveBlock :: area -> x -> y -> area
function internal_moveBlock(area, xMove, yMove) {
  return (function recur(array, currentArea) {
    if (array.length === 0) return currentArea;

    const [[x, y, point], ...rest] = array;
    const newArea =  L.set_point(x, y, point, currentArea);
    return recur(rest, newArea);
  })(activeCoords(
      xyMap(
          area,
          xMove,
          yMove
      )
  ), removeActive(area));
}

export function GameArea() {
  return L.list(
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
      L.list(0,0,0,0,0,0,0,0,0,0)
  );
}

// addNewBlock :: area -> block -> area
export function addNewBlock(area, block) {
  const blockCoordinate = B.coords(block);
  const initCoordinate = initialCoordinate();
  return internal_addBlock(area, initCoordinate, blockCoordinate);
}

// moveBlock :: direction -> area
export function moveBlock(area, direction) {
  return direction === 'left'
    ? internal_moveBlock(area, -1, 0)
    : direction === 'right'
    ? internal_moveBlock(area, 1, 0)
    : direction === 'down'
    ? internal_moveBlock(area, 0, 1)
    : direction === 'up'
    ? internal_moveBlock(area, 0, -1)
    : "error"
}

