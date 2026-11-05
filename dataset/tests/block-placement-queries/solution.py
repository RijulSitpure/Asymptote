import bisect

class SegmentTree:
    def __init__(self, size):
        self.n = size
        self.tree = [0] * (4 * size)
    
    def update(self, node, l, r, idx, val):
        if l == r:
            self.tree[node] = val
            return
        mid = (l + r) // 2
        if idx <= mid:
            self.update(2 * node, l, mid, idx, val)
        else:
            self.update(2 * node + 1, mid + 1, r, idx, val)
        self.tree[node] = max(self.tree[2 * node], self.tree[2 * node + 1])
    
    def query(self, node, l, r, ql, qr):
        if ql <= l and r <= qr:
            return self.tree[node]
        mid = (l + r) // 2
        res = 0
        if ql <= mid:
            res = max(res, self.query(2 * node, l, mid, ql, qr))
        if qr > mid:
            res = max(res, self.query(2 * node + 1, mid + 1, r, ql, qr))
        return res

class Solution:
    def getResults(self, queries: list[list[int]]) -> list[bool]:
        max_x = min(50005, 3 * len(queries) + 5)
        for q in queries:
            max_x = max(max_x, q[1] + 1)
        
        st = SegmentTree(max_x + 1)
        obstacles = [0, max_x]
        st.update(1, 0, max_x, max_x, max_x)
        
        ans = []
        for q in queries:
            if q[0] == 1:
                x = q[1]
                idx = bisect.bisect_left(obstacles, x)
                prev_obs = obstacles[idx - 1]
                next_obs = obstacles[idx]
                obstacles.insert(idx, x)
                st.update(1, 0, max_x, x, x - prev_obs)
                st.update(1, 0, max_x, next_obs, next_obs - x)
            else:
                _, x, sz = q
                idx = bisect.bisect_right(obstacles, x) - 1
                prev_obs = obstacles[idx]
                max_prev_gap = st.query(1, 0, max_x, 0, prev_obs)
                tail_gap = x - prev_obs
                ans.append(max(max_prev_gap, tail_gap) >= sz)
        return ans