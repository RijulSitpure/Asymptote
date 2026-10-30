class BookMyShow:
    def __init__(self, n: int, m: int):
        self.n = n
        self.m = m
        self.tree_max = [0] * (4 * n)
        self.tree_sum = [0] * (4 * n)
        self.used = [0] * n
        self.first_available = 0
        self._build(1, 0, n - 1)

    def _build(self, node: int, l: int, r: int):
        if l == r:
            self.tree_max[node] = self.m
            self.tree_sum[node] = self.m
            return
        mid = (l + r) // 2
        self._build(2 * node, l, mid)
        self._build(2 * node + 1, mid + 1, r)
        self.tree_max[node] = max(self.tree_max[2 * node], self.tree_max[2 * node + 1])
        self.tree_sum[node] = self.tree_sum[2 * node] + self.tree_sum[2 * node + 1]

    def _update(self, node: int, l: int, r: int, idx: int, val: int):
        if l == r:
            self.tree_max[node] = val
            self.tree_sum[node] = val
            return
        mid = (l + r) // 2
        if idx <= mid:
            self._update(2 * node, l, mid, idx, val)
        else:
            self._update(2 * node + 1, mid + 1, r, idx, val)
        self.tree_max[node] = max(self.tree_max[2 * node], self.tree_max[2 * node + 1])
        self.tree_sum[node] = self.tree_sum[2 * node] + self.tree_sum[2 * node + 1]

    def _query_sum(self, node: int, l: int, r: int, ql: int, qr: int) -> int:
        if ql <= l and r <= qr:
            return self.tree_sum[node]
        mid = (l + r) // 2
        res = 0
        if ql <= mid:
            res += self._query_sum(2 * node, l, mid, ql, qr)
        if qr > mid:
            res += self._query_sum(2 * node + 1, mid + 1, r, ql, qr)
        return res

    def _find_first(self, node: int, l: int, r: int, max_r: int, k: int) -> int:
        if self.tree_max[node] < k or l > max_r:
            return -1
        if l == r:
            return l
        mid = (l + r) // 2
        res = self._find_first(2 * node, l, mid, max_r, k)
        if res != -1:
            return res
        return self._find_first(2 * node + 1, mid + 1, r, max_r, k)

    def gather(self, k: int, maxRow: int) -> list[int]:
        row = self._find_first(1, 0, self.n - 1, maxRow, k)
        if row == -1:
            return []
        col = self.used[row]
        self.used[row] += k
        self._update(1, 0, self.n - 1, row, self.m - self.used[row])
        return [row, col]

    def scatter(self, k: int, maxRow: int) -> bool:
        if self._query_sum(1, 0, self.n - 1, 0, maxRow) < k:
            return False
        row = self.first_available
        while k > 0 and row <= maxRow:
            avail = self.m - self.used[row]
            take = min(k, avail)
            self.used[row] += take
            k -= take
            self._update(1, 0, self.n - 1, row, self.m - self.used[row])
            if self.used[row] == self.m:
                row += 1
        self.first_available = row
        return True
