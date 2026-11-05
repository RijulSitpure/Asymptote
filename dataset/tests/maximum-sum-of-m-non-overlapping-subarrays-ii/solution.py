def maxSumOfMSubarraysVariable(nums: list[int], m: int, min_len: int) -> int:
    n = len(nums)
    if n < m * min_len:
        return 0
    pref = [0] * (n + 1)
    for i in range(n):
        pref[i + 1] = pref[i] + nums[i]
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for j in range(1, m + 1):
        best_diff = -10**15
        for i in range(min_len, n + 1):
            best_diff = max(best_diff, dp[j - 1][i - min_len] - pref[i - min_len])
            dp[j][i] = max(dp[j][i - 1], pref[i] + best_diff)
    return dp[m][n]