class Solution:
    def findScore(self, nums: list[int]) -> int:
        n = len(nums)
        elements = sorted((val, i) for i, val in enumerate(nums))
        marked = [False] * n
        score = 0
        for val, i in elements:
            if not marked[i]:
                score += val
                marked[i] = True
                if i > 0:
                    marked[i - 1] = True
                if i + 1 < n:
                    marked[i + 1] = True
        return score
