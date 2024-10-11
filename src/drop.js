import * as L from "./list.js";
import * as A from "./area.js";

// length_from_floor :: Area -> number
export function length_from_floor(area) {
  const currentActiveCoords = A.find_active_coords(area);

  function coords_below_active_block(coords) {
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

  const initialBlockCoords = coords_below_active_block(currentActiveCoords);

  return (function recur(targetCoords, count = 1) {
    const is_no_space = targetCoords.length === 0;

    const is_every_empty = targetCoords
      .map(([x, y]) => L.point(x, y, area))
      .every((n) => A.is_empty(n));

    if (is_no_space) {
      return count;
    } else if (is_every_empty) {
      const newTargetCoords = coords_below_active_block(targetCoords);
      return recur(newTargetCoords, count + 1);
    } else {
      return count;
    }
  })(initialBlockCoords);
}

export function length_from_ghost(area) {
  const currentActiveCoords = A.find_active_coords(area);

  function coords_below_active_block(coords) {
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

  const initialBlockCoords = coords_below_active_block(currentActiveCoords);

  return (function recur(targetCoords, count = 1) {
    const is_no_space = targetCoords.length === 0;
    const is_no_ghost = A.find_ghost_coords(area).length === 0;

    const is_any_ghost = targetCoords
      .map(([x, y]) => L.point(x, y, area))
      .some((p) => A.is_ghost(p));

    if (is_no_space) return 0;
    if (is_no_ghost) return 0;
    if (is_any_ghost) return count;
    else if (!is_any_ghost) {
      const newTargetCoords = coords_below_active_block(targetCoords);
      return recur(newTargetCoords, count + 1);
    } else {
      return count;
    }
  })(initialBlockCoords);
}
