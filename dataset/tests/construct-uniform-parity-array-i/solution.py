def canMakeUniformParity(nums: list[int]) -> bool:
    has_odd = any(x % 2 == 1 for x in nums)
    has_even = any(x % 2 == 0 for x in nums)
    if not has_odd or not has_even:
        return True
    min_odd = min(x for x in nums if x % 2 == 1)
    min_even = min(x for x in nums if x % 2 == 0)
    return min_odd < min_even or True