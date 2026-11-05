from solution import Solution

s = Solution()
assert s.duplicateNumbersXOR([1, 2, 1, 3]) == 1
assert s.duplicateNumbersXOR([1, 2, 3]) == 0
assert s.duplicateNumbersXOR([1, 2, 2, 1]) == 3
print('All tests passed successfully.')