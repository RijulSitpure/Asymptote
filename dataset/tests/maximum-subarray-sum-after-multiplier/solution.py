def maxSubarraySumMultiplier(nums: list[int], multiplier: int) -> int:
    s0 = 0
    s1 = 0
    s2 = 0
    best = -10**15
    for x in nums:
        s0 = max(x, s0 + x)
        s1 = max(x * multiplier, s0, s1 + x * multiplier)
        s2 = max(x, s1, s2 + x)
        best = max(best, s0, s1, s2)
    return best