class Solution:
    def distanceSum(self, m: int, n: int, k: int) -> int:
        MOD = 1_000_000_007
        total_cells = m * n
        
        fact = [1] * (total_cells + 1)
        inv = [1] * (total_cells + 1)
        for i in range(1, total_cells + 1):
            fact[i] = (fact[i - 1] * i) % MOD
        inv[total_cells] = pow(fact[total_cells], MOD - 2, MOD)
        for i in range(total_cells - 1, -1, -1):
            inv[i] = (inv[i + 1] * (i + 1)) % MOD
            
        def nCr(n_, r_):
            if r_ < 0 or r_ > n_:
                return 0
            return fact[n_] * inv[r_] % MOD * inv[n_ - r_] % MOD
            
        row_sum = (m * (m * m - 1) // 6 % MOD) * (n * n % MOD) % MOD
        col_sum = (n * (n * n - 1) // 6 % MOD) * (m * m % MOD) % MOD
        
        ways = nCr(total_cells - 2, k - 2)
        return (row_sum + col_sum) * ways % MOD
