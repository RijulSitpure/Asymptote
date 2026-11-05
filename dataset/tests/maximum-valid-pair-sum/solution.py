def maxValidPairSum(nums: list[int], limit: int) -> int:
    nums.sort()
    left = 0
    right = len(nums) - 1
    best = -1
    while left < right:
        s = nums[left] + nums[right]
        if s <= limit:
            best = max(best, s)
            left += 1
        else:
            right -= 1
    return best