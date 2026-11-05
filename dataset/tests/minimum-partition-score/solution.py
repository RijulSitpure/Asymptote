def minPartitionScore(nums: list[int], k: int) -> int:
    n = len(nums)
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        best = float('inf')
        cur_max = 0
        for j in range(i - 1, max(-1, i - 1 - k), -1):
            cur_max = max(cur_max, nums[j])
            best = min(best, dp[j] + cur_max)
        dp[i] = best
    return dp[n]