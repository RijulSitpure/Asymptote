import sys
from typing import List

class Solution:
    def threeSumSmaller(self, nums: List[int], target: int) -> int:
        nums.sort()
        count = 0
        n = len(nums)
        for i in range(n - 2):
            left, right = i + 1, n - 1
            while left < right:
                if nums[i] + nums[left] + nums[right] < target:
                    count += (right - left)
                    left += 1
                else:
                    right -= 1
        return count

def test():
    sol = Solution()
    assert sol.threeSumSmaller([-2,0,1,3], 2) == 2, "test 1 failed"
    assert sol.threeSumSmaller([], 0) == 0, "test 2 failed"
    assert sol.threeSumSmaller([0], 0) == 0, "test 3 failed"
    print("✓ 3sum-smaller passed")

if __name__ == "__main__":
    test()
