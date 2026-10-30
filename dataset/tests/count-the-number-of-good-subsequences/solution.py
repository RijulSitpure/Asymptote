from collections import Counter

class Solution:
    def countGoodSubsequences(self, s: str) -> int:
        MOD = 10**9 + 7
        counts = Counter(s)
        max_c = max(counts.values())
        
        fact = [1] * (max_c + 1)
        inv = [1] * (max_c + 1)
        for i in range(1, max_c + 1):
            fact[i] = (fact[i - 1] * i) % MOD
        inv[max_c] = pow(fact[max_c], MOD - 2, MOD)
        for i in range(max_c - 1, -1, -1):
            inv[i] = (inv[i + 1] * (i + 1)) % MOD
            
        def nCr(n: int, r: int) -> int:
            if r < 0 or r > n:
                return 0
            return (fact[n] * inv[r] % MOD) * inv[n - r] % MOD

        ans = 0
        for f in range(1, max_c + 1):
            ways = 1
            for c in counts.values():
                if c >= f:
                    ways = (ways * (1 + nCr(c, f))) % MOD
            ans = (ans + ways - 1 + MOD) % MOD
        return ans
