import math

class Solution:
    def minOperations(self, nums: list[int], numsDivide: list[int]) -> int:
        g = numsDivide[0]
        for x in numsDivide[1:]:
            g = math.gcd(g, x)
        nums.sort()
        for i, x in enumerate(nums):
            if g % x == 0:
                return i
        return -1
