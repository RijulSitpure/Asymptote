import math

class MRUQueue:
    def __init__(self, n: int):
        self.B = int(math.sqrt(n)) or 1
        self.buckets = []
        for i in range(1, n + 1):
            if not self.buckets or len(self.buckets[-1]) == self.B:
                self.buckets.append([])
            self.buckets[-1].append(i)

    def fetch(self, k: int) -> int:
        idx = k - 1
        b_idx = 0
        while idx >= len(self.buckets[b_idx]):
            idx -= len(self.buckets[b_idx])
            b_idx += 1
        val = self.buckets[b_idx].pop(idx)
        self.buckets[-1].append(val)
        for i in range(b_idx, len(self.buckets) - 1):
            if len(self.buckets[i]) < self.B and self.buckets[i + 1]:
                self.buckets[i].append(self.buckets[i + 1].pop(0))
        return val

q = MRUQueue(8)
assert q.fetch(3) == 3
assert q.fetch(5) == 6
assert q.fetch(2) == 2
assert q.fetch(8) == 2
print("All tests passed successfully.")
