from solution import Solution

s = Solution()
assert s.minimumValueSum([1, 4, 3, 3, 2], [0, 3, 3, 2]) == 12
assert s.minimumValueSum([2, 3, 5, 7, 7, 7], [1, 7]) == -1
assert s.minimumValueSum([1, 2, 3, 4], [2]) == -1
print("All tests passed successfully.")
