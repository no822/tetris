import * as L from "./list.js";
import * as A from "./area.js";
import * as AD from "./add.js";
import * as C from "./collider.js";

// landing :: Area -> Area
export function landing(area, newBlock) {
  if (!is_landing(area)) return area;
  return C.add_collider(activeToInactive(area), newBlock, () =>
    alert("game over"),
  );
  // return AD.addNewBlock(activeToInactive(area), newBlock);
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
  const currentActiveCoords = A.find_active_coords(area);
  const targetBlockCoords = currentActiveCoords.map(([x, y]) => {
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
