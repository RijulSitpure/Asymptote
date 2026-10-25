import math

class Solution:
    def numberOfSets(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        return math.comb(n + k - 1, 2 * k) % MOD

def test():
    sol = Solution()
    assert sol.numberOfSets(4, 2) == 5
    assert sol.numberOfSets(3, 1) == 3
    assert sol.numberOfSets(30, 7) == 796297179

    print("✓ number-of-sets-of-k-non-overlapping-line-segments passed")

if __name__ == '__main__':
    test()
