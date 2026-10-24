from typing import List

class Solution:
    def maxUncrossedLines(self, nums1: List[int], nums2: List[int]) -> int:
        m, n = len(nums1), len(nums2)
        dp = [0] * (n + 1)
        for i in range(1, m + 1):
            prev = 0
            for j in range(1, n + 1):
                temp = dp[j]
                if nums1[i - 1] == nums2[j - 1]:
                    dp[j] = prev + 1
                else:
                    dp[j] = max(dp[j], dp[j - 1])
                prev = temp
        return dp[n]

def test():
    sol = Solution()
    assert sol.maxUncrossedLines([1,4,2], [1,2,4]) == 2, "test 1 failed"
    assert sol.maxUncrossedLines([2,5,1,2,5], [10,5,2,1,5,2]) == 3, "test 2 failed"
    print("✓ uncrossed-lines passed")

if __name__ == "__main__":
    test()
