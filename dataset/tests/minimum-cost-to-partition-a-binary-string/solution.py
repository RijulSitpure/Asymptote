def minCostPartition(s: str, k: int) -> int:
    n = len(s)
    dp = [float('inf')] * (n + 1)
    dp[0] = 0
    pref1 = [0] * (n + 1)
    for i in range(n):
        pref1[i + 1] = pref1[i] + (1 if s[i] == '1' else 0)
    for i in range(1, n + 1):
        for j in range(max(0, i - k), i):
            ones = pref1[i] - pref1[j]
            zeros = (i - j) - ones
            cost = abs(ones - zeros)
            dp[i] = min(dp[i], dp[j] + cost)
    return dp[n]