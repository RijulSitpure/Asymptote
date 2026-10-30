from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def countHillValley(self, nums: list[int]) -> int:
        v = [nums[0]]
        for x in nums[1:]:
            if x != v[-1]:
                v.append(x)
        ans = 0
        for i in range(1, len(v) - 1):
            if (v[i] > v[i - 1] and v[i] > v[i + 1]) or (v[i] < v[i - 1] and v[i] < v[i + 1]):
                ans += 1
        return ans
