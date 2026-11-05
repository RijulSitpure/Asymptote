class Solution:
    def maximumLength(self, nums: list[int]) -> int:
        c_even = sum(1 for x in nums if x % 2 == 0)
        c_odd = len(nums) - c_even
        
        alt1, exp1 = 0, 0
        alt2, exp2 = 0, 1
        for x in nums:
            p = x % 2
            if p == exp1:
                alt1 += 1
                exp1 ^= 1
            if p == exp2:
                alt2 += 1
                exp2 ^= 1
                
        return max(c_even, c_odd, alt1, alt2)