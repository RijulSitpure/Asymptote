from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math

class Solution:
    def getMaxFunctionValue(self, receiver: List[int], k: int) -> int:
        n = len(receiver)
        m = k.bit_length()
        up = [[0] * m for _ in range(n)]
        sm = [[0] * m for _ in range(n)]
        for i in range(n):
            up[i][0] = receiver[i]
            sm[i][0] = receiver[i]
        for j in range(1, m):
            for i in range(n):
                p = up[i][j - 1]
                up[i][j] = up[p][j - 1]
                sm[i][j] = sm[i][j - 1] + sm[p][j - 1]
        ans = 0
        for i in range(n):
            curr = i
            total = i
            for j in range(m):
                if (k >> j) & 1:
                    total += sm[curr][j]
                    curr = up[curr][j]
            if total > ans:
                ans = total
        return ans
