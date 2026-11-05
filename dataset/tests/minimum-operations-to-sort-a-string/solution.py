def minOperationsToSort(s: str) -> int:
    dp = [0] * 26
    for c in s:
        idx = ord(c) - ord('a')
        dp[idx] = max(dp[:idx + 1]) + 1
    return len(s) - max(dp)