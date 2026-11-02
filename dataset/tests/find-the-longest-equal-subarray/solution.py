from typing import List, Optional
class Solution:
    def longestEqualSubarray(self, nums: List[int], k: int) -> int:
        from collections import defaultdict
        pos = defaultdict(list)
        for i, v in enumerate(nums):
            pos[v].append(i)
        ans = 0
        for indices in pos.values():
            left = 0
            for right in range(len(indices)):
                while (indices[right] - indices[left] + 1) - (right - left + 1) > k:
                    left += 1
                ans = max(ans, right - left + 1)
        return ans
