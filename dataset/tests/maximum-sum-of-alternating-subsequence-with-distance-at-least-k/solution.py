def maxAlternatingSubsequenceSum(nums: list[int], k: int) -> int:
    n = len(nums)
    if n == 0:
        return 0
    dp_valley = [nums[i] for i in range(n)]
    dp_peak = [nums[i] for i in range(n)]
    ans = max(nums)
    for i in range(n):
        for j in range(i - k + 1):
            if nums[j] > nums[i]:
                dp_valley[i] = max(dp_valley[i], nums[i] + dp_peak[j])
            if nums[j] < nums[i]:
                dp_peak[i] = max(dp_peak[i], nums[i] + dp_valley[j])
        ans = max(ans, dp_valley[i], dp_peak[i])
    return ans