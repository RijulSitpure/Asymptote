from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math

class Solution:
    def countKSubsequencesWithMaxBeauty(self, s: str, k: int) -> int:
        mod = 10**9 + 7
        cnt = Counter(s)
        if len(cnt) < k:
            return 0
        freqs = sorted(cnt.values(), reverse=True)
        cutoff = freqs[k - 1]
        ans = 1
        strictly_greater = 0
        for f in freqs:
            if f > cutoff:
                ans = (ans * f) % mod
                strictly_greater += 1
        needed = k - strictly_greater
        total_cutoff = freqs.count(cutoff)
        ways = math.comb(total_cutoff, needed) % mod
        ans = (ans * ways) % mod
        ans = (ans * pow(cutoff, needed, mod)) % mod
        return ans
