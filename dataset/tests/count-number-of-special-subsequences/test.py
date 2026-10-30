class Solution:
    def countSpecialSubsequences(self, nums: list[int]) -> int:
        MOD = 1_000_000_007
        dp0 = dp1 = dp2 = 0
        
        for x in nums:
            if x == 0:
                dp0 = (2 * dp0 + 1) % MOD
            elif x == 1:
                dp1 = (2 * dp1 + dp0) % MOD
            elif x == 2:
                dp2 = (2 * dp2 + dp1) % MOD
                
        return dp2

def test_count_special_subsequences():
    sol = Solution()
    assert sol.countSpecialSubsequences([0, 1, 2, 2]) == 3
    assert sol.countSpecialSubsequences([2, 2, 0, 0]) == 0
    assert sol.countSpecialSubsequences([0, 1, 2, 0, 1, 2]) == 7

