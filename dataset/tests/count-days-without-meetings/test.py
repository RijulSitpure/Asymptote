from solution import Solution

s = Solution()
assert s.countDays(10, [[5, 7], [1, 3], [9, 10]]) == 2
assert s.countDays(5, [[2, 4], [1, 3]]) == 1
assert s.countDays(6, [[1, 6]]) == 0
print('All tests passed successfully.')