from typing import List

class Solution:
    def largestPerimeter(self, nums: List[int]) -> int:
        nums.sort(reverse=True)
        for i in range(len(nums) - 2):
            if nums[i + 1] + nums[i + 2] > nums[i]:
                return nums[i] + nums[i + 1] + nums[i + 2]
        return 0

def test():
    sol = Solution()
    assert sol.largestPerimeter([2, 1, 2]) == 5, "test 1 failed"
    assert sol.largestPerimeter([1, 2, 1, 10]) == 0, "test 2 failed"
    print("✓ largest-perimeter-triangle passed")

if __name__ == "__main__":
    test()
