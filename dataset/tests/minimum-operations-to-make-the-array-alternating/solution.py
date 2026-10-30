import collections
from typing import List

class Solution:
    def minimumOperations(self, nums: List[int]) -> int:
        if len(nums) <= 1:
            return 0
        even_cnt = collections.Counter(nums[0::2])
        odd_cnt = collections.Counter(nums[1::2])
        top_even = even_cnt.most_common(2) + [(0, 0)]
        top_odd = odd_cnt.most_common(2) + [(0, 0)]
        if top_even[0][0] != top_odd[0][0]:
            return len(nums) - (top_even[0][1] + top_odd[0][1])
        return len(nums) - max(top_even[0][1] + top_odd[1][1], top_even[1][1] + top_odd[0][1])
