class Solution:
    def separateDigits(self, nums: list[int]) -> list[int]:
        ans = []
        for x in nums:
            for ch in str(x):
                ans.append(int(ch))
        return ans
