import sys
from typing import List

class Solution:
    def longestLine(self, mat: List[List[int]]) -> int:
        m, n = len(mat), len(mat[0])
        if m == 0 or n == 0:
            return 0
        dp = [[[0] * 4 for _ in range(n)] for _ in range(m)]
        max_line = 0
        for r in range(m):
            for c in range(n):
                if mat[r][c] == 1:
                    dp[r][c][0] = (dp[r][c - 1][0] if c > 0 else 0) + 1
                    dp[r][c][1] = (dp[r - 1][c][1] if r > 0 else 0) + 1
                    dp[r][c][2] = (dp[r - 1][c - 1][2] if r > 0 and c > 0 else 0) + 1
                    dp[r][c][3] = (dp[r - 1][c + 1][3] if r > 0 and c + 1 < n else 0) + 1
                    max_line = max(max_line, dp[r][c][0], dp[r][c][1], dp[r][c][2], dp[r][c][3])
        return max_line

def test():
    sol = Solution()
    m1 = [[0,1,1,0],[0,1,1,0],[0,0,0,1]]
    assert sol.longestLine(m1) == 3, "test 1 failed"
    m2 = [[1,1,1,1],[0,1,1,0],[0,0,0,1]]
    assert sol.longestLine(m2) == 4, "test 2 failed"
    print("✓ longest-line-of-consecutive-one-in-matrix passed")

if __name__ == "__main__":
    test()
