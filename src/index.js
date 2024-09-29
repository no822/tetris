// <요구사항 정리>
// 진척도: 42% (8/19 * 100)

// - 구성요소들
// [x] 7종류의 블럭들: 블럭 종류, 색상
// [x] 10 * 20 의 게임 영역

// - 블럭관련기능
// [x] 블럭 생성
// [x] 블록 움직임(상하좌우, 회전)
// [ ] 블럭 제거(한줄 완성시)

// - 경계충돌(Area 상하좌우, 안착한 블럭)
// [ ] 블럭 생성시
// [ ] 블럭 이동시
// [ ] 블럭 회전시

// - 게임진행관련기능
// [ ] 게임 Start
// [ ] 점수 manager
// [ ] 다음 블럭
// [ ] 난이도(블럭 스피드, 점수 상승 공식)
// [ ] 게임오버

// - UI
// [x] Area
// [x] Block
// [x] Point
// [ ] Next Blocks
// [ ] Game Over

/// - Interaction
// [x] 유저 인풋 이벤트 핸들러

import * as B from "./block.js";
import * as A from "./area.js";
import * as AB from "./add.js";
import * as RE from "./render.js";
import * as C from "./collider.js";

const block = B.makeRandomBlock();
const blockColor = B.color(block);

let area = AB.addNewBlock(A.GameArea(), block);
let axisCoord = A.axis_coord(area);

// TODO 임시 구현. 모듈 분리 필요
document.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "ArrowLeft") {
    area = C.move_collider(area, "left");
  } else if (e.key === "ArrowRight") {
    area = C.move_collider(area, "right");
  } else if (e.key === "ArrowDown") {
    area = C.move_collider(area, "down");
  } else if (e.key === "ArrowUp") {
    area = C.move_collider(area, "up");
  } else if (e.key === "d") {
    area = C.rotate_collider(area, "right", axisCoord);
  }

  axisCoord = A.axis_coord(area);
  RE.clear();
  RE.render(area, blockColor);
});

RE.render(area, blockColor);
