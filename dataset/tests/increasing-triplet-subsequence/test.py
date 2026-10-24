import sys
from typing import List

class Solution:
    def increasingTriplet(self, nums: List[int]) -> bool:
        first = float("inf")
        second = float("inf")
        for n in nums:
            if n <= first:
                first = n
            elif n <= second:
                second = n
            else:
                return True
        return False

def test():
    sol = Solution()
    assert sol.increasingTriplet([1, 2, 3, 4, 5]) is True, "test 1 failed"
    assert sol.increasingTriplet([5, 4, 3, 2, 1]) is False, "test 2 failed"
    assert sol.increasingTriplet([2, 1, 5, 0, 4, 6]) is True, "test 3 failed"
    print("✓ increasing-triplet-subsequence passed")

if __name__ == "__main__":
    test()
