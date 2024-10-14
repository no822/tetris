import * as L from "./list.js";
import * as A from "./area.js";
import * as C from "./collider.js";
import * as B from "./block.js";
import * as R from "./remove.js";

// landing :: Area -> Area
export function landing(
  areaBeforeMove,
  areaAfterMove,
  currentColor,
  setNewColor,
) {
  if (!is_landing(areaBeforeMove)) {
    return areaAfterMove;
  }

  const nextBlock = B.makeRandomBlock();
  setNewColor(B.color(nextBlock));

  const [newArea, sumOfRemovedLines] = R.remove_lines(
    C.add_collider(
      A.fix_landing_block(A.removeGhost(areaBeforeMove), currentColor),
      nextBlock,
      () => alert("game over"),
    ),
  );

  // TODO 점수 계산 모듈에 전달
  console.log(sumOfRemovedLines);

  return newArea;
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
