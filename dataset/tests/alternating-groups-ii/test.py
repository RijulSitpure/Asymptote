from solution import Solution

s = Solution()
assert s.numberOfAlternatingGroups([0, 1, 0, 1, 0], 3) == 3
assert s.numberOfAlternatingGroups([0, 1, 0, 0, 1, 0, 1], 6) == 2
assert s.numberOfAlternatingGroups([1, 1, 0, 1], 4) == 0
print('All tests passed successfully.')