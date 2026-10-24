import sys
from typing import List

class Solution:
    def predictTheWinner(self, nums: List[int]) -> bool:
        n = len(nums)
        dp = nums[:]
        for i in range(n - 2, -1, -1):
            for j in range(i + 1, n):
                dp[j] = max(nums[i] - dp[j], nums[j] - dp[j - 1])
        return dp[n - 1] >= 0

def test():
    sol = Solution()
    assert sol.predictTheWinner([1, 5, 2]) is False, "test 1 failed"
    assert sol.predictTheWinner([1, 5, 233, 7]) is True, "test 2 failed"
    print("✓ predict-the-winner passed")

if __name__ == "__main__":
    test()
