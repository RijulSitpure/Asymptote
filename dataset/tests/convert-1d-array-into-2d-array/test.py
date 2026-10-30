from solution import Solution

s = Solution()
assert s.construct2DArray([1,2,3,4], 2, 2) == [[1,2],[3,4]]
assert s.construct2DArray([1,2,3], 1, 3) == [[1,2,3]]
assert s.construct2DArray([1,2], 1, 1) == []
print('OK')