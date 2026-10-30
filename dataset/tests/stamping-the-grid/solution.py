from typing import List

class Solution:
    def possibleToStamp(self, grid: List[List[int]], stampHeight: int, stampWidth: int) -> bool:
        m, n = len(grid), len(grid[0])
        pref = [[0] * (n + 1) for _ in range(m + 1)]
        for r in range(m):
            for c in range(n):
                pref[r + 1][c + 1] = pref[r][c + 1] + pref[r + 1][c] - pref[r][c] + grid[r][c]
        
        def query(r1, c1, r2, c2):
            return pref[r2 + 1][c2 + 1] - pref[r1][c2 + 1] - pref[r2 + 1][c1] + pref[r1][c1]
        
        diff = [[0] * (n + 2) for _ in range(m + 2)]
        for r in range(m - stampHeight + 1):
            for c in range(n - stampWidth + 1):
                if query(r, c, r + stampHeight - 1, c + stampWidth - 1) == 0:
                    diff[r + 1][c + 1] += 1
                    diff[r + stampHeight + 1][c + 1] -= 1
                    diff[r + 1][c + stampWidth + 1] -= 1
                    diff[r + stampHeight + 1][c + stampWidth + 1] += 1
        
        covered = [[0] * (n + 2) for _ in range(m + 2)]
        for r in range(1, m + 1):
            for c in range(1, n + 1):
                covered[r][c] = covered[r - 1][c] + covered[r][c - 1] - covered[r - 1][c - 1] + diff[r][c]
                if grid[r - 1][c - 1] == 0 and covered[r][c] == 0:
                    return False
        return True
