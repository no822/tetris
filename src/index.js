// <요구사항 정리>
  // 진척도: 21% (4/19)

  // - 구성요소들
  // [x] 7종류의 블럭들: 블럭 종류, 색상
  // [x] 10 * 20 의 게임 영역

  // - 블럭관련기능
  // [x] 블럭 생성
  // [x] 블록 움직임(상하좌우, 회전)
  // [ ] 블럭 제거

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
  // [ ] Area
  // [ ] Block
  // [ ] Point
  // [ ] Next Blocks
  // [ ] game end

  // - Interaction
  // [ ] 유저 인풋 이벤트 핸들러

import * as L from './list.js';
import * as B from './block.js';
import * as A from './area.js';
import * as M from './move.js';
import * as AB from './add.js';

const area =
    M.moveBlock(
      M.moveBlock(
          AB.addNewBlock(
              A.GameArea(),
              B.makeRandomBlock()
          ),
          'down'
      ),
      'up'
    )

console.log(L.listToArray(area))
