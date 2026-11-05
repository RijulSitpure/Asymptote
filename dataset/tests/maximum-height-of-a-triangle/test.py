from solution import Solution

s = Solution()
assert s.maxHeightOfTriangle(2, 4) == 3
assert s.maxHeightOfTriangle(2, 1) == 2
assert s.maxHeightOfTriangle(1, 1) == 1
assert s.maxHeightOfTriangle(10, 1) == 2
print('All tests passed successfully.')