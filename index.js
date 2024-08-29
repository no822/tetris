import * as L from './list.js';
import * as B from './block.js';
import * as A from './area.js';

// TODO 테트리스 만들기
const IBlock = B.makeBlock('I');
const OBlock = B.makeBlock('O');
const JBlock = B.makeBlock('J');
const LBlock = B.makeBlock('L');
const BBlock = B.makeBlock('B');
const TBlock = B.makeBlock('T');
const SBlock = B.makeBlock('S');
const ZBlock = B.makeBlock('Z');

// sicpJS 1, 2장의 내용 연습 & 구현력 확인 겸 작업
// 함수 추상화, 데이터 추상화, 추상화 장벽 등을 잘 설계해볼 것

// <1장의 내용 (기억나는대로의) 정리>
// 프로그래밍의 최소 단위 소개(표현식)
// 가장 단순한 형태의 추상화 소개(프로시저 또는 함수)
  // 함수 적용의 모형(정상치환 모형, 인수우선 치환모형)
  // 재귀(일반재귀, 트리재귀 등)
  // 고차함수

// <2장>
// 데이터 추상화
  // 추상화 장벽 개념 소개
  // 생성자, 선택자 등을 통해 데이터 추상화 방법 소개
  // 여러 예제들
    // 유리수 연산
    // 그림 언어
    // 기호 미분
    // 집합의 표현
    // 복소수 연산

// <테트리스 요구사항 정리>
// 구성요소들
  // 10 * 20 의 게임 영역
    // 경계 충돌
  // 4종류의 블럭들: 블럭 종류, 색상, 회전 규칙
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

