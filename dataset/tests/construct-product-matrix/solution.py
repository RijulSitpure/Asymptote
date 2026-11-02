from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def constructProductMatrix(self, grid: List[List[int]]) -> List[List[int]]:
        n, m = len(grid), len(grid[0])
        mod = 12345
        p = [[0] * m for _ in range(n)]
        pref = 1
        for r in range(n):
            for c in range(m):
                p[r][c] = pref
                pref = (pref * (grid[r][c] % mod)) % mod
        suff = 1
        for r in range(n - 1, -1, -1):
            for c in range(m - 1, -1, -1):
                p[r][c] = (p[r][c] * suff) % mod
                suff = (suff * (grid[r][c] % mod)) % mod
        return p
