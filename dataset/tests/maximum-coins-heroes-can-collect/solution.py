from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math

class Solution:
    def maximumCoins(self, heroes: List[int], monsters: List[int], coins: List[int]) -> List[int]:
        pairs = sorted(zip(monsters, coins))
        m = len(pairs)
        powers = [p[0] for p in pairs]
        pref = [0] * (m + 1)
        for i in range(m):
            pref[i + 1] = pref[i] + pairs[i][1]
        ans = []
        for h in heroes:
            idx = bisect_right(powers, h)
            ans.append(pref[idx])
        return ans
