import * as A from "./area.js";
import * as B from "./block.js";
import * as C from "./collider.js";
import * as D from "./drop.js";
import * as R from "./remove.js";
import * as L from "./list.js";
import * as LD from "./landing.js";
import * as RE from "./render.js";
import * as BQ from "./block_queue.js";

export function handlerSetter(area, blocks, currentBlockColor, restartGame) {
  let isGameOver = false;

  return function keyDownHandler(e) {
    const axisCoord = A.axis_coord(area);

    function game_over() {
      isGameOver = true;

      RE.resetGame(area, currentBlockColor, blocks);
      RE.gameOver(() => restartGame());
    }

    function set_current_color(color) {
      currentBlockColor = color;
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

      set_current_color(B.color(nextBlock));

      return newArea;
    }

    // moving
    if (e.key === "j") {
      area = C.move_collider(area, "left");
      e.preventDefault();
    } else if (e.key === "l") {
      area = C.move_collider(area, "right");
      e.preventDefault();
    } else if (e.key === "k") {
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
    } else if (e.key === "f") {
      area = C.rotate_collider(area, "right", axisCoord);
      e.preventDefault();
    } else if (e.key === "d") {
      area = C.rotate_collider(area, "left", axisCoord);
      e.preventDefault();
    } else {
      return;
    }

    if (!isGameOver) {
      RE.render(
        area,
        currentBlockColor,
        BQ.get_current_blocks(blocks).map((block) => {
          return B.color(block);
        }),
        BQ.get_current_blocks(blocks).map((block) => {
          return L.listToArray(B.coords(block));
        }),
      );
    }
  };
}
