import * as A from "./area.js";
import * as B from "./block.js";
import * as C from "./collider.js";
import * as D from "./drop.js";
import * as R from "./remove.js";
import * as L from "./list.js";
import * as P from "./point.js";
import * as LD from "./landing.js";
import * as RE from "./render.js";
import * as BQ from "./block_queue.js";

export function handlerSetter(area, blocks, currentBlockColor, restartGame) {
  let interval;
  let isGameOver = false;
  let difficulty = 1;
  let removedLines = 0;
  let point = 0;

  function set_current_color(color) {
    currentBlockColor = color;
  }

  function set_difficulty(sum_of_removed_lines) {
    const NEXT_DIFFICULTY_LINES = 10;
    removedLines += sum_of_removed_lines;
    if (removedLines >= NEXT_DIFFICULTY_LINES) {
      difficulty += 1;
      removedLines -= NEXT_DIFFICULTY_LINES;
    }

    autoDownEventHandler(difficulty);
  }

  function set_point(additionalPoint) {
    point += additionalPoint;
  }

  function game_over() {
    isGameOver = true;

    rerender_area(difficulty);
    RE.gameOver(() => restartGame());
  }

  function rerender_area(currentDifficulty) {
    RE.render(
      area,
      currentBlockColor,
      BQ.get_current_blocks(blocks).map((block) => {
        return B.color(block);
      }),
      BQ.get_current_blocks(blocks).map((block) => {
        return L.listToArray(B.coords(block));
      }),
      currentDifficulty,
      point,
    );
  }

  function landingEventHandler(prevArea) {
    const [nextBlock, nextBlocks] = BQ.next_block(blocks);
    blocks = nextBlocks;

    const [newArea, sumOfRemovedLines] = R.remove_lines(
      C.add_collider(
        A.fix_landing_block(A.removeGhost(prevArea), currentBlockColor),
        nextBlock,
        () => game_over(),
      ),
    );

    if (sumOfRemovedLines >= 1) {
      const additionalPoint = P.point(difficulty, sumOfRemovedLines);
      set_point(additionalPoint);
    }
    set_difficulty(sumOfRemovedLines);
    set_current_color(B.color(nextBlock));

    return newArea;
  }

  function autoDownEventHandler(currentDifficulty) {
    if (interval) {
      clearInterval(interval);
    }

    const intervalTime = 1000 - currentDifficulty * 100;
    interval = setInterval(
      () => {
        area = LD.landing(
          area,
          C.move_collider(area, "down"),
          landingEventHandler,
        );

        if (!isGameOver) {
          rerender_area(currentDifficulty);
        } else {
          clearInterval(interval);
        }
      },
      intervalTime <= 200 ? 200 : intervalTime,
    );
  }

  autoDownEventHandler(difficulty);

  // basic eventHandler
  return function keyDownHandler(e) {
    const axisCoord = A.axis_coord(area);

    // moving
    if (e.key === "j" || e.key === "ㅓ") {
      area = C.move_collider(area, "left");
      e.preventDefault();
    } else if (e.key === "l" || e.key === "ㅣ") {
      area = C.move_collider(area, "right");
      e.preventDefault();
    } else if (e.key === "k" || e.key === "ㅏ") {
      area = LD.landing(
        area,
        C.move_collider(area, "down"),
        landingEventHandler,
      );
      e.preventDefault();

      // hard drop
    } else if (e.key === " " || e.key === "Spacebar") {
      const length_from_floor = D.length_from_floor(area);
      for (let i = 0; i < length_from_floor; i++) {
        area = LD.landing(
          area,
          C.move_collider(area, "down", true),
          landingEventHandler,
        );
      }
      e.preventDefault();

      // rotation
    } else if (e.key === "f" || e.key === "ㄹ") {
      area = C.rotate_collider(area, "right", axisCoord);
      e.preventDefault();
    } else if (e.key === "d" || e.key === "ㅇ") {
      area = C.rotate_collider(area, "left", axisCoord);
      e.preventDefault();
    } else {
      return;
    }

    // rerender
    if (!isGameOver) {
      rerender_area(difficulty);
    }
  };
}
