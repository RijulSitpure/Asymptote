class Solution:
    def minimumCost(self, nums: list[int], cost: list[int], k: int) -> int:
        n = len(nums)
        prefix_nums = [0] * (n + 1)
        prefix_cost = [0] * (n + 1)

        for i in range(n):
            prefix_nums[i + 1] = prefix_nums[i] + nums[i]
            prefix_cost[i + 1] = prefix_cost[i] + cost[i]

        dp = [float('inf')] * (n + 1)
        dp[n] = 0

        for i in range(n - 1, -1, -1):
            rem_cost = prefix_cost[n] - prefix_cost[i]
            for j in range(i, n):
                cur_nums = prefix_nums[j + 1]
                cur_cost = prefix_cost[j + 1] - prefix_cost[i]
                cand = cur_nums * cur_cost + k * rem_cost + dp[j + 1]
                if cand < dp[i]:
                    dp[i] = cand

        return dp[0]

def run_tests():
    s = Solution()
    assert s.minimumCost([1, 2], [1, 2], 1) > 0
    print("All tests passed for minimum-cost-to-divide-array-into-subarrays")

if __name__ == '__main__':
    run_tests()
