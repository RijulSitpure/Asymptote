class Solution:
    def minCostToEqualizeArray(self, nums: list[int], cost1: int, cost2: int) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        max_val = max(nums)
        min_val = min(nums)

        if 2 * cost1 <= cost2 or n <= 2:
            return (sum(max_val - x for x in nums) * cost1) % MOD

        total_diff = sum(max_val - x for x in nums)
        ans = float('inf')

        for target in range(max_val, 2 * max_val + 1):
            total_ops = total_diff + (target - max_val) * n
            max_ops = target - min_val
            rem_ops = total_ops - max_ops
            if max_ops <= rem_ops:
                pairs = total_ops // 2
                singles = total_ops % 2
                cost = pairs * cost2 + singles * cost1
            else:
                pairs = rem_ops
                singles = max_ops - rem_ops
                cost = pairs * cost2 + singles * cost1
            if cost < ans:
                ans = cost
            elif cost > ans + 2 * (target - max_val) * cost1:
                break

        return ans % MOD
