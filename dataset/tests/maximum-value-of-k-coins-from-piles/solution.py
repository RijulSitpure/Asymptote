from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def maxValueOfCoins(self, piles: list[list[int]], k: int) -> int:
        dp = [0] * (k + 1)
        for pile in piles:
            pref = [0]
            for x in pile:
                pref.append(pref[-1] + x)
            for j in range(k, -1, -1):
                for c in range(1, min(len(pile), j) + 1):
                    dp[j] = max(dp[j], dp[j - c] + pref[c])
        return dp[k]
