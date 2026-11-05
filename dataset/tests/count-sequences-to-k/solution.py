def countSequences(n: int, m: int, k: int) -> int:
    MOD = 1_000_000_007
    if k < n or k > n * m:
        return 0
    dp = [0] * (k + 1)
    dp[0] = 1
    for step in range(1, n + 1):
        next_dp = [0] * (k + 1)
        for s in range(step, min(k, step * m) + 1):
            val = 0
            for x in range(1, min(m, s) + 1):
                val = (val + dp[s - x]) % MOD
            next_dp[s] = val
        dp = next_dp
    return dp[k]