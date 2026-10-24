import sys
from typing import List

class Solution:
    def findMissingRanges(self, nums: List[int], lower: int, upper: int) -> List[List[int]]:
        res = []
        prev = lower - 1
        for i in range(len(nums) + 1):
            curr = nums[i] if i < len(nums) else upper + 1
            if curr - prev >= 2:
                res.append([prev + 1, curr - 1])
            prev = curr
        return res

def test():
    sol = Solution()
    assert sol.findMissingRanges([0, 1, 3, 50, 75], 0, 99) == [[2, 2], [4, 49], [51, 74], [76, 99]], "test 1 failed"
    assert sol.findMissingRanges([], 1, 1) == [[1, 1]], "test 2 failed"
    assert sol.findMissingRanges([], -3, -1) == [[-3, -1]], "test 3 failed"
    print("✓ missing-ranges passed")

if __name__ == "__main__":
    test()
