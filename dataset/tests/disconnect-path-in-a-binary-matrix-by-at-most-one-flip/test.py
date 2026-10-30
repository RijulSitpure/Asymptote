from solution import Solution
s = Solution()
assert s.isPossibleToCutPath([[1,1,1],[1,0,0],[1,1,1]]) == True
assert s.isPossibleToCutPath([[1,1,1],[1,0,1],[1,1,1]]) == False
print('All tests passed for disconnect-path-in-a-binary-matrix-by-at-most-one-flip!')
