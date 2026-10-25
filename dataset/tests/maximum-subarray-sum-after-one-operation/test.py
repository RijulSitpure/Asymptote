class Solution:
    def maxSumAfterOperation(self, nums: list[int]) -> int:
        dp0 = 0
        dp1 = 0
        ans = float('-inf')
        for x in nums:
            sq = x * x
            dp1 = max(sq, dp0 + sq, dp1 + x)
            dp0 = max(x, dp0 + x)
            ans = max(ans, dp1)
        return ans

def test():
    sol = Solution()
    assert sol.maxSumAfterOperation([2,-1,-4,-3]) == 17
    assert sol.maxSumAfterOperation([1,-1,1,1,-1,-1,1]) == 4

    print("✓ maximum-subarray-sum-after-one-operation passed")

if __name__ == '__main__':
    test()
