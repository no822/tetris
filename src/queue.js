import * as L from "./list.js";

export function make_queue() {
  return L.pair(null, null);
}

export function is_empty_queue(queue) {
  return L.is_null(front_ptr(queue));
}

export function front_queue(queue) {
  return L.head(front_ptr(queue));
}

export function front_ptr(queue) {
  return L.head(queue);
}

export function rear_ptr(queue) {
  return L.tail(queue);
}

export function set_front_ptr(queue, item) {
  L.set_head(queue, item);
}

export function set_rear_ptr(queue, item) {
  L.set_tail(queue, item);
}

export function insert_queue(queue, item) {
  const new_pair = L.pair(item, null);

  if (is_empty_queue(queue)) {
    set_front_ptr(queue, new_pair);
    set_rear_ptr(queue, new_pair);
  } else {
    L.set_tail(rear_ptr(queue), new_pair);
    set_rear_ptr(queue, new_pair);
  }

  return queue;
}

export function delete_queue(queue) {
  if (is_empty_queue(queue)) {
    return queue;
  } else {
    set_front_ptr(queue, L.tail(front_ptr(queue)));
    return queue;
  }
}
