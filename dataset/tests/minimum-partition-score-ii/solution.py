def minPartitionScore(nums: list[int], k: int) -> int:
    n = len(nums)
    pref = [0] * (n + 1)
    for i in range(n):
        pref[i + 1] = pref[i] + nums[i]
        
    def cost(i: int, j: int) -> int:
        s = pref[j] - pref[i]
        return s * (s + 1) // 2

    dp = [float('inf')] * (n + 1)
    dp[0] = 0
    for p in range(1, k + 1):
        next_dp = [float('inf')] * (n + 1)
        for i in range(p, n + 1):
            for m in range(p - 1, i):
                next_dp[i] = min(next_dp[i], dp[m] + cost(m, i))
        dp = next_dp
    return dp[n]