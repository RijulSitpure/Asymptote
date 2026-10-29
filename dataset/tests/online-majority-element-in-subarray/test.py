import bisect
from collections import defaultdict

class MajorityChecker:
    def __init__(self, arr: list[int]):
        self.n = len(arr)
        self.pos = defaultdict(list)
        for i, val in enumerate(arr):
            self.pos[val].append(i)
        self.tree = [(0, 0)] * (4 * self.n)
        self._build(arr, 1, 0, self.n - 1)

    def _merge(self, a, b):
        v1, c1 = a
        v2, c2 = b
        if v1 == v2:
            return (v1, c1 + c2)
        elif c1 >= c2:
            return (v1, c1 - c2)
        else:
            return (v2, c2 - c1)

    def _build(self, arr, node, l, r):
        if l == r:
            self.tree[node] = (arr[l], 1)
            return
        mid = (l + r) // 2
        self._build(arr, 2 * node, l, mid)
        self._build(arr, 2 * node + 1, mid + 1, r)
        self.tree[node] = self._merge(self.tree[2 * node], self.tree[2 * node + 1])

    def _query_tree(self, node, l, r, ql, qr):
        if ql <= l and r <= qr:
            return self.tree[node]
        mid = (l + r) // 2
        if qr <= mid:
            return self._query_tree(2 * node, l, mid, ql, qr)
        if ql > mid:
            return self._query_tree(2 * node + 1, mid + 1, r, ql, qr)
        left_res = self._query_tree(2 * node, l, mid, ql, qr)
        right_res = self._query_tree(2 * node + 1, mid + 1, r, ql, qr)
        return self._merge(left_res, right_res)

    def query(self, left: int, right: int, threshold: int) -> int:
        cand, _ = self._query_tree(1, 0, self.n - 1, left, right)
        indices = self.pos[cand]
        cnt = bisect.bisect_right(indices, right) - bisect.bisect_left(indices, left)
        return cand if cnt >= threshold else -1

mc = MajorityChecker([1, 1, 2, 2, 1, 1])
assert mc.query(0, 5, 4) == 1
assert mc.query(0, 3, 3) == -1
assert mc.query(2, 3, 2) == 2
print("All tests passed successfully.")
