class Solution:
    def maxScore(self, n: int, k: int, stayScore: list[list[int]], travelScore: list[list[int]]) -> int:
        dp = [0] * n
        for day in range(k):
            new_dp = [0] * n
            for curr in range(n):
                new_dp[curr] = max(new_dp[curr], dp[curr] + stayScore[day][curr])
                for prev in range(n):
                    if prev != curr:
                        new_dp[curr] = max(new_dp[curr], dp[prev] + travelScore[prev][curr])
            dp = new_dp
        return max(dp)
