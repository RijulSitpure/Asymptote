class Solution:
    def buildArray(self, nums: list[int]) -> list[int]:
        return [nums[nums[i]] for i in range(len(nums))]

def test_build_array():
    sol = Solution()
    assert sol.buildArray([0, 2, 1, 5, 3, 4]) == [0, 1, 2, 4, 5, 3]
    assert sol.buildArray([5, 0, 1, 2, 3, 4]) == [4, 5, 0, 1, 2, 3]

