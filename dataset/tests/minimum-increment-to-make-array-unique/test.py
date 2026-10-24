from typing import List

class Solution:
    def minIncrementForUnique(self, nums: List[int]) -> int:
        nums.sort()
        moves = 0
        for i in range(1, len(nums)):
            if nums[i] <= nums[i - 1]:
                diff = nums[i - 1] + 1 - nums[i]
                moves += diff
                nums[i] = nums[i - 1] + 1
        return moves

def test():
    sol = Solution()
    assert sol.minIncrementForUnique([1, 2, 2]) == 1, "test 1 failed"
    assert sol.minIncrementForUnique([3, 2, 1, 2, 1, 7]) == 6, "test 2 failed"
    print("✓ minimum-increment-to-make-array-unique passed")

if __name__ == "__main__":
    test()
