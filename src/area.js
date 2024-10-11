import * as L from "./list.js";
import * as B from "./block.js";
import * as D from "./drop.js";

// constructors
export function empty() {
  return 0;
}

export function ghost() {
  return 9;
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

export function axis_coord(area) {
  return L.find_coordinate(area, axis());
}

// predicates
export function is_ghost(n) {
  return n === ghost();
}

export function is_empty(n) {
  return n === empty() || is_ghost(n);
}

export function is_inactive(n) {
  if (is_ghost(n)) return false;
  return (
    n === inactive(B.color(B.IBLOCK())) ||
    n === inactive(B.color(B.OBLOCK())) ||
    n === inactive(B.color(B.TBLOCK())) ||
    n === inactive(B.color(B.LBLOCK())) ||
    n === inactive(B.color(B.JBLOCK())) ||
    n === inactive(B.color(B.SBLOCK())) ||
    n === inactive(B.color(B.ZBLOCK()))
  );
}

export function is_active(n) {
  return n === active() || is_axis(n);
}

export function is_axis(n) {
  return n === axis();
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

// removeGhost :: Area -> Area
export function removeGhost(area) {
  return removeBlock(area, is_ghost);
}

// removeActive :: Area -> Area
export function removeActive(area) {
  return removeBlock(area, is_active);
}

export function find_ghost_coords(area) {
  return find_coords_in_area(area, is_ghost);
}

export function find_active_coords(area) {
  return find_coords_in_area(area, is_active);
}

function removeBlock(area, predicate) {
  return L.map(area, (item) => {
    if (predicate(item)) return empty();
    return item;
  });
}

function find_coords_in_area(area, predicate) {
  const list = L.listToArray(area);
  const coords = [];

  for (let y = 0; y < list.length; y++) {
    for (let x = 0; x < list[y].length; x++) {
      if (predicate(list[y][x])) {
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

// add_ghost :: Area -> Area
export function add_ghost(area) {
  const active_coords = find_active_coords(area);
  const from_floor = D.length_from_floor(area);
  const ghost_coords = active_coords.map(([x, y]) => {
    return [x, y + from_floor - 1];
  });

  return (function recur(coords, newArea) {
    if (coords.length === 0) return newArea;
    const [[x, y], ...rest] = coords;
    return recur(rest, L.set_point(x, y, ghost(), newArea));
  })(ghost_coords, removeGhost(area));
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
