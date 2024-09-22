import {rotateBlock} from "./rotate.js";

function sum(a, b) { return a + b };

describe('rotate.js', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  })
})
