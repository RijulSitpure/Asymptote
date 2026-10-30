from typing import List

class Solution:
    def minimumRemoval(self, beans: List[int]) -> int:
        beans.sort()
        total = sum(beans)
        n = len(beans)
        max_remaining = 0
        for i in range(n):
            max_remaining = max(max_remaining, beans[i] * (n - i))
        return total - max_remaining
