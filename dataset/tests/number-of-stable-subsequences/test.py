from typing import List

class Solution:
    def countStableSubsequences(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        dp0, dp1 = 0, 0
        for x in nums:
            if x % 2 == 0:
                dp0 = (dp0 + dp1 + 1) % MOD
            else:
                dp1 = (dp1 + dp0 + 1) % MOD
        return (dp0 + dp1) % MOD

def run_tests():
    sol = Solution()
    assert sol.countStableSubsequences([1, 2]) == 3 # [1], [2], [1, 2]
    assert sol.countStableSubsequences([2, 4]) == 2 # [2], [4] (cannot join [2, 4] as same parity)
    assert sol.countStableSubsequences([1, 2, 3]) == 6 # [1], [2], [3], [1,2], [2,3], [1,2,3]
    print("All tests passed for 3686.")

if __name__ == "__main__":
    run_tests()
