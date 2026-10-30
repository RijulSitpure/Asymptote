class Solution:
    def minChanges(self, nums: list[int], k: int) -> int:
        LIMIT = 1024
        groups = [{} for _ in range(k)]
        size = [0] * k
        for i, val in enumerate(nums):
            groups[i % k][val] = groups[i % k].get(val, 0) + 1
            size[i % k] += 1
        dp = [float('inf')] * LIMIT
        dp[0] = 0
        for i in range(k):
            new_dp = [min(dp) + size[i]] * LIMIT
            for prev_val in range(LIMIT):
                if dp[prev_val] == float('inf'):
                    continue
                for val, cnt in groups[i].items():
                    new_val = prev_val ^ val
                    cost = dp[prev_val] + size[i] - cnt
                    if cost < new_dp[new_val]:
                        new_dp[new_val] = cost
            dp = new_dp
        return dp[0]

sol = Solution()
assert sol.minChanges([1,2,0,3,0], 1) == 3
assert sol.minChanges([3,4,5,2,1,7,3,4,7], 3) == 3
assert sol.minChanges([1,2,4,1,2,5,1,2,6], 3) == 3
print("All tests passed successfully.")
