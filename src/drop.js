import * as L from "./list.js";
import * as A from "./area.js";

// length_from_floor :: Area -> number
export function length_from_floor(area) {
  const currentActiveCoords = A.find_active_coords(area);

  function below_coords(coords) {
    return coords
      .map(([x, y]) => [x, y + 1])
      .filter((coord) => {
        return (
          currentActiveCoords.find(
            (c) => c[0] === coord[0] && c[1] === coord[1],
          ) === undefined
        );
      });
  }

  const initialBlockCoords = below_coords(currentActiveCoords);

  return (function recur(targetCoords, count = 1) {
    const is_every_empty = targetCoords
      .map(([x, y]) => L.point(x, y, area))
      .every((n) => A.is_empty(n));

    if (is_every_empty) {
      const newTargetCoords = below_coords(targetCoords);
      return recur(newTargetCoords, count + 1);
    } else {
      return count;
    }
  })(initialBlockCoords);
}
