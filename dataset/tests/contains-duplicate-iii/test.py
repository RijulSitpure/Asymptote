import sys
from typing import List

class Solution:
    def containsNearbyAlmostDuplicate(self, nums: List[int], indexDiff: int, valueDiff: int) -> bool:
        if valueDiff < 0:
            return False
        w = valueDiff + 1
        buckets = {}
        for i, x in enumerate(nums):
            m = x // w
            if m in buckets:
                return True
            if m - 1 in buckets and abs(x - buckets[m - 1]) <= valueDiff:
                return True
            if m + 1 in buckets and abs(x - buckets[m + 1]) <= valueDiff:
                return True
            buckets[m] = x
            if i >= indexDiff:
                del buckets[nums[i - indexDiff] // w]
        return False

def test():
    sol = Solution()
    assert sol.containsNearbyAlmostDuplicate([1,2,3,1], 3, 0) is True, "test 1 failed"
    assert sol.containsNearbyAlmostDuplicate([1,5,9,1,5,9], 2, 3) is False, "test 2 failed"
    print("✓ contains-duplicate-iii passed")

if __name__ == "__main__":
    test()
