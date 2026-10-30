class Solution:
    def maxProductDifference(self, nums: list[int]) -> int:
        nums.sort()
        return (nums[-1] * nums[-2]) - (nums[0] * nums[1])

def test_max_product_diff():
    sol = Solution()
    assert sol.maxProductDifference([5, 6, 2, 7, 4]) == 34
    assert sol.maxProductDifference([4, 2, 5, 9, 7, 4, 8]) == 64

