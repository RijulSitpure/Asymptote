from typing import List

class Solution:
    def sumSubseqWidths(self, nums: List[int]) -> int:
        MOD = 1_000_000_007
        nums.sort()
        n = len(nums)
        pow2 = [1] * n
        for i in range(1, n):
            pow2[i] = (pow2[i - 1] * 2) % MOD

        ans = 0
        for i in range(n):
            ans = (ans + nums[i] * (pow2[i] - pow2[n - 1 - i])) % MOD
        return (ans + MOD) % MOD

def test():
    sol = Solution()
    assert sol.sumSubseqWidths([2, 1, 3]) == 6, "test 1 failed"
    assert sol.sumSubseqWidths([2]) == 0, "test 2 failed"
    print("✓ sum-of-subsequence-widths passed")

if __name__ == "__main__":
    test()
