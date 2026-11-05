def longestSubsequenceAfterOneReplacement(nums: list[int]) -> int:
    n = len(nums)
    if n <= 2:
        return n
    # Length of strictly increasing segment ending at i
    left = [1] * n
    for i in range(1, n):
        if nums[i] > nums[i - 1]:
            left[i] = left[i - 1] + 1
    # Length of strictly increasing segment starting at i
    right = [1] * n
    for i in range(n - 2, -1, -1):
        if nums[i] < nums[i + 1]:
            right[i] = right[i + 1] + 1
    best = max(max(left), max(right))
    # Try replacing nums[i]
    for i in range(n):
        if i > 0:
            best = max(best, left[i - 1] + 1)
        if i < n - 1:
            best = max(best, right[i + 1] + 1)
        if i > 0 and i < n - 1 and nums[i + 1] - nums[i - 1] >= 2:
            best = max(best, left[i - 1] + 1 + right[i + 1])
    return best