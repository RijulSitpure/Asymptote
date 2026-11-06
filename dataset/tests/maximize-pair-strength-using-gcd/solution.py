import math

def maxPairStrengthGCD(nums: list[int]) -> int:
    n = len(nums)
    best = 0
    for i in range(n):
        for j in range(i + 1, n):
            g = math.gcd(nums[i], nums[j])
            best = max(best, g * (nums[i] + nums[j]))
    return best