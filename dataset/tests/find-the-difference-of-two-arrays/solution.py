from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def findDifference(self, nums1: list[int], nums2: list[int]) -> list[list[int]]:
        s1, s2 = set(nums1), set(nums2)
        return [sorted(list(s1 - s2)), sorted(list(s2 - s1))]
