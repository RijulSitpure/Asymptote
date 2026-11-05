class SegmentTree:
    def __init__(self, size):
        self.n = size
        self.tree = [-1] * (4 * size)
        
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
        if r < ql or l > qr:
            return -1
        mid = (l + r) // 2
        return max(self.query(2 * node, l, mid, ql, qr),
                   self.query(2 * node + 1, mid + 1, r, ql, qr))

class Solution:
    def maxRectangleArea(self, xCoord: list[int], yCoord: list[int]) -> int:
        points = sorted(zip(xCoord, yCoord))
        ys = sorted(set(yCoord))
        y_to_idx = {y: i for i, y in enumerate(ys)}
        
        st = SegmentTree(len(ys))
        last_x = {}
        ans = -1
        
        i = 0
        n = len(points)
        while i < n:
            j = i
            while j < n and points[j][0] == points[i][0]:
                j += 1
            curr_pts = points[i:j]
            for k in range(len(curr_pts) - 1):
                x = curr_pts[k][0]
                y1 = curr_pts[k][1]
                y2 = curr_pts[k + 1][1]
                idx1 = y_to_idx[y1]
                idx2 = y_to_idx[y2]
                if y1 in last_x and y2 in last_x and last_x[y1] == last_x[y2]:
                    prev_x = last_x[y1]
                    max_inside = st.query(1, 0, len(ys) - 1, idx1, idx2)
                    if max_inside <= prev_x:
                        area = (x - prev_x) * (y2 - y1)
                        if area > ans:
                            ans = area
            for x, y in curr_pts:
                idx = y_to_idx[y]
                last_x[y] = x
                st.update(1, 0, len(ys) - 1, idx, x)
            i = j
            
        return ans
