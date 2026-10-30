class Solution:
    def maxDivisibilityScore(self, nums: list[int], divisors: list[int]) -> int:
        best_d = min(divisors)
        max_score = -1
        for d in divisors:
            score = sum(1 for x in nums if x % d == 0)
            if score > max_score or (score == max_score and d < best_d):
                max_score = score
                best_d = d
        return best_d
