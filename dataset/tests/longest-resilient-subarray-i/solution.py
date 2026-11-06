def longestResilientSubarray(nums: list[int], k: int) -> int:
    # Condition: non-decreasing transitions (nums[i] <= nums[i+1]) with at most k drops
    n = len(nums)
    if n <= 1:
        return n

    left = 0
    drops = 0
    max_len = 1

    for right in range(1, n):
        if nums[right] < nums[right - 1]:
            drops += 1

        while drops > k:
            if nums[left + 1] < nums[left]:
                drops -= 1
            left += 1

        max_len = max(max_len, right - left + 1)

    return max_len