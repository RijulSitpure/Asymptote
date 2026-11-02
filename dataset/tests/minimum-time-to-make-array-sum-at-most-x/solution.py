from typing import List, Optional
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def minimumTime(self, nums1: List[int], nums2: List[int], x: int) -> int:
        n = len(nums1)
        pairs = sorted(zip(nums2, nums1))
        dp = [0] * (n + 1)
        for b, a in pairs:
            for j in range(n, 0, -1):
                dp[j] = max(dp[j], dp[j - 1] + a + b * j)
        s1 = sum(nums1)
        s2 = sum(nums2)
        for t in range(n + 1):
            if s1 + t * s2 - dp[t] <= x:
                return t
        return -1
