from solution import Solution

s = Solution()
assert s.maxScoreIndices([0,0,1,0]) == [2, 4]
assert s.maxScoreIndices([0,0,0]) == [3]
assert s.maxScoreIndices([1,1]) == [0]
print("All tests passed for all-divisions-with-the-highest-score-of-a-binary-array!")
