import * as L from "./list.js";


export function empty() {
  return 0;
}

export function active() {
  return 2;
}

export function is_active(n){
  return n === active() || is_axis(n);
}

export function axis() {
  return 3;
}

export function is_empty(n) {
  return n === empty();
}

export function is_axis(n) {
  return n === axis();
}


export function GameArea() {
  return L.list(
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0),
      L.list(0,0,0,0,0,0,0,0,0,0)
  );
}

