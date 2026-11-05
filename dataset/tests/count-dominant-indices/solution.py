def countDominantIndices(nums: list[int]) -> int:
    n = len(nums)
    if n <= 1:
        return 0
    ans = 0
    right_sum = 0
    for i in range(n - 1, -1, -1):
        right_count = n - 1 - i
        if right_count > 0 and nums[i] * right_count > right_sum:
            ans += 1
        right_sum += nums[i]
    return ans