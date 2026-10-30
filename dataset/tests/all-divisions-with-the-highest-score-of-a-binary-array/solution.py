from typing import List

class Solution:
    def maxScoreIndices(self, nums: List[int]) -> List[int]:
        curr = sum(nums)
        max_score = curr
        best = [0]
        for i, x in enumerate(nums):
            if x == 0:
                curr += 1
            else:
                curr -= 1
            if curr > max_score:
                max_score = curr
                best = [i + 1]
            elif curr == max_score:
                best.append(i + 1)
        return best
