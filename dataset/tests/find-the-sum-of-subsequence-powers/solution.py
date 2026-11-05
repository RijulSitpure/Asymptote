from functools import lru_cache

class Solution:
    def sumOfPowers(self, nums: list[int], k: int) -> int:
        MOD = 10**9 + 7
        nums.sort()
        n = len(nums)

        @lru_cache(None)
        def dfs(i: int, rem: int, prev_idx: int, min_diff: int) -> int:
            if rem == 0:
                return min_diff if min_diff != float('inf') else 0
            if i == n or n - i < rem:
                return 0
            # Option 1: skip
            res = dfs(i + 1, rem, prev_idx, min_diff)
            # Option 2: take
            new_diff = min(min_diff, nums[i] - nums[prev_idx]) if prev_idx != -1 else float('inf')
            res = (res + dfs(i + 1, rem - 1, i, new_diff)) % MOD
            return res

        return dfs(0, k, -1, float('inf'))
