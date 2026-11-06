def peakValleyDifference(nums: list[int]) -> int:
    peaks_sum = 0
    valleys_sum = 0
    for i in range(1, len(nums) - 1):
        if nums[i] > nums[i - 1] and nums[i] > nums[i + 1]:
            peaks_sum += nums[i]
        elif nums[i] < nums[i - 1] and nums[i] < nums[i + 1]:
            valleys_sum += nums[i]
    return peaks_sum - valleys_sum
