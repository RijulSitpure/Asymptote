import math

class Solution:
    def minimumSplits(self, nums: list[int]) -> int:
        splits = 1
        cur_gcd = nums[0]
        for x in nums[1:]:
            new_gcd = math.gcd(cur_gcd, x)
            if new_gcd == 1:
                splits += 1
                cur_gcd = x
            else:
                cur_gcd = new_gcd
        return splits
