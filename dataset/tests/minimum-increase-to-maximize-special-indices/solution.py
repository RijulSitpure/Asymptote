def minIncreases(nums: list[int]) -> int:
    n = len(nums)
    if n <= 2:
        return 0
    cost = 0
    for i in range(1, n - 1, 2):
        req = max(nums[i - 1], nums[i + 1]) + 1
        if nums[i] < req:
            cost += req - nums[i]
    return cost