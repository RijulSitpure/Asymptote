def maxValidSplits(nums: list[int]) -> int:
    total = sum(nums)
    running = 0
    splits = 0
    for i in range(len(nums) - 1):
        running += nums[i]
        if running * 2 == total:
            splits += 1
    return splits