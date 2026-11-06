def minPatches(nums: list[int], target: int) -> int:
    miss = 1
    added = 0
    i = 0
    n = len(nums)
    while miss <= target:
        if i < n and nums[i] <= miss:
            miss += nums[i]
            i += 1
        else:
            miss += miss
            added += 1
    return added