class Fenwick:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)
    def add(self, i, delta):
        i += 1
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)
    def query(self, i):
        i += 1
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

class Solution:
    def minInteger(self, num: str, k: int) -> str:
        from collections import deque
        n = len(num)
        pos = [deque() for _ in range(10)]
        for i, ch in enumerate(num):
            pos[int(ch)].append(i)
        bit = Fenwick(n)
        res = []
        for _ in range(n):
            for d in range(10):
                if pos[d]:
                    orig = pos[d][0]
                    cost = orig - bit.query(orig)
                    if cost <= k:
                        k -= cost
                        bit.add(orig, 1)
                        pos[d].popleft()
                        res.append(str(d))
                        break
        return "".join(res)

def test():
    sol = Solution()
    assert sol.minInteger("4321", 4) == "1342", "test 1 failed"
    assert sol.minInteger("100", 1) == "010", "test 2 failed"
    assert sol.minInteger("36789", 1000) == "36789", "test 3 failed"
    print("✓ minimum-possible-integer-after-at-most-k-adjacent-swaps-on-digits passed")

if __name__ == "__main__":
    test()
