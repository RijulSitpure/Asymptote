def findDisappearedNumbers(nums: list[int]) -> list[int]:
    for x in nums:
        idx = abs(x) - 1
        if nums[idx] > 0:
            nums[idx] = -nums[idx]
    result = []
    for i in range(len(nums)):
        if nums[i] > 0:
            result.append(i + 1)
    return result
