import * as L from "./list.js";
import * as A from "./area.js";
import * as C from "./collider.js";
import * as B from "./block.js";

// landing :: Area -> Area
export function landing(area, currentColor, setNewColor) {
  if (!is_landing(area)) {
    return area;
  }
  const nextBlock = B.makeRandomBlock();
  setNewColor(B.color(nextBlock));
  return C.add_collider(
    A.fix_landing_block(area, currentColor),
    nextBlock,
    () => alert("game over"),
  );
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
