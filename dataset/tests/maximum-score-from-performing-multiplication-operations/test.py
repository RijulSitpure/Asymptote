class Solution:
    def maximumScore(self, nums: list[int], multipliers: list[int]) -> int:
        n = len(nums)
        m = len(multipliers)
        dp = [0] * (m + 1)

        for i in range(m - 1, -1, -1):
            mult = multipliers[i]
            for left in range(i + 1):
                right = n - 1 - (i - left)
                pick_left = mult * nums[left] + dp[left + 1]
                pick_right = mult * nums[right] + dp[left]
                dp[left] = max(pick_left, pick_right)

        return dp[0]

def test():
    sol = Solution()
    assert sol.maximumScore([1,2,3], [3,2,1]) == 14
    assert sol.maximumScore([-5,-3,-3,-2,7,1], [-10,-5,3,4,6]) == 102

    print("✓ maximum-score-from-performing-multiplication-operations passed")

if __name__ == '__main__':
    test()
