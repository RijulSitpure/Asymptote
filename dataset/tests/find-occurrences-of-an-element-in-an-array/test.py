from solution import Solution

s = Solution()
assert s.occurrencesOfElement([1, 3, 1, 7], [1, 3, 2, 4], 1) == [0, -1, 2, -1]
assert s.occurrencesOfElement([1, 2, 3], [10], 5) == [-1]
print('All tests passed successfully.')