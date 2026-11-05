from collections import Counter

def countWaysToFormTarget(s1: str, s2: str, target: str) -> int:
    MOD = 1_000_000_007
    words = [s1, s2]
    k = len(s1)
    t_len = len(target)
    if k < t_len:
        return 0
    # Column counts
    col_counts = [Counter(word[col] for word in words) for col in range(k)]
    dp = [0] * (t_len + 1)
    dp[0] = 1
    for col in range(k):
        counts = col_counts[col]
        for j in range(min(col + 1, t_len), 0, -1):
            ch = target[j - 1]
            if counts[ch] > 0:
                dp[j] = (dp[j] + dp[j - 1] * counts[ch]) % MOD
    return dp[t_len]