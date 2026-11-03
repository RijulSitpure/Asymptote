from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def minimumAddedCoins(self, coins: List[int], target: int) -> int:
        coins.sort()
        curr_max = 0
        added = 0
        idx = 0
        n = len(coins)
        while curr_max < target:
            if idx < n and coins[idx] <= curr_max + 1:
                curr_max += coins[idx]
                idx += 1
            else:
                curr_max += curr_max + 1
                added += 1
        return added
