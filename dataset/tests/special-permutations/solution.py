class Solution:
    def specialPerm(self, nums: list[int]) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        from functools import lru_cache
        @lru_cache(None)
        def dp(mask: int, last: int) -> int:
            if mask == (1 << n) - 1:
                return 1
            res = 0
            for j in range(n):
                if not (mask & (1 << j)):
                    if last == -1 or nums[last] % nums[j] == 0 or nums[j] % nums[last] == 0:
                        res = (res + dp(mask | (1 << j), j)) % MOD
            return res
        return dp(0, -1)
