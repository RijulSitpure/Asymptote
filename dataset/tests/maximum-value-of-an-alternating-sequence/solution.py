def maxAlternatingSum(nums: list[int]) -> int:
    even = 0  # after adding
    odd = 0   # after subtracting
    for x in nums:
        even = max(even, odd + x)
        odd = max(odd, even - x)
    return even