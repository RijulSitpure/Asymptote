def minOperations(nums: list[int], locked: list[int], k: int) -> int:
    n = len(nums)
    for i in range(n):
        if locked[i] == 1 and nums[i] != i + 1:
            return -1
    vis = [False] * n
    swaps = 0
    for i in range(n):
        if not vis[i] and locked[i] == 0 and nums[i] != i + 1:
            cycle_len = 0
            curr = i
            while not vis[curr] and locked[curr] == 0:
                vis[curr] = True
                cycle_len += 1
                curr = nums[curr] - 1
            if cycle_len > 1:
                swaps += cycle_len - 1
    return swaps
