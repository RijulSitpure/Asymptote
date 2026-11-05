from solution import Solution

s = Solution()
assert s.minimumLevels([1, 0, 1, 0]) == 1
assert s.minimumLevels([1, 1, 1, 1, 1]) == 3
assert s.minimumLevels([0, 0]) == -1
print("All tests passed successfully.")
