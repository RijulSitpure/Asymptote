class Solution:
    def matrixSum(self, nums: list[list[int]]) -> int:
        for row in nums:
            row.sort()
        m, n = len(nums), len(nums[0])
        score = 0
        for c in range(n):
            score += max(nums[r][c] for r in range(m))
        return score
