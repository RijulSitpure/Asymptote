class Solution:
    def findMaximumScore(self, nums: list[int]) -> int:
        score = 0
        running_max = 0
        for x in nums[:-1]:
            running_max = max(running_max, x)
            score += running_max
        return score
