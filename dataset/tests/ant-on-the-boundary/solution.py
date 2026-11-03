class Solution:
    def returnToBoundaryCount(self, nums: list[int]) -> int:
        pos = 0
        ans = 0
        for x in nums:
            pos += x
            if pos == 0:
                ans += 1
        return ans
