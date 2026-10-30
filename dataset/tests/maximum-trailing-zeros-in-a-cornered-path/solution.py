from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def maxTrailingZeros(self, grid: list[list[int]]) -> int:
        R, C = len(grid), len(grid[0])
        def get_factors(x):
            c2, c5 = 0, 0
            while x > 0 and x % 2 == 0:
                c2 += 1
                x //= 2
            while x > 0 and x % 5 == 0:
                c5 += 1
                x //= 5
            return (c2, c5)

        fgrid = [[get_factors(grid[r][c]) for c in range(C)] for r in range(R)]

        row_pref = [[[0, 0] for _ in range(C + 1)] for _ in range(R)]
        for r in range(R):
            for c in range(C):
                row_pref[r][c + 1][0] = row_pref[r][c][0] + fgrid[r][c][0]
                row_pref[r][c + 1][1] = row_pref[r][c][1] + fgrid[r][c][1]

        col_pref = [[[0, 0] for _ in range(C)] for _ in range(R + 1)]
        for c in range(C):
            for r in range(R):
                col_pref[r + 1][c][0] = col_pref[r][c][0] + fgrid[r][c][0]
                col_pref[r + 1][c][1] = col_pref[r][c][1] + fgrid[r][c][1]

        ans = 0
        for r in range(R):
            for c in range(C):
                c2, c5 = fgrid[r][c]
                up2, up5 = col_pref[r + 1][c][0], col_pref[r + 1][c][1]
                dn2, dn5 = col_pref[R][c][0] - col_pref[r][c][0], col_pref[R][c][1] - col_pref[r][c][1]
                lt2, lt5 = row_pref[r][c + 1][0], row_pref[r][c + 1][1]
                rt2, rt5 = row_pref[r][C][0] - row_pref[r][c][0], row_pref[r][C][1] - row_pref[r][c][1]

                ans = max(ans, min(up2 + lt2 - c2, up5 + lt5 - c5))
                ans = max(ans, min(up2 + rt2 - c2, up5 + rt5 - c5))
                ans = max(ans, min(dn2 + lt2 - c2, dn5 + lt5 - c5))
                ans = max(ans, min(dn2 + rt2 - c2, dn5 + rt5 - c5))

        return ans
