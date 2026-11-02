class Solution:
    def minCost(self, nums: list[int], x: int) -> int:
        n = len(nums)
        cur_costs = list(nums)
        ans = sum(cur_costs)
        for k in range(1, n):
            cur_costs = [min(cur_costs[i], nums[(i - k) % n]) for i in range(n)]
            ans = min(ans, sum(cur_costs) + k * x)
        return ans
