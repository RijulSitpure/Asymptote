from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def minOperations(self, s1: str, s2: str, x: int) -> int:
        idx = [i for i in range(len(s1)) if s1[i] != s2[i]]
        m = len(idx)
        if m % 2 != 0:
            return -1
        memo = {}
        def dfs(i, j):
            if i > j:
                return 0
            state = (i, j)
            if state in memo:
                return memo[state]
            res = dfs(i + 1, j - 1) + x
            res = min(res, dfs(i + 2, j) + idx[i + 1] - idx[i])
            res = min(res, dfs(i, j - 2) + idx[j] - idx[j - 1])
            memo[state] = res
            return res
        return dfs(0, m - 1)
