import collections
from typing import List

class Solution:
    def findLonely(self, nums: List[int]) -> List[int]:
        count = collections.Counter(nums)
        return [x for x, cnt in count.items() if cnt == 1 and (x - 1) not in count and (x + 1) not in count]
