import * as L from "./list.js";
import * as A from "./area.js";

// remove_lines :: Area -> [Area, number]
export function remove_lines(area) {
  const remove_target_line_y_indexes = find_removal_lines(area);
  const sum = sum_of_removed_lines(area, remove_target_line_y_indexes, 0);
  return [drop_upper_lines(area, remove_target_line_y_indexes, sum), sum];
}

// find_removal_lines :: Area -> Array<number>
function find_removal_lines(area) {
  const list = L.listToArray(area);
  return list
    .map((line, index) => {
      const is_remove = line.every((point) => A.is_inactive(point));
      return [index, is_remove];
    })
    .filter(([_, is_remove]) => {
      return is_remove;
    })
    .map(([index]) => [index]);
}

// sum_of_removed_lines :: (Area -> Array<number> -> number) -> number
function sum_of_removed_lines(
  area,
  remove_target_y_indexes,
  sumOfRemovedLines,
) {
  if (remove_target_y_indexes.length === 0) {
    return sumOfRemovedLines;
  }

  const [[yIndex], ...rest] = remove_target_y_indexes;

  return sum_of_removed_lines(
    remove_line(area, yIndex),
    rest,
    sumOfRemovedLines + 1,
  );
}

// remove_line :: Area -> number -> Area
function remove_line(area, n) {
  const list = L.listToArray(area);

  return L.arrayToList(
    list.map((line, index) => {
      if (index === n) {
        return line.map(() => A.empty());
      }
      return line;
    }),
  );
}

function drop_upper_lines(area, remove_target_y_indexes, sumOfRemovedLines) {
  const minimum_drop_y_index = Math.min(...remove_target_y_indexes.flat());
  const drop_target_indexes = Array.from({ length: 20 })
    .map((_, index) => index)
    .filter((n) => n < minimum_drop_y_index);

  const moveInfos = drop_target_indexes
    .map((targetIndex) => {
      // [sourceXCoord, sourcYCoord, destXCoord, destYcoord]
      return [
        [0, targetIndex, 0, targetIndex + sumOfRemovedLines],
        [1, targetIndex, 1, targetIndex + sumOfRemovedLines],
        [2, targetIndex, 2, targetIndex + sumOfRemovedLines],
        [3, targetIndex, 3, targetIndex + sumOfRemovedLines],
        [4, targetIndex, 4, targetIndex + sumOfRemovedLines],
        [5, targetIndex, 5, targetIndex + sumOfRemovedLines],
        [6, targetIndex, 6, targetIndex + sumOfRemovedLines],
        [7, targetIndex, 7, targetIndex + sumOfRemovedLines],
        [8, targetIndex, 8, targetIndex + sumOfRemovedLines],
        [9, targetIndex, 9, targetIndex + sumOfRemovedLines],
      ];
    })
    .flat()
    .reverse();

  let newArea = area;
  moveInfos.forEach(([sourceX, sourceY, targetX, targetY]) => {
    newArea = L.set_point(
      targetX,
      targetY,
      L.point(sourceX, sourceY, newArea),
      L.set_point(sourceX, sourceY, A.empty(), newArea),
    );
  });

  return newArea;
}
