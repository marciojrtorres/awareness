/* eslint-disable require-jsdoc, no-console */

function where(origin, target, count = 0) {
  if (origin.visited) return {count};
  origin.visited = true;
  if (origin === target) return {count};
  const r = {right: 100, left: 100, top: 100};
  if (origin.right && ! origin.right.visited) {
    r.right = where(origin.right, target, count + 1)['count'];
  }
  if (origin.left && ! origin.left.visited) {
    r.left = where(origin.left, target, count + 1)['count'];
  }
  if (origin.top && ! origin.top.visited) {
    r.top = where(origin.top, target, count + 1)['count'];
  }
  return {count: Math.min(r.left, r.right, r.top),
    dir: (r.right < r.left && r.top ? 1 : (r.top < r.left ? 0 : -1))};
}

const n0 = {id: 0};
const n1 = {id: 1};
const n2 = {id: 2};
const n3 = {id: 3};

n0.right = n1;
n1.left = n0;

n1.right = n2;
n2.left = n1;

n1.top = n3;
n3.left = n1;

console.log(where(n2, n3));
// console.log({n0,n1,n2,n3})
