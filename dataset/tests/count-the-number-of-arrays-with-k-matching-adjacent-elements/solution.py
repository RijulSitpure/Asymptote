class Solution:
    def countGoodArrays(self, n: int, m: int, k: int) -> int:
        MOD = 1_000_000_007
        if k < 0 or k >= n:
            return 0
            
        fact = [1] * n
        inv = [1] * n
        for i in range(1, n):
            fact[i] = (fact[i - 1] * i) % MOD
        inv[n - 1] = pow(fact[n - 1], MOD - 2, MOD)
        for i in range(n - 2, -1, -1):
            inv[i] = (inv[i + 1] * (i + 1)) % MOD
            
        def nCr(n_val: int, r_val: int) -> int:
            if r_val < 0 or r_val > n_val:
                return 0
            return fact[n_val] * inv[r_val] % MOD * inv[n_val - r_val] % MOD
            
        comb = nCr(n - 1, k)
        ans = (comb * m) % MOD
        rem_p = pow(m - 1, n - 1 - k, MOD)
        return (ans * rem_p) % MOD
