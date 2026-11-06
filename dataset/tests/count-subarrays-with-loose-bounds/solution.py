def countSubarrays(nums: list[int], minK: int, maxK: int) -> int:
    total = 0
    curr_len = 0
    for x in nums:
        if minK <= x <= maxK:
            curr_len += 1
            total += curr_len
        else:
            curr_len = 0
    return total
