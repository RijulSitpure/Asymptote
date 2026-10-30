from typing import List

class Solution:
    def mostPoints(self, questions: List[List[int]]) -> int:
        n = len(questions)
        dp = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            pts, bp = questions[i]
            next_idx = min(n, i + bp + 1)
            dp[i] = max(dp[i + 1], pts + dp[next_idx])
        return dp[0]
