import sys
from typing import List

class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        left = 0
        zero_count = 0
        max_len = 0
        for right, n in enumerate(nums):
            if n == 0:
                zero_count += 1
            while zero_count > 1:
                if nums[left] == 0:
                    zero_count -= 1
                left += 1
            max_len = max(max_len, right - left + 1)
        return max_len

def test():
    sol = Solution()
    assert sol.findMaxConsecutiveOnes([1,0,1,1,0]) == 4, "test 1 failed"
    assert sol.findMaxConsecutiveOnes([1,0,1,1,0,1]) == 4, "test 2 failed"
    print("✓ max-consecutive-ones-ii passed")

if __name__ == "__main__":
    test()
