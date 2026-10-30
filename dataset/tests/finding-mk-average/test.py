from collections import deque

class Fenwick:
    def __init__(self, size):
        self.tree = [0] * (size + 1)

    def update(self, i, delta):
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & (-i)

    def query(self, i):
        res = 0
        while i > 0:
            res += self.tree[i]
            i -= i & (-i)
        return res

    def find_by_rank(self, rank):
        idx = 0
        for step in [65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]:
            nxt = idx + step
            if nxt < len(self.tree) and self.tree[nxt] < rank:
                rank -= self.tree[nxt]
                idx = nxt
        return idx + 1

class MKAverage:
    def __init__(self, m: int, k: int):
        self.m = m
        self.k = k
        self.q = deque()
        self.MAX_VAL = 100000
        self.bit_count = Fenwick(self.MAX_VAL)
        self.bit_sum = Fenwick(self.MAX_VAL)

    def addElement(self, num: int) -> None:
        self.q.append(num)
        self.bit_count.update(num, 1)
        self.bit_sum.update(num, num)
        if len(self.q) > self.m:
            old = self.q.popleft()
            self.bit_count.update(old, -1)
            self.bit_sum.update(old, -old)

    def _get_smallest_k_sum(self, count: int) -> int:
        if count == 0:
            return 0
        val = self.bit_count.find_by_rank(count)
        cnt_before = self.bit_count.query(val - 1)
        sum_before = self.bit_sum.query(val - 1)
        return sum_before + (count - cnt_before) * val

    def calculateMKAverage(self) -> int:
        if len(self.q) < self.m:
            return -1
        total_sum = self.bit_sum.query(self.MAX_VAL)
        smallest_k = self._get_smallest_k_sum(self.k)
        largest_k = total_sum - self._get_smallest_k_sum(self.m - self.k)
        mid_sum = total_sum - smallest_k - largest_k
        return mid_sum // (self.m - 2 * self.k)

def test_mk_average():
    mk = MKAverage(3, 1)
    mk.addElement(3)
    mk.addElement(1)
    assert mk.calculateMKAverage() == -1
    mk.addElement(10)
    assert mk.calculateMKAverage() == 3
    mk.addElement(5)
    mk.addElement(5)
    mk.addElement(5)
    assert mk.calculateMKAverage() == 5

