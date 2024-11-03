/*
****** 요구사항 정리 *****
진척도: 80% (24/30 * 100)

***** 기능 *****
[x] 7종류의 블럭들: 블럭 종류, 색상
[x] 10 * 20 의 게임 영역

***** 블럭관련기능 *****
[x] 블럭 생성
[x] 블럭 색상 설정
[x] 블록 움직임(상하좌우, 회전)

***** 경계충돌 *****
[x] 블럭 생성시
[x] 블럭 이동시
[x] 블럭 회전시

***** 블럭충돌 *****
[x] 블럭 착지
[x] 안착한 블럭과 충돌
[x] 블럭 제거(한줄 완성시)

***** 게임진행관련기능 *****
[ ] 게임 Start
[ ] 점수 manager
[x] 다음 블럭
[ ] 난이도(블럭 스피드, 점수 상승 공식) <
[x] 게임오버

***** UI *****
[x] Area
[x] Block
[x] Point
[x] Next Blocks
[ ] Game Over
[x] Ghost Block(착지 지점 피드백)

***** Control *****
[x] 유저 인풋 이벤트 핸들러
[x] 하드 드롭
[ ] wall kick(가장자리에서 회전시 블록 보정) 구현

***** 버그픽스 *****
[x] landing 로직 수정(아래로 한번 더 움직였을때 발동하도록 변경)
[x] 좌우 충돌 특정 경우에 제대로 작동하지 않는 문제
[x] 블록 회전시 충돌한 경우 대응
[x] Ghost Block 깜박이는 문제
[ ] landing, collider 관련 테스트코드 보완

***** Advanced ***** (todo 카운팅에서는 제외)
  - 블럭 랜덤 생성 가중치
  - 'Super Rotation System' 적용
  - 렌더링 최적화
  - 다양한 렌더러 구현
  - 블록 홀드 기능
 */

import * as A from "./area.js";
import * as B from "./block.js";
import * as C from "./collider.js";
import * as L from "./list.js";
import * as E from "./event.js";
import * as RE from "./render.js";
import * as BQ from "./block_queue.js";

function init() {
  let event;

  function initial_area() {
    if (event) {
      document.removeEventListener("keydown", event);
    }

    const block = B.makeRandomBlock();
    const blockColor = B.color(block);
    const area = C.add_collider(A.GameArea(), block);
    const block_queue = BQ.init_block_queue();

    RE.render(
      area,
      blockColor,
      BQ.get_current_blocks(block_queue).map((block) => {
        return B.color(block);
      }),
      BQ.get_current_blocks(block_queue).map((block) => {
        return L.listToArray(B.coords(block));
      }),
    );

    return [area, blockColor, block_queue];
  }

  function restart_game() {
    const [newArea, newBlockColor, newBlockQueue] = initial_area();
    if (event) {
      document.removeEventListener("keydown", event);
    }

    event = E.handlerSetter(
      newArea,
      newBlockQueue,
      newBlockColor,
      restart_game,
    );

    document.addEventListener("keydown", event);
  }

  const [initialArea, initialBlockColor, initialBlockQueue] = initial_area();

  RE.gameStart(() => {
    RE.deleteStartPopup();
    event = E.handlerSetter(
      initialArea,
      initialBlockQueue,
      initialBlockColor,
      restart_game,
    );
    document.addEventListener("keydown", event);
  });
}

init();

// catch console.log message
// (function () {
//   const initial_message1 = "> type";
//   const initial_message2 = `console.log(\"game start\")`;
//   const iniaial_message1_style = `
//     color:black;`;
//   const iniaial_message2_style = `
//     font-style:italic;
//     color:green;`;
//
//   console.log(
//     `%c${initial_message1} %c${initial_message2}`,
//     iniaial_message1_style,
//     iniaial_message2_style,
//   );
//
//   const originalLog = console.log;
//   console.log = function (...args) {
//     // 로그를 가로채서 원하는 작업을 수행
//     const keyword = args.join(" ");
//     if (keyword === "game start") {
//       init();
//       return "OK";
//     }
//
//     // 원래의 console.log 동작도 유지
//     originalLog.apply(console, args);
//   };
// })();
