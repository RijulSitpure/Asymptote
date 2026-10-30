from solution import Solution
s = Solution()
assert s.shiftingLetters('abc', [[0,1,0],[1,2,1],[0,2,1]]) == 'ace'
assert s.shiftingLetters('dztz', [[0,0,0],[1,1,1]]) == 'catz'
print("All tests passed for shifting-letters-ii!")
