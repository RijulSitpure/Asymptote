def longestSubarrayRestrictedPairSums(nums: list[int], forbidden: int) -> int:
    if not nums:
        return 0

    left = 0
    max_len = 1

    for right in range(1, len(nums)):
        if nums[right] + nums[right - 1] == forbidden:
            left = right
        max_len = max(max_len, right - left + 1)

    return max_len