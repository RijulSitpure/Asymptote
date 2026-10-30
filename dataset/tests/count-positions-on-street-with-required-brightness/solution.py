from typing import List, Optional, Tuple, Dict, Set
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def meetRequirement(self, n: int, lights: list[list[int]], requirement: list[int]) -> int:
        diff = [0] * (n + 1)
        for p, r in lights:
            start = max(0, p - r)
            end = min(n - 1, p + r)
            diff[start] += 1
            diff[end + 1] -= 1
        ans = 0
        cur = 0
        for i in range(n):
            cur += diff[i]
            if cur >= requirement[i]:
                ans += 1
        return ans
