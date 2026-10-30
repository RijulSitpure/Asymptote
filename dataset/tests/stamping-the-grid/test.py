from solution import Solution

s = Solution()
assert s.possibleToStamp([[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]], 4, 3) == True
assert s.possibleToStamp([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], 2, 2) == False
print("All tests passed for stamping-the-grid!")
