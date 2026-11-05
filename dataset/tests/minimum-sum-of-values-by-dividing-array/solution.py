from functools import lru_cache

class Solution:
    def minimumValueSum(self, nums: list[int], andValues: list[int]) -> int:
        n = len(nums)
        m = len(andValues)

        @lru_cache(None)
        def dfs(i: int, j: int, cur_and: int) -> int:
            if i == n and j == m:
                return 0
            if i == n or j == m:
                return float('inf')

            cur_and = nums[i] if cur_and == -1 else (cur_and & nums[i])
            if (cur_and & andValues[j]) != andValues[j]:
                return float('inf')

            ans = dfs(i + 1, j, cur_and)
            if cur_and == andValues[j]:
                ans = min(ans, nums[i] + dfs(i + 1, j + 1, -1))

            return ans

        res = dfs(0, 0, -1)
        return res if res != float('inf') else -1
