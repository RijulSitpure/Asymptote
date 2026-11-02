from typing import List, Optional
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def minimumSeconds(self, nums: List[int]) -> int:
        from collections import defaultdict
        pos = defaultdict(list)
        n = len(nums)
        for i, val in enumerate(nums):
            pos[val].append(i)
        ans = n
        for indices in pos.values():
            max_gap = 0
            m = len(indices)
            for i in range(m):
                gap = (indices[(i + 1) % m] - indices[i] - 1) % n
                if gap > max_gap:
                    max_gap = gap
            ans = min(ans, (max_gap + 1) // 2)
        return ans
