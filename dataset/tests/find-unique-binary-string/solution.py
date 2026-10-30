class Solution:
    def findDifferentBinaryString(self, nums: list[str]) -> str:
        ans = []
        for i in range(len(nums)):
            ans.append('1' if nums[i][i] == '0' else '0')
        return "".join(ans)
