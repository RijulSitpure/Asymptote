from solution import Solution

s = Solution()
assert s.numberOfStableArrays(1, 1, 2) == 2
assert s.numberOfStableArrays(1, 2, 1) == 1
assert s.numberOfStableArrays(3, 3, 2) == 14
print("All tests passed successfully.")
