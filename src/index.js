import * as L from './list.js';
import * as B from './block.js';
import * as A from './area.js';
import * as R from './rotate.js';

// TODO jest 환경 설정

const area =
  A.moveBlock(
      A.addNewBlock(
          A.GameArea(),
          B.ZBLOCK()
      ),
      'down'
  )

const axisCoord = L.list(4, 1);

const rotate1 = R.rotateBlock(area, 'right', axisCoord);
const rotate2 = R.rotateBlock(rotate1, 'right', axisCoord);
const rotate3 = R.rotateBlock(rotate2, 'right', axisCoord);
const rotate4 = R.rotateBlock(rotate3, 'right', axisCoord);

console.log(L.listToArray(rotate1))
console.log(L.listToArray(rotate2))
console.log(L.listToArray(rotate3))
console.log(L.listToArray(rotate4))

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

