def hasUniqueMiddleElement(nums: list[int]) -> bool:
    n = len(nums)
    if n % 2 == 0:
        return False
    mid_val = nums[n // 2]
    return nums.count(mid_val) == 1