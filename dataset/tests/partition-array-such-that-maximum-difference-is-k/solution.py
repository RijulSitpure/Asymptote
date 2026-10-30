class Solution:
    def partitionArray(self, nums: list[int], k: int) -> int:
        nums.sort()
        ans = 1
        anchor = nums[0]
        for x in nums[1:]:
            if x - anchor > k:
                ans += 1
                anchor = x
        return ans
