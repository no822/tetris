import * as L from './list.js';
import * as B from './block.js';
import * as A from './area.js';

const area =
    A.moveBlock(
      A.moveBlock(
          A.addNewBlock(
              A.GameArea(),
              B.OBLOCK()
          ),
          'down'
      ),
      'up'
    )

const axisCoord = L.list(4, 1);
console.log(L.listToArray(area))

// <테트리스 요구사항 정리>
// 구성요소들
  // 4종류의 블럭들: 블럭 종류, 색상, 회전 규칙
  // 10 * 20 의 게임 영역
    // 경계 충돌
  // 점수
  // 난이도(블럭 스피드, 점수 상승 공식)
  // 블록 움직임
    // right/left/up/down
    // place block
    // rotate
  // 블럭 생성
  // 블럭 제거
  // user input
    // key binding

