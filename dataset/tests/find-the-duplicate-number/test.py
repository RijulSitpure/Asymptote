import sys
from typing import List

class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        slow = nums[0]
        fast = nums[0]
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break
        slow = nums[0]
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]
        return slow

def test():
    sol = Solution()
    assert sol.findDuplicate([1,3,4,2,2]) == 2, "test 1 failed"
    assert sol.findDuplicate([3,1,3,4,2]) == 3, "test 2 failed"
    print("✓ find-the-duplicate-number passed")

if __name__ == "__main__":
    test()
