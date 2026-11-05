class Fenwick:
    def __init__(self, n: int):
        self.tree = [0] * (n + 1)

    def update(self, idx: int, delta: int):
        idx += 1
        while idx < len(self.tree):
            self.tree[idx] += delta
            idx += idx & (-idx)

    def query(self, idx: int) -> int:
        idx += 1
        s = 0
        while idx > 0:
            s += self.tree[idx]
            idx -= idx & (-idx)
        return s

    def range_query(self, l: int, r: int) -> int:
        return self.query(r) - self.query(l - 1)

def goodSubsequenceQueries(nums: list[int], queries: list[list[int]]) -> list[int]:
    n = len(nums)
    bit = Fenwick(n)
    q_indexed = sorted(enumerate(queries), key=lambda x: x[1][2], reverse=True)
    num_indexed = sorted(enumerate(nums), key=lambda x: x[1], reverse=True)
    
    ans = [0] * len(queries)
    cur_num = 0
    for q_idx, (l, r, thresh) in q_indexed:
        while cur_num < n and num_indexed[cur_num][1] >= thresh:
            idx, val = num_indexed[cur_num]
            bit.update(idx, val)
            cur_num += 1
        ans[q_idx] = bit.range_query(l, r)
    return ans