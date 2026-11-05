from solution import Solution

s = Solution()
assert s.mostFrequentIDs([2, 3, 2, 1], [3, 2, -3, 1]) == [3, 3, 2, 2]
assert s.mostFrequentIDs([5, 5, 3], [2, -2, 1]) == [2, 0, 1]
print("All tests passed successfully.")
