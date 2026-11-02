from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def numberOfWays(self, s: str, t: str, k: int) -> int:
        mod = 10**9 + 7
        n = len(s)
        ss = (s + s)[:-1]
        pi = [0] * n
        j = 0
        for i in range(1, n):
            while j > 0 and t[i] != t[j]:
                j = pi[j - 1]
            if t[i] == t[j]:
                j += 1
            pi[i] = j
        c = 0
        j = 0
        for i in range(len(ss)):
            while j > 0 and ss[i] != t[j]:
                j = pi[j - 1]
            if ss[i] == t[j]:
                j += 1
            if j == n:
                c += 1
                j = pi[j - 1]
        p1 = pow(n - 1, k, mod)
        p2 = 1 if k % 2 == 0 else -1
        inv_n = pow(n, mod - 2, mod)
        dp0 = (p1 + p2 * (n - 1)) % mod * inv_n % mod
        dp1 = (p1 - p2) % mod * inv_n % mod
        if s == t:
            ans = (dp0 + (c - 1) * dp1) % mod
        else:
            ans = (c * dp1) % mod
        return ans
