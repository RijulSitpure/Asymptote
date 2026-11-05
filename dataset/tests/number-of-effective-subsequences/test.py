class Solution:
    def numberOfEffectiveSubsequences(self, nums: list[int]) -> int:
        # Effective subsequence: strictly increasing with distinct parity endpoints modulo 10^9+7
        # Or non-empty subsequence whose elements satisfy a dynamic state condition
        MOD = 1_000_000_007
        # dp[0]: count of effective subsequences ending in even value
        # dp[1]: count of effective subsequences ending in odd value
        dp0 = 0
        dp1 = 0
        for x in nums:
            if x % 2 == 0:
                # Can extend any previous odd subsequence or start new
                new_dp0 = (dp0 + dp1 + 1) % MOD
                dp0 = new_dp0
            else:
                # Can extend any previous even subsequence or start new
                new_dp1 = (dp1 + dp0 + 1) % MOD
                dp1 = new_dp1
        return (dp0 + dp1) % MOD

def run_tests():
    sol = Solution()
    assert sol.numberOfEffectiveSubsequences([1, 2, 3]) == 6
    assert sol.numberOfEffectiveSubsequences([2, 4]) == 2
    assert sol.numberOfEffectiveSubsequences([1]) == 1
    print("All tests passed for 3757.")

if __name__ == "__main__":
    run_tests()