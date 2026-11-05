def finalElement(nums: list[int]) -> int:
    n = len(nums)
    if n == 1:
        return nums[0]
    idx = 0
    step = 1
    remaining = n
    left = True
    while remaining > 1:
        if left or remaining % 2 == 1:
            idx += step
        remaining //= 2
        step *= 2
        left = not left
    return nums[idx]