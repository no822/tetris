import * as A from "./area.js";
import * as D from "./drop.js";
import * as C from "./collider.js";
import * as LD from "./landing.js";
import * as RE from "./render.js";

export function handlerSetter(area, currentBlockColor) {
  return function keyDownHandler(e) {
    const axisCoord = A.axis_coord(area);

    function set_current_block_color(color) {
      currentBlockColor = color;
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
        currentBlockColor,
        set_current_block_color,
      );
      e.preventDefault();

      // hard drop
    } else if (e.key === " " || e.key === "Spacebar") {
      const length_from_floor = D.length_from_floor(area);
      for (let i = 0; i < length_from_floor; i++) {
        area = LD.landing(
          area,
          C.move_collider(area, "down", true),
          currentBlockColor,
          set_current_block_color,
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
    }

    RE.clear();
    RE.render(area, currentBlockColor);
  };
}
