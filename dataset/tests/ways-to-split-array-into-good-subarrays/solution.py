class Solution:
    def numberOfGoodSubarraySplits(self, nums: list[int]) -> int:
        MOD = 10**9 + 7
        indices = [i for i, x in enumerate(nums) if x == 1]
        if not indices:
            return 0
        ans = 1
        for i in range(len(indices) - 1):
            ans = (ans * (indices[i + 1] - indices[i])) % MOD
        return ans
