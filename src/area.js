import * as L from "./list.js";

export function empty() {
  return 0;
}

export function inactiveColor(n) {
  if (n === 1) return "blue";
  if (n === 11) return "orange";
  if (n === 21) return "yellow";
  if (n === 31) return "limegreen";
  if (n === 41) return "red";
  if (n === 51) return "purple";
  else return "cyan";
}

export function inactive(color) {
  if (color === "blue") return 1;
  if (color === "orange") return 11;
  if (color === "yellow") return 21;
  if (color === "limegreen") return 31;
  if (color === "red") return 41;
  if (color === "purple") return 51;
  else return 61;
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

export function is_inactive(n) {
  return (
    n === inactive("blue") ||
    n === inactive("orange") ||
    n === inactive("yellow") ||
    n === inactive("limegreen") ||
    n === inactive("red") ||
    n === inactive("purple") ||
    n === inactive("cyan")
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
