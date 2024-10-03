import * as L from "./list.js";
import * as A from "./area.js";
import * as AD from "./add.js";

// landing :: Area -> Area
export function landing(area, newBlock) {
  if (!is_landing(area)) return area;
  return AD.addNewBlock(activeToInactive(area), newBlock);
}

// activeToInactive :: Area -> Area
function activeToInactive(area) {
  return L.map(area, (i) => {
    if (A.is_active(i)) return A.inactive();
    return i;
  });
}

// is_landing :: Area -> boolean
function is_landing(area) {
  const downMoveBlockCoords = find_active_floor_coords(area);
  const targetBlockCoords = downMoveBlockCoords.map(([x, y]) => {
    return [x, y + 1];
  });

  for (let i = 0; i < targetBlockCoords.length; i++) {
    const [x, y] = targetBlockCoords[i];
    const targetPoint = L.point(x, y, area);
    if (A.is_inactive(targetPoint) || targetPoint === null) {
      return true;
    }
  }

  return false;
}

function find_active_floor_coords(area) {
  const list = L.listToArray(area);
  const coords = [];

  for (let y = 0; y < list.length; y++) {
    for (let x = 0; x < list[y].length; x++) {
      if (A.is_active(list[y][x])) {
        coords.push([x, y]);
      }
    }
  }

  return coords;
}
