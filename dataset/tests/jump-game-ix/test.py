from typing import List

class Solution:
    def minJumpCost(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [float('inf')] * n
        dp[0] = 0
        for i in range(n):
            if dp[i] == float('inf'):
                continue
            for j in range(i + 1, n):
                if nums[j] >= nums[i]:
                    cost = (j - i) * (j - i)
                    dp[j] = min(dp[j], dp[i] + cost)
        return dp[n - 1] if dp[n - 1] != float('inf') else -1

def run_tests():
    sol = Solution()
    assert sol.minJumpCost([1, 3, 2, 4]) == 5
    assert sol.minJumpCost([4, 3, 2, 1]) == -1
    assert sol.minJumpCost([1, 1, 1]) == 2
    print("All tests passed for 3660.")

if __name__ == "__main__":
    run_tests()
