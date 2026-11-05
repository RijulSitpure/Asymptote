def rob(nums: list[int]) -> int:
    s0, s1, s2 = 0, 0, 0
    for x in nums:
        new_s0 = max(s0, s1, s2)
        new_s1 = s0 + x
        new_s2 = s1 + x
        s0, s1, s2 = new_s0, new_s1, new_s2
    return max(s0, s1, s2)