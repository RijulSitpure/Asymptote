from solution import Solution

s = Solution()
assert s.removeOnes([[1,1,1],[1,1,1],[0,1,0]]) == 2
assert s.removeOnes([[0,1,0],[1,0,1],[0,1,0]]) == 2
assert s.removeOnes([[0,0],[0,0]]) == 0
print("All tests passed for remove-all-ones-with-row-and-column-flips-ii!")
