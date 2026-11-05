def compareSumsOfBitonicParts(nums: list[int]) -> int:
    n = len(nums)
    peak = 0
    while peak + 1 < n and nums[peak] < nums[peak + 1]:
        peak += 1
    left_sum = sum(nums[:peak + 1])
    right_sum = sum(nums[peak:])
    if left_sum > right_sum:
        return 0
    elif right_sum > left_sum:
        return 1
    else:
        return -1