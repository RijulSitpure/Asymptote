def longestResilientSubarrayII(nums: list[int], max_penalty: int) -> int:
    n = len(nums)
    if n <= 1:
        return n

    left = 0
    penalty = 0
    max_len = 1

    for right in range(1, n):
        if nums[right] < nums[right - 1]:
            penalty += nums[right - 1] - nums[right]

        while penalty > max_penalty:
            if nums[left + 1] < nums[left]:
                penalty -= nums[left] - nums[left + 1]
            left += 1

        max_len = max(max_len, right - left + 1)

    return max_len