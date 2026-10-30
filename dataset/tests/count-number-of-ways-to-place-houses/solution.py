class Solution:
    def countHousePlacements(self, n: int) -> int:
        MOD = 1_000_000_007
        a, b = 1, 2
        for _ in range(n):
            a, b = b, (a + b) % MOD
        return (a * a) % MOD
