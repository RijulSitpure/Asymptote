from typing import List

class Solution:
    def repeatedNTimes(self, nums: List[int]) -> int:
        for k in range(1, 4):
            for i in range(len(nums) - k):
                if nums[i] == nums[i + k]:
                    return nums[i]
        return -1

def test():
    sol = Solution()
    assert sol.repeatedNTimes([1, 2, 3, 3]) == 3, "test 1 failed"
    assert sol.repeatedNTimes([2, 1, 2, 5, 3, 2]) == 2, "test 2 failed"
    assert sol.repeatedNTimes([5, 1, 5, 2, 5, 3, 5, 4]) == 5, "test 3 failed"
    print("✓ n-repeated-element-in-size-2n-array passed")

if __name__ == "__main__":
    test()
