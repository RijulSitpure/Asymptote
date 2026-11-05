def maxSumOfMSubarrays(nums: list[int], m: int, k: int) -> int:
    n = len(nums)
    if n < m * k:
        return 0
    k_sums = [sum(nums[:k])]
    for i in range(k, n):
        k_sums.append(k_sums[-1] + nums[i] - nums[i - k])
    num_windows = len(k_sums)
    dp = [[0] * (num_windows + 1) for _ in range(m + 1)]
    for j in range(1, m + 1):
        for i in range(num_windows):
            prev = dp[j - 1][i - k + 1] if i >= k - 1 else 0
            dp[j][i + 1] = max(dp[j][i], prev + k_sums[i])
    return dp[m][num_windows]