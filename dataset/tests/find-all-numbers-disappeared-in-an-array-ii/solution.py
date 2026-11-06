def findDisappearedNumbers(nums: list[int]) -> list[int]:
    n = len(nums)
    for x in nums:
        idx = abs(x) - 1
        if nums[idx] > 0:
            nums[idx] = -nums[idx]
    res = [i + 1 for i in range(n) if nums[i] > 0]
    # Restore array signs
    for i in range(n):
        nums[i] = abs(nums[i])
    return res