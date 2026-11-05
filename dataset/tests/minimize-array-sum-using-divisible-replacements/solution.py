def minArraySum(nums: list[int]) -> int:
    num_set = set(nums)
    if 1 in num_set:
        return len(nums)
    unique_vals = sorted(num_set)
    min_div = {}
    for v in unique_vals:
        best = v
        d = 1
        while d * d <= v:
            if v % d == 0:
                if d in num_set:
                    best = min(best, d)
                if (v // d) in num_set:
                    best = min(best, v // d)
            d += 1
        min_div[v] = best
    return sum(min_div[x] for x in nums)