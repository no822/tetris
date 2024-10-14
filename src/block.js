import * as L from "./list.js";

export const IBLOCK = function () {
  return L.list(
    "cyan",
    L.list(
      L.list(2, 3, 2, 2),
      L.list(0, 0, 0, 0),
      L.list(0, 0, 0, 0),
      L.list(0, 0, 0, 0),
    ),
  );
};

export const OBLOCK = function () {
  return L.list(
    "yellow",
    L.list(
      L.list(2, 2, 0, 0),
      L.list(2, 2, 0, 0),
      L.list(0, 0, 0, 0),
      L.list(0, 0, 0, 0),
    ),
  );
};

export const TBLOCK = function () {
  return L.list(
    "blue",
    L.list(
      L.list(2, 3, 2, 0),
      L.list(0, 2, 0, 0),
      L.list(0, 0, 0, 0),
      L.list(0, 0, 0, 0),
    ),
  );
};

// 다른 블럭과 축이 다름
export const LBLOCK = function () {
  return L.list(
    "orange",
    L.list(
      L.list(2, 0, 0, 0),
      L.list(2, 3, 2, 0),
      L.list(0, 0, 0, 0),
      L.list(0, 0, 0, 0),
    ),
  );
};

export const JBLOCK = function () {
  return L.list(
    "purple",
    L.list(
      L.list(2, 3, 2, 0),
      L.list(0, 0, 2, 0),
      L.list(0, 0, 0, 0),
      L.list(0, 0, 0, 0),
    ),
  );
};

export const SBLOCK = function () {
  return L.list(
    "green",
    L.list(
      L.list(2, 3, 0, 0),
      L.list(0, 2, 2, 0),
      L.list(0, 0, 0, 0),
      L.list(0, 0, 0, 0),
    ),
  );
};

export const ZBLOCK = function () {
  return L.list(
    "red",
    L.list(
      L.list(0, 3, 2, 0),
      L.list(2, 2, 0, 0),
      L.list(0, 0, 0, 0),
      L.list(0, 0, 0, 0),
    ),
  );
};

export function color(b) {
  return L.head(b);
}

export function coords(b) {
  return L.head(L.tail(b));
}

export function makeBlock(type) {
  return type === "I"
    ? IBLOCK()
    : type === "O"
      ? OBLOCK()
      : type === "J"
        ? JBLOCK()
        : type === "L"
          ? LBLOCK()
          : type === "T"
            ? TBLOCK()
            : type === "S"
              ? SBLOCK()
              : // type === 'Z'
                ZBLOCK();
}

export function makeRandomBlock() {
  // TODO 몬테카를로 방법 적용해보기
  // const types = ["I", "O"];
  const types = ["I", "O", "J", "L", "T", "S", "Z"];
  return makeBlock(types[Math.floor(Math.random() * types.length)]);
}
