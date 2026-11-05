def visiblePeopleWays(n: int, k: int) -> int:
    MOD = 1_000_000_007
    if k == 0 or k > n:
        return 0
    dp = [0] * (k + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        next_dp = [0] * (k + 1)
        for j in range(1, min(k, i) + 1):
            next_dp[j] = (dp[j - 1] + (i - 1) * dp[j]) % MOD
        dp = next_dp
    return dp[k]