import sys

class Solution:
    def numWays(self, n: int, k: int) -> int:
        if n == 0:
            return 0
        if n == 1:
            return k
        same = k
        diff = k * (k - 1)
        for _ in range(3, n + 1):
            same, diff = diff, (same + diff) * (k - 1)
        return same + diff

def test():
    sol = Solution()
    assert sol.numWays(3, 2) == 6, "test 1 failed"
    assert sol.numWays(1, 1) == 1, "test 2 failed"
    assert sol.numWays(7, 2) == 42, "test 3 failed"
    print("✓ paint-fence passed")

if __name__ == "__main__":
    test()
