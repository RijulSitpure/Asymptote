from typing import List

class Solution:
    def sortJumbled(self, mapping: List[int], nums: List[int]) -> List[int]:
        def map_val(x):
            if x == 0:
                return mapping[0]
            digits = []
            while x > 0:
                digits.append(str(mapping[x % 10]))
                x //= 10
            return int("".join(reversed(digits)))
        return sorted(nums, key=map_val)
