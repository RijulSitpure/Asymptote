from solution import Solution

s = Solution()
assert s.maxHammingDistances([1, 0, 3], 2) == [1, 2, 2]
assert s.maxHammingDistances([7, 9, 14], 4) == [3, 3, 3]
print("All tests passed successfully.")
