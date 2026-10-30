from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def triangularSum(self, nums: list[int]) -> int:
        for m in range(len(nums) - 1, 0, -1):
            for i in range(m):
                nums[i] = (nums[i] + nums[i + 1]) % 10
        return nums[0]
