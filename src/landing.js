import * as L from "./list.js";
import * as A from "./area.js";

// onLanding :: Area -> Area
// landing :: Area -> Area
export function landing(areaBeforeMove, areaAfterMove, onLanding) {
  if (!is_landing(areaBeforeMove)) {
    return areaAfterMove;
  }

  return onLanding(areaBeforeMove);
}

// is_landing :: Area -> boolean
function is_landing(area) {
  const coordAfterDown = A.find_active_coords(area).map(([x, y]) => [x, y + 1]);

  for (let i = 0; i < coordAfterDown.length; i++) {
    const [x, y] = coordAfterDown[i];
    const targetPoint = L.point(x, y, area);
    if (A.is_inactive(targetPoint) || targetPoint === null) {
      return true;
    }
  }

  return false;
}
