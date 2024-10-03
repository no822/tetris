// <요구사항 정리>
// 진척도: 52% (13/25 * 100)

// - 구성요소들

// [x] 7종류의 블럭들: 블럭 종류, 색상
// [x] 10 * 20 의 게임 영역

// - 블럭관련기능
// [x] 블럭 생성
// [x] 블록 움직임(상하좌우, 회전)

// - 경계충돌(Area 상하좌우, 안착한 블럭)
// [x] 블럭 생성시
// [x] 블럭 이동시
// [x] 블럭 회전시

// - 블럭충돌
// [x] 블럭 착지
// [x] 안착한 블럭과 충돌
// [ ] 블럭 제거(한줄 완성시)

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

// - Advanced
// [ ] 블럭 착지 지점 표시 피드백
// [ ] super rotation system 적용
// [ ] wall kick 구현
// [ ] 가장자리에서 회전시 블록 보정

import * as B from "./block.js";
import * as A from "./area.js";
import * as AB from "./add.js";
import * as RE from "./render.js";
import * as C from "./collider.js";
import * as LD from "./landing.js";

// TODO 초기 세팅 코드 모듈 분리
const block = B.makeRandomBlock();
const blockColor = B.color(block);

let area = AB.addNewBlock(A.GameArea(), block);
RE.render(area, blockColor);

// TODO 임시 구현. 모듈 분리
document.addEventListener("keydown", (e) => {
  const axisCoord = A.axis_coord(area);

  if (e.key === "j") {
    area = LD.landing(C.move_collider(area, "left"), B.makeRandomBlock());
  } else if (e.key === "l") {
    area = LD.landing(C.move_collider(area, "right"), B.makeRandomBlock());
  } else if (e.key === "k") {
    area = LD.landing(C.move_collider(area, "down"), B.makeRandomBlock());
  } else if (e.key === "i") {
    area = LD.landing(C.move_collider(area, "up"), B.makeRandomBlock());
  } else if (e.key === "f") {
    area = C.rotate_collider(area, "right", axisCoord);
  } else if (e.key === "d") {
    area = C.rotate_collider(area, "left", axisCoord);
  }

  RE.clear();
  RE.render(area, blockColor);
});
