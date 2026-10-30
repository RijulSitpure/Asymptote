class Solution:
    def productQueries(self, n: int, queries: list[list[int]]) -> list[int]:
        MOD = 1_000_000_007
        powers = []
        for b in range(32):
            if (n >> b) & 1:
                powers.append(1 << b)
        
        res = []
        for left, right in queries:
            cur = 1
            for i in range(left, right + 1):
                cur = (cur * powers[i]) % MOD
            res.append(cur)
        return res
