import * as L from "./list.js";
import * as Q from "./queue.js";

// 큐의 상태를 출력하는 함수
function print_queue(queue) {
  let current = Q.front_ptr(queue); // 큐의 앞부분에서 시작

  if (Q.is_empty_queue(queue)) {
    return "Queue is empty";
  }

  let result = [];
  while (current !== null) {
    result.push(L.head(current));
    current = L.tail(current);
  }

  return result.join(" -> "); // 큐의 요소를 화살표로 연결해 출력
}

describe("queue.js", () => {
  test("빈 queue에 첫번째 item 삽입", () => {
    // given
    const q = Q.make_queue();
    Q.insert_queue(q, "a");

    // when & then
    expect(print_queue(q)).toEqual("a");
  });

  test("빈 queue에 연속으로 두번 삽입", () => {
    // given
    const q = Q.make_queue();
    Q.insert_queue(q, "a");
    Q.insert_queue(q, "b");

    // when & then
    expect(print_queue(q)).toEqual("a -> b");
  });

  test("두개의 요소가 있는 queue에서 요소 하나 삭제", () => {
    // given
    const q = Q.make_queue();
    Q.insert_queue(q, "a");
    Q.insert_queue(q, "b");

    // when
    const dequeue_item = Q.front_queue(q);
    Q.delete_queue(q);

    // then
    expect(dequeue_item).toEqual("a");
    expect(print_queue(q)).toEqual("b");
  });

  test("요소 삭제 후 다시 삽입", () => {
    // given
    const q1 = Q.make_queue();
    const q2 = Q.make_queue();

    Q.insert_queue(q1, "a");
    Q.insert_queue(q1, "b");
    Q.insert_queue(q2, "a");
    Q.insert_queue(q2, "b");
    Q.delete_queue(q1);
    Q.delete_queue(q2);

    // when
    Q.insert_queue(q1, "c");
    Q.insert_queue(q2, "c");

    Q.insert_queue(q2, "d");

    // then
    expect(print_queue(q1)).toEqual("b -> c");
    expect(print_queue(q2)).toEqual("b -> c -> d");
  });

  test("삽입 후 삭제", () => {
    // given
    const q = Q.make_queue();

    Q.insert_queue(q, "a");
    Q.insert_queue(q, "b");
    Q.delete_queue(q);
    Q.insert_queue(q, "c");
    Q.insert_queue(q, "d");

    // when
    Q.delete_queue(q);

    //  then
    expect(print_queue(q)).toEqual("c -> d");
  });
});
