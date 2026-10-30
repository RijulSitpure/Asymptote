from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def findKDistantIndices(self, nums: list[int], key: int, k: int) -> list[int]:
        ans = []
        n = len(nums)
        nxt = 0
        for j, val in enumerate(nums):
            if val == key:
                start = max(nxt, j - k)
                end = min(n - 1, j + k)
                for i in range(start, end + 1):
                    ans.append(i)
                nxt = end + 1
        return ans
