class Solution:
    def findPrefixScore(self, nums: list[int]) -> list[int]:
        max_val = 0
        total_score = 0
        ans = []
        for x in nums:
            max_val = max(max_val, x)
            total_score += x + max_val
            ans.append(total_score)
        return ans
