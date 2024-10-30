import * as Q from "./queue.js";
import * as B from "./block.js";
import * as L from "./list.js";

export function init_block_queue() {
  const BLOCK_QUEUE_LENGTH = 4;
  const queue = Q.make_queue();

  for (let i = 0; i < BLOCK_QUEUE_LENGTH; i++) {
    const new_block = B.makeRandomBlock();
    Q.insert_queue(queue, new_block);
  }

  return queue;
}

export function next_block(queue) {
  // 1. dequeue a block
  const block = Q.front_queue(queue);
  Q.delete_queue(queue);

  // 2. insert new block
  Q.insert_queue(queue, B.makeRandomBlock());

  return [block, queue];
}

export function get_current_blocks(block_queue) {
  const first = Q.front_ptr(block_queue);

  return (function recur(block, result = []) {
    if (L.is_null(L.tail(block))) {
      return [...result, L.head(block)];
    }

    return recur(L.tail(block), [...result, L.head(block)]);
  })(first);
}
