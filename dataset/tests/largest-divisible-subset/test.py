import sys
from typing import List

class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        n = len(nums)
        dp = [1] * n
        parent = [-1] * n
        max_idx = 0
        for i in range(n):
            for j in range(i):
                if nums[i] % nums[j] == 0 and dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    parent[i] = j
            if dp[i] > dp[max_idx]:
                max_idx = i
        res = []
        curr = max_idx
        while curr != -1:
            res.append(nums[curr])
            curr = parent[curr]
        return res[::-1]

def test():
    sol = Solution()
    res1 = sol.largestDivisibleSubset([1, 2, 3])
    assert res1 in ([1, 2], [1, 3]), "test 1 failed"
    res2 = sol.largestDivisibleSubset([1, 2, 4, 8])
    assert res2 == [1, 2, 4, 8], "test 2 failed"
    print("✓ largest-divisible-subset passed")

if __name__ == "__main__":
    test()
