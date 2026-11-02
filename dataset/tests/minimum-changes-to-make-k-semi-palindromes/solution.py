from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def minimumChanges(self, s: str, k: int) -> int:
        n = len(s)
        divisors = [[] for _ in range(n + 1)]
        for d in range(1, n):
            for l in range(d * 2, n + 1, d):
                divisors[l].append(d)
        cost = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(i + 1, n):
                length = j - i + 1
                sub = s[i : j + 1]
                min_c = float('inf')
                for d in divisors[length]:
                    curr = 0
                    for rem in range(d):
                        l_idx = rem
                        r_idx = length - d + rem
                        while l_idx < r_idx:
                            if sub[l_idx] != sub[r_idx]:
                                curr += 1
                            l_idx += d
                            r_idx -= d
                    if curr < min_c:
                        min_c = curr
                cost[i][j] = min_c
        dp = [[float('inf')] * (n + 1) for _ in range(k + 1)]
        dp[0][0] = 0
        for cnt in range(1, k + 1):
            for j in range(cnt * 2, n + 1):
                for i in range((cnt - 1) * 2, j - 1):
                    c = dp[cnt - 1][i] + cost[i][j - 1]
                    if c < dp[cnt][j]:
                        dp[cnt][j] = c
        return dp[k][n]
