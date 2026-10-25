class Solution:
    def numOfWays(self, n: int) -> int:
        MOD = 10**9 + 7
        aba = 6
        abc = 6
        for _ in range(2, n + 1):
            new_aba = (3 * aba + 2 * abc) % MOD
            new_abc = (2 * aba + 2 * abc) % MOD
            aba, abc = new_aba, new_abc
        return (aba + abc) % MOD

def test():
    sol = Solution()
    assert sol.numOfWays(1) == 12, "test 1 failed"
    assert sol.numOfWays(5000) == 30228214, "test 2 failed"
    print("✓ number-of-ways-to-paint-n-3-grid passed")

if __name__ == "__main__":
    test()
