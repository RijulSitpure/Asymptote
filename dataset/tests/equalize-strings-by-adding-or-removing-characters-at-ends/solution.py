class Solution:
    def minOperations(self, initial: str, target: str) -> int:
        m, n = len(initial), len(target)
        dp = [0] * (n + 1)
        max_len = 0
        for i in range(1, m + 1):
            nxt_dp = [0] * (n + 1)
            for j in range(1, n + 1):
                if initial[i - 1] == target[j - 1]:
                    nxt_dp[j] = dp[j - 1] + 1
                    if nxt_dp[j] > max_len:
                        max_len = nxt_dp[j]
            dp = nxt_dp
        return m + n - 2 * max_len
