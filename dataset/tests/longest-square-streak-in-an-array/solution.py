class Solution:
    def longestSquareStreak(self, nums: list[int]) -> int:
        s = set(nums)
        ans = -1
        for x in sorted(s):
            length = 0
            curr = x
            while curr in s:
                length += 1
                curr = curr * curr
                if curr > 100000:
                    break
            if length >= 2 and length > ans:
                ans = length
        return ans
