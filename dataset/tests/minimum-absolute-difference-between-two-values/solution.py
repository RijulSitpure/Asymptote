def minAbsoluteDifference(nums: list[int]) -> int:
    nums.sort()
    ans = float('inf')
    for i in range(1, len(nums)):
        ans = min(ans, nums[i] - nums[i - 1])
    return ans