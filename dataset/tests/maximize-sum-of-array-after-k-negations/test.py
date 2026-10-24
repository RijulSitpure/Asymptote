from typing import List

class Solution:
    def largestSumAfterKNegations(self, nums: List[int], k: int) -> int:
        nums.sort()
        for i in range(len(nums)):
            if nums[i] < 0 and k > 0:
                nums[i] = -nums[i]
                k -= 1
        if k % 2 == 1:
            nums.sort()
            nums[0] = -nums[0]
        return sum(nums)

def test():
    sol = Solution()
    assert sol.largestSumAfterKNegations([4,2,3], 1) == 5, "test 1 failed"
    assert sol.largestSumAfterKNegations([3,-1,0,2], 3) == 6, "test 2 failed"
    assert sol.largestSumAfterKNegations([2,-3,-1,5,-4], 2) == 13, "test 3 failed"
    print("✓ maximize-sum-of-array-after-k-negations passed")

if __name__ == "__main__":
    test()
