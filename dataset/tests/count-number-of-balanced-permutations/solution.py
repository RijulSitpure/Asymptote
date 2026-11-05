from functools import lru_cache

class Solution:
    def countBalancedPermutations(self, num: str) -> int:
        MOD = 1_000_000_007
        count = [0] * 10
        total_sum = 0
        for ch in num:
            d = int(ch)
            count[d] += 1
            total_sum += d
            
        if total_sum % 2 != 0:
            return 0
            
        n = len(num)
        odd_slots = n // 2
        even_slots = (n + 1) // 2
        target = total_sum // 2
        
        fact = [1] * (n + 1)
        inv = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = (fact[i - 1] * i) % MOD
        inv[n] = pow(fact[n], MOD - 2, MOD)
        for i in range(n - 1, -1, -1):
            inv[i] = (inv[i + 1] * (i + 1)) % MOD
            
        def comb(n, r):
            if r < 0 or r > n:
                return 0
            return fact[n] * inv[r] % MOD * inv[n - r] % MOD

        pref = [0] * 11
        for d in range(10):
            pref[d + 1] = pref[d] + count[d]

        @lru_cache(None)
        def dp(d: int, o_slots: int, o_sum: int) -> int:
            if d == 10:
                return 1 if o_slots == 0 and o_sum == 0 else 0
            if o_sum < 0 or o_slots < 0:
                return 0
            digits_left = n - pref[d]
            e_slots = digits_left - o_slots
            if e_slots < 0:
                return 0
                
            res = 0
            cnt = count[d]
            for k in range(min(cnt, o_slots) + 1):
                even_take = cnt - k
                if even_take <= e_slots:
                    ways = comb(o_slots, k) * comb(e_slots, even_take) % MOD
                    sub = dp(d + 1, o_slots - k, o_sum - k * d)
                    res = (res + ways * sub) % MOD
            return res

        return dp(0, odd_slots, target)
