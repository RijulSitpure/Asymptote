class Solution:
    def longestIdealString(self, s: str, k: int) -> int:
        dp = [0] * 26
        for ch in s:
            idx = ord(ch) - ord('a')
            low = max(0, idx - k)
            high = min(25, idx + k)
            dp[idx] = 1 + max(dp[i] for i in range(low, high + 1))
        return max(dp)
