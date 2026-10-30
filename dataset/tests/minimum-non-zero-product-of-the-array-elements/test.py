class Solution:
    def minNonZeroProduct(self, p: int) -> int:
        MOD = 1_000_000_007
        if p == 1:
            return 1
        val = (1 << p) - 2
        cnt = (1 << (p - 1)) - 1
        return (pow(val, cnt, MOD) * ((1 << p) - 1)) % MOD

def test_min_non_zero_product():
    sol = Solution()
    assert sol.minNonZeroProduct(1) == 1
    assert sol.minNonZeroProduct(2) == 6
    assert sol.minNonZeroProduct(3) == 1512

