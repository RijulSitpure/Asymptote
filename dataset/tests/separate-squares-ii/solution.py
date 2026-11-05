class SegmentTree:
    def __init__(self, xs):
        self.xs = xs
        self.n = len(xs) - 1
        self.count = [0] * (4 * self.n)
        self.width = [0] * (4 * self.n)

    def add(self, i, j, val):
        self._add(0, 0, self.n - 1, i, j, val)

    def _add(self, idx, lo, hi, i, j, val):
        if j <= self.xs[lo] or self.xs[hi + 1] <= i:
            return
        if i <= self.xs[lo] and self.xs[hi + 1] <= j:
            self.count[idx] += val
        else:
            mid = (lo + hi) // 2
            self._add(2 * idx + 1, lo, mid, i, j, val)
            self._add(2 * idx + 2, mid + 1, hi, i, j, val)
        if self.count[idx] > 0:
            self.width[idx] = self.xs[hi + 1] - self.xs[lo]
        elif lo == hi:
            self.width[idx] = 0
        else:
            self.width[idx] = self.width[2 * idx + 1] + self.width[2 * idx + 2]

    def get_width(self):
        return self.width[0]

class Solution:
    def separateSquares(self, squares: list[list[int]]) -> float:
        events = []
        xs_set = set()
        for x, y, l in squares:
            events.append((y, 1, x, x + l))
            events.append((y + l, -1, x, x + l))
            xs_set.add(x)
            xs_set.add(x + l)
        events.sort()
        xs = sorted(list(xs_set))
        
        tree = SegmentTree(xs)
        total_area = 0
        prev_y = events[0][0]
        for y, delta, xl, xr in events:
            total_area += tree.get_width() * (y - prev_y)
            tree.add(xl, xr, delta)
            prev_y = y
            
        half_area = total_area / 2.0
        
        tree = SegmentTree(xs)
        area = 0
        prev_y = events[0][0]
        for y, delta, xl, xr in events:
            w = tree.get_width()
            gain = w * (y - prev_y)
            if area + gain >= half_area:
                return prev_y + (half_area - area) / w
            area += gain
            tree.add(xl, xr, delta)
            prev_y = y
        return 0.0
