class Solution:
    def maxDotProduct(self, nums1: list[int], nums2: list[int]) -> int:
        n, m = len(nums1), len(nums2)
        dp = [[float("-inf")] * (m + 1) for _ in range(n + 1)]
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                prod = nums1[i - 1] * nums2[j - 1]
                dp[i][j] = max(
                    prod,
                    prod + max(0, dp[i - 1][j - 1]),
                    dp[i - 1][j],
                    dp[i][j - 1]
                )
        return dp[n][m]

def test():
    sol = Solution()
    assert sol.maxDotProduct([2,1,-2,5], [3,0,-6]) == 18, "test 1 failed"
    assert sol.maxDotProduct([3,-2], [2,-6,7]) == 21, "test 2 failed"
    assert sol.maxDotProduct([-1,-1], [1,1]) == -1, "test 3 failed"
    print("✓ max-dot-product-of-two-subsequences passed")

if __name__ == "__main__":
    test()
