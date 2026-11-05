class Solution:
    def minOperations(self, nums: list[int]) -> int:
        cur_flips = 0
        for x in nums:
            if x ^ (cur_flips % 2) == 0:
                cur_flips += 1
        return cur_flips