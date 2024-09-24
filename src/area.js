import * as L from "./list.js";

export function empty() {
  return 0;
}

export function active() {
  return 2;
}

export function axis() {
  return 3;
}

export function is_active(n){
  return n === active() || is_axis(n);
}

export function is_empty(n) {
  return n === empty();
}

export function is_axis(n) {
  return n === axis();
}

// activeMap :: area -> x -> y -> Array<[number, number, number]>
export function activeMap(area, xMove, yMove) {
  function activeCoords(area) {
    return L.listToArray(area)
      .flat()
      .filter(i => {
        return !Number.isNaN(i);
      })
  }

  function xyMap(area, x, y) {
    return L.map(
      area,
      (item, xIndex, yIndex) => {
        return !is_active(item)
          ? NaN
          : L.list(
              xIndex + x,
              yIndex + y,
              item
        )
      }
    )
  }

  return activeCoords(xyMap(area, xMove, yMove));
}

// removeActive :: list -> list
export function removeActive(list) {
  return L.map(
    list,
    (item) => {
      if (is_active(item)) return empty();
      return item;
    }
  );
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

