from solution import Solution
s = Solution()
assert s.checkXMatrix([[2,0,0,1],[0,3,1,0],[0,5,2,0],[4,0,0,2]]) == True
assert s.checkXMatrix([[5,7,0],[0,3,1],[0,5,0]]) == False
print("All tests passed for check-if-matrix-is-x-matrix!")
