from typing import List, Optional
class Solution:
    def maximizeTheProfit(self, n: int, offers: List[List[int]]) -> int:
        from collections import defaultdict
        by_end = defaultdict(list)
        for start, end, gold in offers:
            by_end[end].append((start, gold))
        dp = [0] * n
        for i in range(n):
            dp[i] = dp[i - 1] if i > 0 else 0
            for start, gold in by_end[i]:
                prev = dp[start - 1] if start > 0 else 0
                if prev + gold > dp[i]:
                    dp[i] = prev + gold
        return dp[n - 1]
