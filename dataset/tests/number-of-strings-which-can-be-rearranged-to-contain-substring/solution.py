from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def stringCount(self, n: int) -> int:
        MOD = 10**9 + 7
        if n < 4:
            return 0
        total = pow(26, n, MOD)
        not_l = pow(25, n, MOD)
        not_t = pow(25, n, MOD)
        few_e = (pow(25, n, MOD) + n * pow(25, n - 1, MOD)) % MOD
        not_lt = pow(24, n, MOD)
        not_le = (pow(24, n, MOD) + n * pow(24, n - 1, MOD)) % MOD
        not_te = (pow(24, n, MOD) + n * pow(24, n - 1, MOD)) % MOD
        not_lte = (pow(23, n, MOD) + n * pow(23, n - 1, MOD)) % MOD
        invalid = (not_l + not_t + few_e - not_lt - not_le - not_te + not_lte) % MOD
        return (total - invalid + MOD) % MOD
