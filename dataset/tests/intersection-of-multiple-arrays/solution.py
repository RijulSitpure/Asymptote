from typing import List, Optional, Tuple, Dict, Set

from collections import Counter

class Solution:
    def intersection(self, nums: list[list[int]]) -> list[int]:
        cnt = Counter()
        for arr in nums:
            for x in arr:
                cnt[x] += 1
        n = len(nums)
        return sorted([x for x, c in cnt.items() if c == n])
