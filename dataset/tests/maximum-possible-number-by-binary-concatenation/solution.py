class Solution:
    def maxGoodNumber(self, nums: list[int]) -> int:
        from itertools import permutations
        bins = [bin(x)[2:] for x in nums]
        ans = 0
        for p in permutations(bins):
            val = int("".join(p), 2)
            if val > ans:
                ans = val
        return ans
