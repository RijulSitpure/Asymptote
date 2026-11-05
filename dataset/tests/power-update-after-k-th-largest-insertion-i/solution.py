from bisect import insort

def powerUpdatesI(nums: list[int], p: int, queries: list[list[int]]) -> list[int]:
    MOD = 1_000_000_007
    sorted_nums = sorted(nums)
    ans = []
    cur_p = p
    for val, k in queries:
        insort(sorted_nums, val)
        x = sorted_nums[-k]
        cur_p = pow(cur_p, x, MOD)
        ans.append(cur_p)
    return ans