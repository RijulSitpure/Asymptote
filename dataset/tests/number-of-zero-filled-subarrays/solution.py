class Solution:
    def zeroFilledSubarray(self, nums: list[int]) -> int:
        ans = cur = 0
        for x in nums:
            if x == 0:
                cur += 1
                ans += cur
            else:
                cur = 0
        return ans
