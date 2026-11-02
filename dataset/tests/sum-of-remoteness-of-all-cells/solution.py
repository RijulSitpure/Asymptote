from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def sumRemoteness(self, grid: List[List[int]]) -> int:
        n = len(grid)
        total_sum = sum(grid[r][c] for r in range(n) for c in range(n) if grid[r][c] != -1)
        visited = [[False] * n for _ in range(n)]
        ans = 0
        for r in range(n):
            for c in range(n):
                if grid[r][c] != -1 and not visited[r][c]:
                    q = [(r, c)]
                    visited[r][c] = True
                    comp_sum = 0
                    comp_cnt = 0
                    while q:
                        cr, cc = q.pop()
                        comp_sum += grid[cr][cc]
                        comp_cnt += 1
                        for nr, nc in ((cr + 1, cc), (cr - 1, cc), (cr, cc + 1), (cr, cc - 1)):
                            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] != -1 and not visited[nr][nc]:
                                visited[nr][nc] = True
                                q.append((nr, nc))
                    ans += comp_cnt * (total_sum - comp_sum)
        return ans
