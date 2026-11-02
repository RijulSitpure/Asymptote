from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def minimumMoves(self, grid: List[List[int]]) -> int:
        zeros = []
        extras = []
        for r in range(3):
            for c in range(3):
                if grid[r][c] == 0:
                    zeros.append((r, c))
                elif grid[r][c] > 1:
                    for _ in range(grid[r][c] - 1):
                        extras.append((r, c))
        ans = float('inf')
        for p in itertools.permutations(extras):
            curr = sum(abs(zr - er) + abs(zc - ec) for (zr, zc), (er, ec) in zip(zeros, p))
            if curr < ans:
                ans = curr
        return ans
