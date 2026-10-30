import math

class Solution:
    def findGCD(self, nums: list[int]) -> int:
        mn = min(nums)
        mx = max(nums)
        return math.gcd(mn, mx)
