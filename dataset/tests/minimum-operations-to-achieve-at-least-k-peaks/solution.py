def minOperationsForKPeaks(nums: list[int], k: int) -> int:
    n = len(nums)
    if k == 0:
        return 0
    if k > (n - 1) // 2:
        return -1
    cost = [0] * n
    for i in range(1, n - 1):
        req = max(nums[i - 1], nums[i + 1]) + 1
        cost[i] = max(0, req - nums[i])
        
    dp = [[float('inf')] * n for _ in range(k + 1)]
    for i in range(n):
        dp[0][i] = 0
    for p in range(1, k + 1):
        for i in range(2 * p - 1, n - 1):
            dp[p][i] = dp[p][i - 1]
            prev_cost = dp[p - 1][i - 2] if i >= 2 else 0
            dp[p][i] = min(dp[p][i], prev_cost + cost[i])
    return min(dp[k][i] for i in range(n))