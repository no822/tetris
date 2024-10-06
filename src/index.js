// <요구사항 정리>
// 진척도: 60% (17/28 * 100)

// -----------------------
// <기능>
// [x] 7종류의 블럭들: 블럭 종류, 색상
// [x] 10 * 20 의 게임 영역

// - 블럭관련기능
// [x] 블럭 생성
// [x] 블럭 색상 설정
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
// [x] 게임오버

// - UI
// [x] Area
// [x] Block
// [x] Point
// [ ] Next Blocks
// [ ] Game Over

// - Control
// [x] 유저 인풋 이벤트 핸들러
// [x] 하드 드롭

//  - etc
// [ ] wall kick(가장자리에서 회전시 블록 보정) 구현
// [ ] 블럭 착지 지점 표시 피드백

// -----------------------
//  <버그픽스>
// [x] landing 로직 수정(아래로 한번 더 움직였을때 발동하도록 변경)
// [ ] 좌우 충돌 특정 경우에 제대로 작동하지 않는 문제
// [ ] 블록 회전시 충돌한 경우 대응
// [ ] 버그 관련 테스트 코드 보완

// -----------------------
// <Advanced> (todo 카운팅에서는 제외)
//   - 블럭 착지 지점 표시 피드백
//   - super rotation system 적용
//   - wall kick(가장자리에서 회전시 블록 보정) 구현
//   - 렌더링 최적화
//   - 다양한 렌더러 구현

import * as B from "./block.js";
import * as A from "./area.js";
import * as AB from "./add.js";
import * as RE from "./render.js";
import * as C from "./collider.js";
import * as LD from "./landing.js";

// TODO 초기 세팅 코드 모듈 분리
const initialBlock = B.makeRandomBlock();
const initialBlockColor = B.color(initialBlock);

let area = AB.addNewBlock(A.GameArea(), initialBlock);
let currentBlockColor = initialBlockColor;
RE.render(area, currentBlockColor);

// TODO 임시 구현. 모듈 분리
document.addEventListener("keydown", (e) => {
  const axisCoord = A.axis_coord(area);
  function set_current_block_color(color) {
    currentBlockColor = color;
  }

  if (e.key === "j") {
    area = C.move_collider(area, "left");
  } else if (e.key === "l") {
    area = C.move_collider(area, "right");
  } else if (e.key === "k") {
    area = LD.landing(
      area,
      C.move_collider(area, "down"),
      currentBlockColor,
      set_current_block_color,
    );
  } else if (e.key === "Enter") {
    // hard drop
    for (let i = 0; i < 20; i++) {
      area = LD.landing(
        area,
        C.move_collider(area, "down"),
        currentBlockColor,
        set_current_block_color,
      );
    }
  } else if (e.key === "f") {
    area = C.rotate_collider(area, "right", axisCoord);
  } else if (e.key === "d") {
    area = C.rotate_collider(area, "left", axisCoord);
  }

  RE.clear();
  RE.render(area, currentBlockColor);
});
