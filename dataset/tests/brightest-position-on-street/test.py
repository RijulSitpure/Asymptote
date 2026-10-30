from solution import Solution

s = Solution()
assert s.brightestPosition([[-3,2],[1,2],[3,3]]) == -1
assert s.brightestPosition([[1,0],[1,2]]) == 1
assert s.brightestPosition([[1,2]]) == -1
print('OK')