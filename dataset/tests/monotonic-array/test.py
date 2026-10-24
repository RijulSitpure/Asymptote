from typing import List

class Solution:
    def isMonotonic(self, nums: List[int]) -> bool:
        inc = dec = True
        for i in range(1, len(nums)):
            if nums[i] < nums[i - 1]:
                inc = False
            if nums[i] > nums[i - 1]:
                dec = False
        return inc or dec

def test():
    sol = Solution()
    assert sol.isMonotonic([1, 2, 2, 3]) is True, "test 1 failed"
    assert sol.isMonotonic([6, 5, 4, 4]) is True, "test 2 failed"
    assert sol.isMonotonic([1, 3, 2]) is False, "test 3 failed"
    print("✓ monotonic-array passed")

if __name__ == "__main__":
    test()
