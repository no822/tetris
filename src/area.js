import * as L from "./list.js";
import * as B from "./block.js";

export function empty() {
  return 0;
}

export function inactiveColor(n) {
  if (n === 1) return B.color(B.IBLOCK());
  if (n === 11) return B.color(B.OBLOCK());
  if (n === 21) return B.color(B.TBLOCK());
  if (n === 31) return B.color(B.LBLOCK());
  if (n === 41) return B.color(B.JBLOCK());
  if (n === 51) return B.color(B.SBLOCK());
  if (n === 61) return B.color(B.ZBLOCK());
}

export function inactive(color) {
  if (color === B.color(B.IBLOCK())) return 1;
  if (color === B.color(B.OBLOCK())) return 11;
  if (color === B.color(B.TBLOCK())) return 21;
  if (color === B.color(B.LBLOCK())) return 31;
  if (color === B.color(B.JBLOCK())) return 41;
  if (color === B.color(B.SBLOCK())) return 51;
  if (color === B.color(B.ZBLOCK())) return 61;
}

export function active() {
  return 2;
}

export function axis() {
  return 3;
}

export function is_empty(n) {
  return n === empty();
}

export function is_inactive(c) {
  return (
    c === inactive(B.color(B.IBLOCK())) ||
    c === inactive(B.color(B.OBLOCK())) ||
    c === inactive(B.color(B.TBLOCK())) ||
    c === inactive(B.color(B.LBLOCK())) ||
    c === inactive(B.color(B.JBLOCK())) ||
    c === inactive(B.color(B.SBLOCK())) ||
    c === inactive(B.color(B.ZBLOCK()))
  );
}

export function is_active(n) {
  return n === active() || is_axis(n);
}

export function is_axis(n) {
  return n === axis();
}

export function axis_coord(area) {
  return L.find_coordinate(area, axis());
}

// MoveInfo :: [x, y, point]
// activeMap :: area -> x -> y -> Array<MoveInfo>
export function activeMap(area, xMove, yMove) {
  function activeCoords(area) {
    return L.listToArray(area)
      .flat()
      .filter((i) => {
        return !Number.isNaN(i);
      });
  }

  function xyMap(area, x, y) {
    return L.map(area, (item, xIndex, yIndex) => {
      return !is_active(item) ? NaN : L.list(xIndex + x, yIndex + y, item);
    });
  }

  return activeCoords(xyMap(area, xMove, yMove));
}

// removeActive :: list -> list
export function removeActive(list) {
  return L.map(list, (item) => {
    if (is_active(item)) return empty();
    return item;
  });
}

export function find_active_coords(area) {
  const list = L.listToArray(area);
  const coords = [];

  for (let y = 0; y < list.length; y++) {
    for (let x = 0; x < list[y].length; x++) {
      if (is_active(list[y][x])) {
        coords.push([x, y]);
      }
    }
  }

  return coords;
}

// fix_landing_block :: (Area, currentBlockColor) -> Area
export function fix_landing_block(area, currentBlockColor) {
  return L.map(area, (i) => {
    if (is_active(i)) return inactive(currentBlockColor);
    return i;
  });
}

export function GameArea() {
  return L.list(
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    L.list(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
  );
}
