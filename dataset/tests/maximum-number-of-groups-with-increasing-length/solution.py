class Solution:
    def maxIncreasingGroups(self, usageLimits: list[int]) -> int:
        usageLimits.sort()
        ans = 1
        available = 0
        for limit in usageLimits:
            available += limit
            if available >= ans * (ans + 1) // 2:
                ans += 1
        return ans - 1