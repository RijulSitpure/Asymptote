from typing import List

class Solution:
    def sumOfBeautifulSubsequences(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        ans = 0
        power = pow(2, n - 1, MOD) if n > 0 else 0
        for x in nums:
            ans = (ans + x * power) % MOD
        return ans

def run_tests():
    sol = Solution()
    assert sol.sumOfBeautifulSubsequences([1, 2]) == 6 # [1]=1, [2]=2, [1,2]=3 -> 6
    assert sol.sumOfBeautifulSubsequences([3]) == 3
    print("All tests passed for 3671.")

if __name__ == "__main__":
    run_tests()
