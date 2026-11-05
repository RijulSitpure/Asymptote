def minRemovals(nums: list[int], target: int) -> int:
    dp = {0: 0}
    for x in nums:
        cur = dict(dp)
        for v, sz in dp.items():
            nv = v ^ x
            if nv not in cur or cur[nv] < sz + 1:
                cur[nv] = sz + 1
        dp = cur
    if target not in dp:
        return -1
    return len(nums) - dp[target]