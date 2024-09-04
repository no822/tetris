import * as L from './list.js';
// 6종류의 블럭들: 블럭 종류, 색상, 회전 규칙

// 생성자: makeBlock
// 선택자: isIBlock, isOBlock, isTBlock, (isLBlock, isJBlock), (isSBlock, isZBlock)
// 모양, 색상

// Q. 블록의 모양을 표현할 수 있는 구조 -> 리스트로 표현 가능(이중 리스트) ✓
// Q. 게임 영역과 블록의 관계는 어떻게 되고, 어떤 방식으로 표현할 수 있는가
  // 블록 생성자로 값을 생성해서 GameArea 생성자의 값과 병합
  // GameArea 에 해당 연산을 위한 함수 제공

export const IBLOCK = L.list(
    'RED',
    L.list(
      L.list(1,1,1,1)
   )
);

export const OBLOCK = L.list(
    'BLUE',
    L.list(
      L.list(1,1,0),
      L.list(1,1,0)
  )
);

export const TBLOCK = L.list(
    'YELLOW',
    L.list(
      L.list(1,1,1),
      L.list(0,1,0)
   )
);

export const LBLOCK = L.list(
    'GREEN',
    L.list(
      L.list(1,0,0),
      L.list(1,1,1)
  )
);

export const JBLOCK = L.list(
    'PURPLE',
    L.list(
      L.list(1,1,1),
      L.list(0,0,1)
   )
);

export const SBLOCK = L.list(
    'CRIMSON',
    L.list(
      L.list(1,1,0),
      L.list(0,1,1)
    )
);

export const ZBLOCK = L.list(
    'GRAY',
    L.list(
      L.list(0,1,1),
      L.list(1,1,0),
    )
);

export function color(b) {
  return L.head(b);
};

export function coords(b) {
  return L.head(L.tail(b));
};

export function makeBlock(type) {
  return type === 'I'
    ? IBLOCK
    : type === 'O'
    ? OBLOCK
    : type === 'J'
    ? JBLOCK
    : type === 'L'
    ? LBLOCK
    : type === 'T'
    ? TBLOCK
    : type === 'S'
    ? SBLOCK
    : // type === 'Z'
    ZBLOCK
};

export function makeRandomBlock() {
  // TODO 몬테카를로 방법 적용해보기
  const types = ['I', 'O', 'J', 'L', 'T', 'S', 'Z'];
  return makeBlock(types[Math.floor(Math.random() * types.length)]);
};

