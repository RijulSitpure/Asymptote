from collections import defaultdict
from typing import List

class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [defaultdict(int) for _ in range(n)]
        total = 0

        for i in range(n):
            for j in range(i):
                diff = nums[i] - nums[j]
                cnt = dp[j][diff]
                total += cnt
                dp[i][diff] += cnt + 1

        return total

def test():
    sol = Solution()
    assert sol.numberOfArithmeticSlices([2,4,6,8,10]) == 7, "test 1 failed"
    assert sol.numberOfArithmeticSlices([7,7,7,7,7]) == 16, "test 2 failed"
    print("✓ arithmetic-slices-ii-subsequence passed")

if __name__ == "__main__":
    test()
