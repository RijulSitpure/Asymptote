from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def minimumWhiteTiles(self, floor: str, numCarpets: int, carpetLen: int) -> int:
        n = len(floor)
        dp = [[0] * (n + 1) for _ in range(numCarpets + 1)]
        for j in range(1, n + 1):
            dp[0][j] = dp[0][j - 1] + (1 if floor[j - 1] == "1" else 0)
        for i in range(1, numCarpets + 1):
            for j in range(1, n + 1):
                uncovered = dp[i][j - 1] + (1 if floor[j - 1] == "1" else 0)
                covered = dp[i - 1][max(0, j - carpetLen)]
                dp[i][j] = min(uncovered, covered)
        return dp[numCarpets][n]
