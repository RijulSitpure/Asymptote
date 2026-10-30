class Solution:
    def rearrangeArray(self, nums: list[int]) -> list[int]:
        nums.sort()
        ans = [0] * len(nums)
        ans[::2] = nums[: (len(nums) + 1) // 2]
        ans[1::2] = nums[(len(nums) + 1) // 2 :]
        return ans

def test_rearrange_array():
    sol = Solution()
    res = sol.rearrangeArray([1, 2, 3, 4, 5])
    for i in range(1, len(res) - 1):
        assert res[i] * 2 != res[i - 1] + res[i + 1]

