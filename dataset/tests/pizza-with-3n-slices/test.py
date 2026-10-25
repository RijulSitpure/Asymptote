class Solution:
    def maxSizeSlices(self, slices: list[int]) -> int:
        k = len(slices) // 3
        def linear_rob(arr):
            m = len(arr)
            dp = [[0] * (k + 1) for _ in range(m + 1)]
            for i in range(1, m + 1):
                for j in range(1, k + 1):
                    take = arr[i - 1] + (dp[i - 2][j - 1] if i >= 2 else 0)
                    skip = dp[i - 1][j]
                    dp[i][j] = max(take, skip)
            return dp[m][k]
        return max(linear_rob(slices[:-1]), linear_rob(slices[1:]))

def test():
    sol = Solution()
    assert sol.maxSizeSlices([1,2,3,4,5,6]) == 10, "test 1 failed"
    assert sol.maxSizeSlices([8,9,8,6,1,1]) == 16, "test 2 failed"
    print("✓ pizza-with-3n-slices passed")

if __name__ == "__main__":
    test()
