def maxValueAfterReverse(nums: list[int]) -> int:
    n = len(nums)
    if n <= 1:
        return 0

    base = sum(abs(nums[i] - nums[i + 1]) for i in range(n - 1))
    max_gain = 0

    # 1. Reverse prefix [0, r]
    for r in range(1, n - 1):
        gain = abs(nums[0] - nums[r + 1]) - abs(nums[r] - nums[r + 1])
        max_gain = max(max_gain, gain)

    # 2. Reverse suffix [l, n-1]
    for l in range(1, n - 1):
        gain = abs(nums[n - 1] - nums[l - 1]) - abs(nums[l] - nums[l - 1])
        max_gain = max(max_gain, gain)

    # 3. Middle reversals
    min_hi = float('inf')
    max_lo = float('-inf')
    for i in range(n - 1):
        a, b = nums[i], nums[i + 1]
        min_hi = min(min_hi, max(a, b))
        max_lo = max(max_lo, min(a, b))

    max_gain = max(max_gain, 2 * (max_lo - min_hi))
    return base + max_gain