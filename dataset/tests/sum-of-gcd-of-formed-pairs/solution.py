import math

def sumOfGcdPairs(nums: list[int]) -> int:
    nums.sort()
    n = len(nums)
    total = 0
    for i in range(n // 2):
        total += math.gcd(nums[i], nums[n - 1 - i])
    return total