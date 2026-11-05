from solution import Solution

s = Solution()
assert s.minimumOperations([[1, 0, 2], [1, 0, 2]]) == 0
assert s.minimumOperations([[1, 1, 1], [0, 0, 0]]) == 3
assert s.minimumOperations([[1], [2], [3]]) == 2
print("All tests passed successfully.")
