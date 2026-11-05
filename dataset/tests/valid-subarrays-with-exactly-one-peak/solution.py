def countSinglePeakSubarrays(nums: list[int]) -> int:
    n = len(nums)
    peaks = []
    for i in range(1, n - 1):
        if nums[i - 1] < nums[i] > nums[i + 1]:
            peaks.append(i)
    if not peaks:
        return 0
    ans = 0
    m = len(peaks)
    for k in range(m):
        cur = peaks[k]
        left_bound = (peaks[k - 1] + 1) if k > 0 else 0
        right_bound = (peaks[k + 1] - 1) if k < m - 1 else n - 1
        left_choices = cur - left_bound + 1
        right_choices = right_bound - cur + 1
        ans += left_choices * right_choices
    return ans