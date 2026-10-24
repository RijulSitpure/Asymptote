import sys
from typing import List

class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        for i in range(len(nums) - 1):
            if (i % 2 == 0 and nums[i] > nums[i + 1]) or (i % 2 == 1 and nums[i] < nums[i + 1]):
                nums[i], nums[i + 1] = nums[i + 1], nums[i]

def test():
    sol = Solution()
    arr = [3, 5, 2, 1, 6, 4]
    sol.wiggleSort(arr)
    for i in range(len(arr) - 1):
        if i % 2 == 0:
            assert arr[i] <= arr[i + 1], f"violation at even index {i}"
        else:
            assert arr[i] >= arr[i + 1], f"violation at odd index {i}"
    print("✓ wiggle-sort passed")

if __name__ == "__main__":
    test()
