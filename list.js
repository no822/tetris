export function pair(x, y) {
  function dispatch(n) {
    return n === 0
        ? x
        : n === 1
        ? y
        : "error" ;
  }
  return dispatch;
};

export function is_pair(p) {
  return typeof p === 'function' && head(p) !== undefined;
}

export function is_null(n) {
  return n == null;
}

export function head(p) {
  return p(0);
};

export function tail(p) {
  return p(1);
};

export function list(...items) {
  const [first, ...rest] = items;
  if (is_null(first)) return null;
  return pair(first, list(...rest));
};

/**
 * list 함수로 만든 연결리스트를 배열로 변환합니다.(debugging 용)
 */
export function display(list) {
  if (is_null(list)) return [];
  return is_pair(head(list))
    ? [display(head(list)), ...display(tail(list))]
    : [head(list), ...display(tail(list))];
};


