from typing import List, Optional
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def maxSum(self, nums: List[int]) -> int:
        groups = [[] for _ in range(10)]
        for num in nums:
            max_d = max(int(d) for d in str(num))
            groups[max_d].append(num)
        ans = -1
        for g in groups:
            if len(g) >= 2:
                g.sort(reverse=True)
                ans = max(ans, g[0] + g[1])
        return ans
