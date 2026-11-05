from solution import Solution

s = Solution()
assert s.addedInteger([2, 6, 4], [9, 7, 5]) == 3
assert s.addedInteger([10], [5]) == -5
assert s.addedInteger([1, 1, 1, 1], [1, 1, 1, 1]) == 0
print("All tests passed successfully.")
