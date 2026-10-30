from solution import Solution

s = Solution()
assert s.gridGame([[2,5,4],[1,5,1]]) == 4
assert s.gridGame([[3,3,1],[8,5,2]]) == 4
assert s.gridGame([[1,3,1,15],[1,3,3,1]]) == 7
print('OK')