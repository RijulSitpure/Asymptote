def smallestStrictlyStableIndex(nums: list[int]) -> int:
    n = len(nums)
    pref_max = [0] * n
    pref_max[0] = nums[0]
    for i in range(1, n):
        pref_max[i] = max(pref_max[i - 1], nums[i])
        
    suff_min = [0] * n
    suff_min[-1] = nums[-1]
    for i in range(n - 2, -1, -1):
        suff_min[i] = min(suff_min[i + 1], nums[i])
        
    for i in range(n):
        left_ok = (i == 0 or pref_max[i - 1] < nums[i])
        right_ok = (i == n - 1 or nums[i] < suff_min[i + 1])
        if left_ok and right_ok:
            return i
    return -1