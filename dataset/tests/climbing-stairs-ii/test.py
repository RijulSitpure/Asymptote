from typing import List

class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        n = len(cost)
        if n <= 1:
            return 0
        dp0 = cost[0]
        dp1 = cost[1]
        for i in range(2, n):
            curr = cost[i] + min(dp0, dp1)
            dp0 = dp1
            dp1 = curr
        return min(dp0, dp1)

def run_tests():
    sol = Solution()
    assert sol.minCostClimbingStairs([10, 15, 20]) == 15
    assert sol.minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) == 6
    print("All tests passed for 3693.")

if __name__ == "__main__":
    run_tests()
